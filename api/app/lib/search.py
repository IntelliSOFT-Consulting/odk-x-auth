# For groups provide a groupid number instead of a uidNumber
from ldap3 import Server, Connection, ALL, SUBTREE
import json
from app.config import LDAP_DOMAIN
from .auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError, LDAPInvalidFilterError


def get_ldap_users():

    # Provide a search base to search for.
    search_base = 'ou=people,dc=example,dc=org'
    search_filter = '(cn=*)'

    # Establish connection to the server
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
    # print(ldap_conn)
    try:
        # only the attributes specified will be returned
        res = (ldap_conn.search(search_base, search_filter, attributes=['*']))
        print(res[0])
        print(len(res))
        if res[0] == True:
            results = [dict(i) for i in res[2]]
        # print(json.dumps(results))
        return {"status": "success", "data": results}
    except LDAPInvalidFilterError as err:
        return {"error": "LDAPInvalidFilterError", "status": "error"}
    except LDAPException as e:
        return {"error": e, "status": "error"}