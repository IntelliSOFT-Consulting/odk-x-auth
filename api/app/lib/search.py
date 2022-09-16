# For groups provide a groupid number instead of a uidNumber
from ldap3 import Server, Connection, ALL, SUBTREE

from app.config import LDAP_DOMAIN
from .auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError, LDAPInvalidFilterError


def get_ldap_users():

    # Provide a search base to search for.
    search_base = 'dc=example,dc=org'
    # provide a uidNumber to search for. '*" to fetch all users/groups
    # search_filter = '(*)'
    search_filter = '(objectClass=posixGroup)'


    # Establish connection to the server
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
    # print(ldap_conn)
    try:
        # only the attributes specified will be returned
        ldap_conn.search(search_base=search_base, search_filter=search_filter)
        # search will not return any values.
        # the entries method in connection object returns the results
        print(ldap_conn.entries)
        results = ldap_conn.response_to_json()
        print(results)
        return {"status": "success", "data": results}
    except LDAPInvalidFilterError as err:
        return {"error": "LDAPInvalidFilterError", "status": "error"}
    except LDAPException as e:
        return {"error": e, "status": "error"}
