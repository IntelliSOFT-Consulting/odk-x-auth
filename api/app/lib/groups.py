from app.config import BASE_GROUP_DN, BASE_USER_DN, LDAP_BASE, LDAP_DOMAIN
from app.lib.auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError
from ldap3 import MODIFY_ADD, MODIFY_DELETE
from ldap3.extend.microsoft.addMembersToGroups import ad_add_members_to_groups as addUsersInGroups


def add_ldap_group(group, gid):
    ldap_attr = {'cn': group}
    # object class for group should be mentioned.
    ldap_attr['objectClass'] = ['posixGroup', 'top']
    # ldap_conn = ldap_client()
    ldap_conn = ldap_client("cn=admin,{}".format(LDAP_BASE), "admin")
    try:
        response = ldap_conn.add('gidNumber={},{}'.format(
            gid, BASE_GROUP_DN), ['posixGroup', 'top'], ldap_attr)
        print(response[1])
        print(response[3])
        if response[0] == True:
            response = {"group": {
                "name": dict(response[3]['attributes'])['cn'][0],
                "dn": response[3]['entry'],
                "gidNumber":gid
            }, "status": "success"}
        elif response[0] == False:
            response = {"error": response[1]['description'], "status": "error"}
    except LDAPException as e:
        response = e
        response = {"error": response, "status": "error"}
    ldap_conn.unbind()
    return response


def delete_ldap_group(gidNumber):
    try:
        ldap_conn = ldap_client("cn=admin,{}".format(LDAP_BASE), "admin")
        response = ldap_conn.delete(
            'gidNumber={},{}'.format(gidNumber, BASE_GROUP_DN))
        print(response)
        if response[0] == True:
            return {"message": "group {} delete successfully", "status": "success"}
        elif response[0] == False:
            return {"error": response[1]['description'], "status": "error"}
    except LDAPException as e:
        print(e)
        response = {"status": "error", "error": str(e)}
    ldap_conn.unbind()
    return response


# def modify_ldap_group(gidNumber, data):
#     try:
#         ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
#         # this will add group1 to the base directory tree
#         response = ldap_conn.modify('gidNumber={},{}'.format(
#             group, BASE_GROUP_DN),
#             MODIFY_ADD,
#             "{},{}".format(user, )
#         )
#     except LDAPException as e:
#         response = ("The error is ", e)
#     ldap_conn.unbind()
#     return response


def add_user_to_group(user, gidNumber):
    try:
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        # this will add group1 to the base directory tree
        user = "{},{}".format(user, BASE_USER_DN)
        print(user)
        group = "{},{}".format(gidNumber, BASE_GROUP_DN)
        # response = ldap_conn.modify(
        #     'gidNumber={},{}'.format(group, BASE_GROUP_DN),

        # )
        response = addUsersInGroups(ldap_conn, [user], [group])
        return {"error": response, "status": "error"}
    except LDAPException as e:
        print(e)
        response = {"status": "error", "error": str(e)}
    ldap_conn.unbind()
    return response
