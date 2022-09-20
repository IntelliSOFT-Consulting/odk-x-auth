import smtplib
import ssl

from app.config import SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SENDER, SMTP_SSL

port = 465  # For SSL
password = input("Type your password and press enter: ")

# Create a secure SSL context
context = ssl.create_default_context()

# with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
#     server.login("my@gmail.com", password)
#     # TODO: Send email here


def send_reset_link(email):

    res = send_email()


def reset_password(email, reset_code):
    pass


context = ssl.create_default_context()


def send_email(recepient, subject, email):

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.ehlo()
        if SMTP_SSL:
            server.starttls(context=context)
        server.login(SMTP_SENDER, SMTP_PASSWORD)
        server.sendmail(SMTP_SENDER, recepient, email)

        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "error": e}


welcome_message = """\
Subject: ODK-X Auth - New Account
Hi {},

An account for you has been created on ODK-X Auth.
Click on the link below to reset your password and get started.

{}


- ODK-X Auth Admin
"""


reset_password_message = """\
Subject: ODK-X Auth - Reset Password
Hi {},

An account for you has been created on ODK-X Auth.
Click on the link below to reset your password and get started.

{}


- ODK-X Auth Admin
"""