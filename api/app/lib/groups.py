from app.lib.auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError


def add_ldap_group(group, gid):

    # set all the group attributes
    ldap_attr = {}

    # object class for group should be mentioned.
    ldap_attr['objectClass'] = ['top', 'posixGroup']
    ldap_attr['gidNumber'] = gid

    # Bind connection to LDAP server
    ldap_conn = ldap_client()

    try:
        # this will add group1 to the base directory tree
        response = ldap_conn.add('cn={},dc=example,dc=com'.format(group), 
                                  attributes=ldap_attr)
    except LDAPException as e:
        response = (" The error is ", e)
    ldap_conn.unbind()
    return response