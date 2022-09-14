# For groups provide a groupid number instead of a uidNumber
from ldap3 import Server, Connection, ALL, SUBTREE
from .auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPBindError


def get_ldap_users():
    
    # Provide a search base to search for.
    search_base = 'dc=example,dc=com'
    # provide a uidNumber to search for. '*" to fetch all users/groups
    search_filter = '(uidNumber=500)'

    # Establish connection to the server
    ldap_conn = ldap_client(" ")
    try:
        # only the attributes specified will be returned
        ldap_conn.search(search_base=search_base,       
                         search_filter=search_filter,
                         search_scope=SUBTREE, 
                         attributes=['*'])
        # search will not return any values.
        # the entries method in connection object returns the results 
        results = ldap_conn.entries
    except LDAPException as e:
        results = e
    return results

def get_ldap_users():
    
    # Provide a search base to search for.
    search_base = 'dc=example,dc=com'
    # provide a uidNumber to search for. '*" to fetch all users/groups
    search_filter = '(uidNumber=500)'

    # Establish connection to the server
    ldap_conn = ldap_client()
    try:
        # only the attributes specified will be returned
        ldap_conn.search(search_base=search_base,       
                         search_filter=search_filter,
                         search_scope=SUBTREE, 
                         attributes=['*'])
        # search will not return any values.
        # the entries method in connection object returns the results 
        results = ldap_conn.entries
    except LDAPException as e:
        results = e
    return results