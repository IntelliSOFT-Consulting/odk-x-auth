# For groups provide a groupid number instead of a uidNumber
from ldap3 import Server, Connection, ALL, SUBTREE
from app.config import BASE_GROUP_DN, BASE_USER_DN, LDAP_BASE, LDAP_DOMAIN
from .auth import ldap_client
from ldap3.core.exceptions import LDAPException, LDAPInvalidFilterError
import sqlite3
import json


def search_ldap(entity="users", name=None, filter=None):
    # Provide a search base to search for.
    search_base = BASE_USER_DN
    search_filter = "(cn={})".format(name if name else "*")
    if filter:
        search_filter = filter
    if entity == "groups":
        search_filter = "(gidNumber={})".format(name if name else "*")
        search_base = BASE_GROUP_DN

    try:
        # Establish connection to the server
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        # only the attributes specified will be returned
        res = ldap_conn.search(search_base, search_filter, attributes=["*"])
        print(res)
        if res[0] == True and entity == "users":
            results = [
                (
                    {
                        "dn": i["dn"],
                        "uid": i["dn"],
                        # "attributes": (dict(i["attributes"])),
                        "names": dict(i["attributes"])["cn"][0],
                        "user_name": dict(i["attributes"])["cn"][1],
                        "email": dict(i["attributes"])["mail"][0],
                        "last_name": dict(i["attributes"])["sn"][0],
                        "gidNumber": dict(i["attributes"])["gidNumber"] or None,
                        "groupName": dict(i["attributes"])["gidNumber"] or None,
                        "created_time": "2022-09-14T14:57:04.000Z",
                        "created_by": "Admin",
                    }
                )
                for i in res[2]
            ]
            return {"status": "success", "data": results}
        if res[0] == True and entity == "groups":
            results = [
                (
                    {
                        "dn": i["dn"],
                        "attributes": dict(i["attributes"]),
                        "name": dict(i["attributes"])["cn"][0],
                        "gidNumber": dict(i["attributes"])["gidNumber"],
                        "group_id": dict(i["attributes"])["gidNumber"],
                        "created_time": "2022-09-14T20:12:31.000Z",
                        "created_by": "Admin",
                    }
                )
                for i in res[2]
            ]
            return {"status": "success", "data": results}
        if res[0] == False and res[1]["description"] == "success" and len(res[2]) == 0:
            return {"status": "success", "data": []}
        else:
            return {"status": "error", "error": res[1]["description"]}
    except LDAPInvalidFilterError as err:
        return {"error": "LDAPInvalidFilterError:{}".format(err), "status": "error"}
    except LDAPException as e:
        return {"error": e, "status": "error"}


def find_user_by_email(email):
    try:
        users = search_ldap()
        print(users["data"])
        for user in users["data"]:
            if email == user["email"]:
                return user
        return None
    except LDAPException as e:
        print(e)
        return None


def find_user_by_username(username):
    try:
        users = search_ldap()
        print(users["data"])
        for user in users["data"]:
            if username == user["user_name"]:
                return user
        return None
    except LDAPException as e:
        print(e)
        return None
