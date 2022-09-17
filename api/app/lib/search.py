# For groups provide a groupid number instead of a uidNumber
from ldap3 import Server, Connection, ALL, SUBTREE
import json
from app.config import LDAP_DOMAIN
from .auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError, LDAPInvalidFilterError


def search_ldap(entity="users", name=None, filter=None):
    # Provide a search base to search for.
    search_base = 'ou=people,dc=example,dc=org'
    search_filter = '(cn={})'.format(name if name else "*")
    if filter:
        search_filter = filter
    if entity == "groups":
        search_base = 'ou=default_prefix,ou=groups,dc=example,dc=org'

    # Establish connection to the server
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
    try:
        # only the attributes specified will be returned
        res = (ldap_conn.search(search_base, search_filter, attributes=['*']))
        print(res[0])
        print(len(res))
        if res[0] == True:
            results = [({
                "dn": i['dn'],
                "attributes":dict(i['attributes']),
                "names":dict(i['attributes'])['cn'][0],
                "username": dict(i['attributes'])['cn'][1],
                "email":dict(i['attributes'])['mail'][0],
            }) 
            for i in res[2]]
        # print(json.dumps(results))
        return {"status": "success", "data": results}
    except LDAPInvalidFilterError as err:
        return {"error": "LDAPInvalidFilterError:{}".format(err), "status": "error"}
    except LDAPException as e:
        return {"error": e, "status": "error"}