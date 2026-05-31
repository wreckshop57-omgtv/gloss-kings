import os
import json
import resend
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self._send_json(200, {"ok": True})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")
            data = json.loads(body or "{}")

            name = data.get("name") or data.get("fullName") or ""
            phone = data.get("phone") or ""
            email = data.get("email") or ""
            vehicle = data.get("vehicle") or data.get("vehicleDescription") or ""
            service = data.get("service") or data.get("serviceType") or ""
            message = data.get("message") or ""

            if not name or not phone or not vehicle:
                return self._send_json(400, {"detail": "Missing required fields"})

            resend.api_key = os.environ.get("RESEND_API_KEY", "")
            sender_email = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
            notify_email = os.environ.get("NOTIFY_EMAIL", "Glosskings.autodetailing1012@gmail.com")

            if not resend.api_key:
                return self._send_json(500, {"detail": "Missing RESEND_API_KEY"})

            html = f"""
            <h2>New Gloss Kings Quote Request</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email or "—"}</p>
            <p><strong>Vehicle:</strong> {vehicle}</p>
            <p><strong>Service:</strong> {service}</p>
            <p><strong>Message:</strong> {message or "—"}</p>
            """

            params = {
                "from": f"Gloss Kings <{sender_email}>",
                "to": [notify_email],
                "subject": f"New Quote · {name} · {vehicle}",
                "html": html,
            }

            if email:
                params["reply_to"] = email

            resend.Emails.send(params)

            return self._send_json(200, {"ok": True, "message": "Quote submitted"})

        except Exception as e:
            return self._send_json(500, {"detail": str(e)})
