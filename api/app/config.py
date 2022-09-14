import os

SECRET_KEY = "someSecret"

# LDAP_HOST = "ipa.demo1.freeipa.org"
LDAP_HOST = "ldap-service"
# LDAP_HOST = "127.0.0.1"



# email configuration
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_SENDER = "test-sender@gmail.com"
SMTP_USERNAME = "Test User"
SMTP_PASSWORD = "password"


# application configuration
TOKEN_EXPIRY = 60 * 15  # Seconds
