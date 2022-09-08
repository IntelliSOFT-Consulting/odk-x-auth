import os

# fauna database configuration
FAUNA_SECRET = os.environ["FAUNA_SECRET"]


# email configuration
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_SENDER = "test-sender@gmail.com"
SMTP_USERNAME = "Test User"
SMTP_PASSWORD = "password"


# application configuration
TOKEN_EXPIRY = 60 * 15 #Seconds
