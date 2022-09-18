from random import randint
import uuid
import datetime
from functools import wraps
from flask import request, jsonify
from app.config import BASE_USER_DN, LDAP_DOMAIN, SECRET_KEY, LDAP_HOST, LDAP_PORT
import jwt
from ldap3 import Connection, SAFE_SYNC
from ldap3.core.exceptions import LDAPException, LDAPBindError, LDAPInvalidValueError


def ldap_client(user, password):
    try:
        return Connection(
            LDAP_HOST,
            user=user,
            password=password,
            auto_bind=True,
            client_strategy=SAFE_SYNC,
        )
    except LDAPBindError as e:
        print(e)


def generate_token(user):
    payload = {"user": user}
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS512")
    return str(token)


def get_user_from_token(token):
    return jwt.decode(token, key=SECRET_KEY, algorithms=["HS512"])["user"]


def access_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.headers.get("Authorization"):
            token = (request.headers.get("Authorization")).split("Bearer ")[1]
            try:
                token = jwt.decode(token, SECRET_KEY, algorithms=["HS512"])
                if token["type"] != "client":
                    return jsonify(error="invalid access token", status="error"), 401
                if token["exp"] <= int(datetime.now().timestamp()):
                    return jsonify(error="invalid access token", status="error"), 401
            except Exception as e:
                return jsonify(error="invalid access token", status="error"), 401
            return f(*args, **kwargs)
        else:
            error = "access token is required"
            return jsonify(error=error, status="error")

    return decorated


""" add method takes a user_dn, objectclass and attributes as    dictionary  """


def add_new_user(first_name, last_name, email, gidNumber):

    try:
        full_names = first_name + " " + last_name
        # Bind connection to LDAP server
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")

        # this will create testuser inside group1
        user_dn = "cn={},{}".format(
            (last_name + "_" + first_name).lower(), BASE_USER_DN
        )
        # object class for a user is inetOrgPerson
        response = ldap_conn.add(
            user_dn,
            attributes={
                "objectClass": ["posixAccount", "inetOrgPerson"],
                "commonname": full_names,
                "mail": email,
                "sn": last_name,
                "givenName": first_name,
                "gidNumber": gidNumber,
                "uid": email.lower(),
                "uidNumber": int(sum([randint(1000,9999), randint(1000,9999)])/2),
                "homeDirectory": "/home/users/test",
                "userPassword": str(uuid.uuid4()),
            },
        )
        print(response[1])
        print(response[3])
        ldap_conn.unbind()
        if response[0] == True:
            return {
                "user": {
                    "names": dict(response[3]["attributes"])["commonname"][0],
                    "email": dict(response[3]["attributes"])["mail"][0],
                    "surname": dict(response[3]["attributes"])["sn"][0],
                    "dn": response[3]["entry"],
                },
                "status": "success",
            }
        elif response[0] == False:
            return {"error": response[1]["description"], "status": "error"}
    except LDAPInvalidValueError as err:
        response = str(err)
        print(response)
    except LDAPException as e:
        response = str(e)
        print(response)
    ldap_conn.unbind()
    return {"error": response, "status": "error"}


def modify_ldap_user(gidNumber, data):
    try:
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        # this will add group1 to the base directory tree
        response = ldap_conn.modify(
            "gidNumber={},{}".format(group, BASE_GROUP_DN),
            MODIFY_ADD,
            "{},{}".format(
                user,
            ),
        )
    except LDAPException as e:
        response = ("The error is ", e)
    ldap_conn.unbind()
    return response
