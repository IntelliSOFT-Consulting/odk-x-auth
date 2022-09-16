from app.config import LDAP_DOMAIN
from app.lib.auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError


def add_ldap_group(group, gid):

    # object class for group should be mentioned.
    # set all the group attributes
    ldap_attr = {
        'cn': group
    }
    # object class for group should be mentioned.
    ldap_attr['objectClass'] = ['posixGroup', 'top']
    # ldap_attr['gidNumber'] = '500'
    # ldap_attr['dn'] = group

    # Bind connection to LDAP server
    # ldap_conn = ldap_client()
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")

    try:
        # this will add group1 to the base directory tree
        response = ldap_conn.add('gidNumber={},ou=default_prefix,ou=groups,dc=example,dc=com'.format(
            gid), ldap_attr)
    except LDAPException as e:
        response = (" The error is ", e)
    ldap_conn.unbind()
    return response


def delete_ldap_group(group):


    # object class for group should be mentioned.
    # set all the group attributes
    ldap_attr = {
        'gidNumber': group
    }
    # object class for group should be mentioned.
    ldap_attr['objectClass'] = 'posixGroup'
    # ldap_attr['gidNumber'] = '500'
    # ldap_attr['dn'] = group

    # Bind connection to LDAP server
    # ldap_conn = ldap_client()
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")

    try:
        # this will add group1 to the base directory tree
        response = ldap_conn.add('cn={},ou=default_prefix,ou=groups,dc=example,dc=com'.format(
            group), 'posixGroup')
    except LDAPException as e:
        response = (" The error is ", e)
    ldap_conn.unbind()
    return response