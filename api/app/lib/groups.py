from app.config import BASE_GROUP_DN, BASE_USER_DN, LDAP_BASE, LDAP_DOMAIN
from app.lib.auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError


def add_ldap_group(group, gid):
    ldap_attr = {'cn': group}
    # object class for group should be mentioned.
    ldap_attr['objectClass'] = ['posixGroup', 'top']

    # ldap_conn = ldap_client()
    ldap_conn = ldap_client("cn=admin,{}".format(LDAP_BASE), "admin")
    try:
        response = ldap_conn.add('gidNumber={},{}'.format(gid, BASE_GROUP_DN) , ['posixGroup', 'top'], ldap_attr)
        print(response[1])
        print(response[3])
        if response[0] == True:
            print(response[0])
            response = {"response": response[1], "data": response[3], "status": "success"}
        elif response[0] == False:
            response = {"error": response[1]['description'], "status": "error"}
    except LDAPException as e:
        response = e
        response = {"error": response, "status": "error"}
    ldap_conn.unbind()
    return response


def delete_ldap_group(group):
    ldap_attr = {'gidNumber': group}
    # object class for group should be mentioned.
    ldap_attr['objectClass'] = 'posixGroup'
    ldap_conn = ldap_client("cn=admin,{}".format(LDAP_BASE), "admin")
    try:
        # this will add group1 to the base directory tree
        response = ldap_conn.add('cn={},{}'.format(group, BASE_GROUP_DN), 'posixGroup')
    except LDAPException as e:
        response = ("The error is ", e)
    ldap_conn.unbind()
    return response


def modify_ldap_group(group):
    try:
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        # this will add group1 to the base directory tree
        response = ldap_conn.modify('gidNumber={},{}'.format(
            group, BASE_GROUP_DN), AA)
    except LDAPException as e:
        response = ("The error is ", e)
    ldap_conn.unbind()
    return response


def add_user_to_group(user, gidNumber):
    try:
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        # this will add group1 to the base directory tree
        user = "{},{}".format(user, BASE_USER_DN)
        group = "{},{}".format(group, BASE_GROUP_DN)
        response = ldap_conn.modify(
            'gidNumber={},{}'.format(group, BASE_GROUP_DN),
            
            )
    except LDAPException as e:
        response = ("The error is ", e)
    ldap_conn.unbind()
    return response