from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'Glosskings.autodetailing1012@gmail.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def _quote_email_html(q: 'Quote') -> str:
    return f"""
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#050505;color:#ffffff;font-family:Helvetica,Arial,sans-serif;border:1px solid #D4AF37;">
  <tr><td style="padding:32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.3);">
    <h1 style="margin:0;font-size:22px;letter-spacing:6px;text-transform:uppercase;color:#D4AF37;">Gloss Kings</h1>
    <p style="margin:8px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#888;">New Royal Inquiry</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.6;">
      <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="color:#fff;font-weight:600;">{q.name}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="color:#fff;"><a href="tel:{q.phone}" style="color:#D4AF37;text-decoration:none;">{q.phone}</a></td></tr>
      <tr><td style="padding:8px 0;color:#888;">Email</td><td style="color:#fff;">{q.email or '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Vehicle</td><td style="color:#fff;">{q.vehicle}</td></tr>
      <tr><td style="padding:8px 0;color:#888;">Service</td><td style="color:#D4AF37;font-weight:600;">{q.service}</td></tr>
      <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Message</td><td style="color:#fff;">{(q.message or '—').replace(chr(10), '<br>')}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#666;text-align:center;letter-spacing:2px;text-transform:uppercase;">
    Submitted {q.created_at.strftime('%b %d, %Y · %I:%M %p UTC')}
  </td></tr>
</table>
"""


async def send_quote_notification(quote: 'Quote') -> None:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email notification")
        return
    try:
        params = {
            "from": f"Gloss Kings <{SENDER_EMAIL}>",
            "to": [NOTIFY_EMAIL],
            "reply_to": quote.email or None,
            "subject": f"New Quote · {quote.name} · {quote.vehicle}",
            "html": _quote_email_html(quote),
        }
        # Strip None values
        params = {k: v for k, v in params.items() if v is not None}
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Quote notification sent: {email.get('id') if isinstance(email, dict) else email}")
    except Exception as e:
        logger.error(f"Failed to send quote notification email: {e}")


# Create the main app without a prefix
app = FastAPI(title="Gloss Kings Auto Detailing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class QuoteCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str = Field(..., min_length=7, max_length=30)
    email: Optional[str] = Field(default=None, max_length=120)
    vehicle: str = Field(..., min_length=2, max_length=120)
    service: str = Field(..., min_length=2, max_length=80)
    message: Optional[str] = Field(default="", max_length=1000)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if len(digits) < 7:
            raise ValueError('Invalid phone number')
        return v.strip()


class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    vehicle: str
    service: str
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Gloss Kings Auto Detailing API", "status": "online"}


@api_router.post("/quote", response_model=Quote)
async def submit_quote(payload: QuoteCreate, background_tasks: BackgroundTasks):
    try:
        quote = Quote(**payload.model_dump())
        doc = quote.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.quotes.insert_one(doc)
        # Fire-and-forget email notification — never blocks the user response
        background_tasks.add_task(send_quote_notification, quote)
        return quote
    except Exception as e:
        logger.error(f"Failed to insert quote: {e}")
        raise HTTPException(status_code=500, detail="Could not submit quote")


@api_router.get("/quotes", response_model=List[Quote])
async def list_quotes():
    docs = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    result = []
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except Exception:
                d['created_at'] = datetime.now(timezone.utc)
        result.append(Quote(**d))
    return result


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
