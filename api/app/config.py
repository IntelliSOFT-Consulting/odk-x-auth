import os

SECRET_KEY = "someSecret"

# LDAP_HOST = "ipa.demo1.freeipa.org"
# LDAP_HOST = "ldap-service"
LDAP_HOST = os.environ.get("LDAP_HOST") or "localhost"

# openldap
# LDAP_ORGANISATION=Open Data Kit
LDAP_DOMAIN = "example.org"
# LDAP_READONLY_USER=true
# LDAP_READONLY_USER_PASSWORD=readonly
# LDAP_ADMIN_PASSWORD=admin


# email configuration
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_SENDER = "test-sender@gmail.com"
SMTP_USERNAME = "Test User"
SMTP_PASSWORD = "password"


# application configuration
TOKEN_EXPIRY = 60 * 15  # Seconds
