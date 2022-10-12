import smtplib
import ssl
from app.config import (
    ADMIN_UI_URL,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_SENDER,
    SMTP_SSL,
)
from .auth import generate_reset_token

context = ssl.create_default_context()

welcome_message = """\
From: ODK-X Admin {}
To: {}
Subject: ODK-X Auth - New Account
Hi {},

An account for you has been created on ODK-X Auth.
Click on the link below to reset your password and get started.

{}


- ODK-X Auth Admin
"""


reset_password_message = """\
From: ODK-X Admin {}
To: {}
Subject: ODK-X Auth - Reset Password

Hi {},

An account for you has been created on ODK-X Auth.
Click on the link below to reset your password and get started.

{}


- ODK-X Auth Admin
"""


def send_email(recepient, email_type="reset"):
    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.ehlo()
        if SMTP_SSL:
            server.starttls(context=context)
        server.login(SMTP_SENDER, SMTP_PASSWORD)
        if email_type == "reset":
            email = reset_password_message.format(
                SMTP_SENDER,
                recepient,
                recepient,
                (
                    ADMIN_UI_URL
                    + "/confirm-password?token="
                    + generate_reset_token(recepient)
                ),
            )
        elif email_type == "welcome":
            email = welcome_message.format(
                SMTP_SENDER,
                recepient,
                recepient,
                (
                    ADMIN_UI_URL
                    + "/confirm-password?token="
                    + generate_reset_token(recepient)
                ),
            )
        server.sendmail(SMTP_SENDER, recepient, email)
        return {"status": "success"}
    except Exception as e:
        print(e)
        return {"status": "error", "error": e}
