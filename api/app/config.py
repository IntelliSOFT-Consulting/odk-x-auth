import os


SECRET_KEY = os.environ.get("SECRET_KEY") or "someSecret"

# LDAP_HOST = "ipa.demo1.freeipa.org"
# LDAP_HOST = "ldap-service"
LDAP_HOST = os.environ.get("LDAP_HOST") or "localhost"
LDAP_PORT = os.environ.get("LDAP_PORT") or int("389")

LDAP_PORT = 44617

# openldap
# LDAP_ORGANISATION=Open Data Kit
LDAP_DOMAIN = os.environ.get("LDAP_HOST") or "example.org"
LDAP_BASE = ""
for i in LDAP_DOMAIN.split("."):
    LDAP_BASE += "dc={},".format(i)

LDAP_BASE = LDAP_BASE[:len(LDAP_BASE) - 1]
# LDAP_READONLY_USER=true
# LDAP_READONLY_USER_PASSWORD=readonly
# LDAP_ADMIN_PASSWORD=admin


# email configuration
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_SENDER = "@gmail.com"
SMTP_USERNAME = "Test User"
SMTP_PASSWORD = "password"


# application configuration
TOKEN_EXPIRY = 60 * 15  # Seconds
