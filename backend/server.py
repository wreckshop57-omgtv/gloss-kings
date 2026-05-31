from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import re
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Email configuration
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "Glosskings.autodetailing1012@gmail.com").strip()

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def _quote_email_html(q: "Quote") -> str:
    return f"""
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#050505;color:#ffffff;font-family:Helvetica,Arial,sans-serif;border:1px solid #D4AF37;">
  <tr>
    <td style="padding:32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.3);">
      <h1 style="margin:0;font-size:22px;letter-spacing:6px;text-transform:uppercase;color:#D4AF37;">Gloss Kings</h1>
      <p style="margin:8px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#888;">New Royal Inquiry</p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.6;">
        <tr>
          <td style="padding:8px 0;color:#888;width:120px;">Name</td>
          <td style="color:#fff;font-weight:600;">{q.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Phone</td>
          <td style="color:#fff;"><a href="tel:{q.phone}" style="color:#D4AF37;text-decoration:none;">{q.phone}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Email</td>
          <td style="color:#fff;">{q.email or "—"}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Vehicle</td>
          <td style="color:#fff;">{q.vehicle}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Service</td>
          <td style="color:#D4AF37;font-weight:600;">{q.service}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;vertical-align:top;">Message</td>
          <td style="color:#fff;">{(q.message or "—").replace(chr(10), "<br>")}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#666;text-align:center;letter-spacing:2px;text-transform:uppercase;">
      Submitted {q.created_at.strftime("%b %d, %Y · %I:%M %p UTC")}
    </td>
  </tr>
</table>
"""


async def send_quote_notification(quote: "Quote") -> None:
    if not RESEND_API_KEY:
        logger.error("RESEND_API_KEY not set")
        raise RuntimeError("RESEND_API_KEY not set")

    try:
        params = {
            "from": f"Gloss Kings <{SENDER_EMAIL}>",
            "to": [NOTIFY_EMAIL],
            "reply_to": quote.email or None,
            "subject": f"New Quote · {quote.name} · {quote.vehicle}",
            "html": _quote_email_html(quote),
        }

        params = {k: v for k, v in params.items() if v is not None}

        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Quote notification sent: {email.get('id') if isinstance(email, dict) else email}")

    except Exception as e:
        logger.error(f"Failed to send quote notification email: {e}")
        raise


app = FastAPI(title="Gloss Kings Auto Detailing API")

api_router = APIRouter(prefix="/api")


class QuoteCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str = Field(..., min_length=7, max_length=30)
    email: Optional[str] = Field(default=None, max_length=120)
    vehicle: str = Field(..., min_length=2, max_length=120)
    service: str = Field(..., min_length=2, max_length=80)
    message: Optional[str] = Field(default="", max_length=1000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if len(digits) < 7:
            raise ValueError("Invalid phone number")
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


@api_router.get("/")
async def root():
    return {"message": "Gloss Kings Auto Detailing API", "status": "online"}


@api_router.post("/quote", response_model=Quote)
async def submit_quote(payload: QuoteCreate, background_tasks: BackgroundTasks):
    try:
        quote = Quote(**payload.model_dump())
        background_tasks.add_task(send_quote_notification, quote)
        return quote
    except Exception as e:
        logger.error(f"Could not submit quote: {e}")
        raise HTTPException(status_code=500, detail="Could not submit quote")


@api_router.get("/quotes")
async def list_quotes():
    return []


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    pass
