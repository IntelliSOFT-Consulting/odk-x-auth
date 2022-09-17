import os


SECRET_KEY = os.environ.get("SECRET_KEY") or "someSecret"

# LDAP_HOST = "ipa.demo1.freeipa.org"
# LDAP_HOST = "ldap-service"
LDAP_HOST = os.environ.get("LDAP_HOST") or "localhost"
LDAP_PORT = os.environ.get("LDAP_PORT") or int("389")


# openldap
# LDAP_ORGANISATION=Open Data Kit
LDAP_DOMAIN = os.environ.get("LDAP_HOST") or "example.org"
LDAP_BASE = ""
for i in LDAP_DOMAIN.split("."):
    LDAP_BASE += "dc={},".format(i)

LDAP_BASE = LDAP_BASE[:len(LDAP_BASE) - 1]

BASE_GROUP_DN = "ou=default_prefix,ou=groups,{}".format(LDAP_BASE)
BASE_USER_DN = "ou=people,{}".format(LDAP_BASE)
# LDAP_READONLY_USER=true
# LDAP_READONLY_USER_PASSWORD=readonly
LDAP_ADMIN_PASSWORD = os.environ.get("LDAP_ADMIN_PASSWORD") or "admin"


# email configuration
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_SSL = False
SMTP_PORT = 465
SMTP_SENDER = os.environ.get("SMTP_SENDER")
SMTP_USERNAME = "Test User"
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")


# application configuration
TOKEN_EXPIRY = 60 * 15  #Seconds
