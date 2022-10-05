from random import randint
import uuid
import datetime
from functools import wraps
from flask import request, jsonify
from app.config import BASE_USER_DN, LDAP_DOMAIN, SECRET_KEY, LDAP_HOST, LDAP_PORT
import jwt
from ldap3 import Connection, SAFE_SYNC, HASHED_SALTED_SHA, MODIFY_REPLACE
from ldap3.core.exceptions import LDAPException, LDAPBindError, LDAPInvalidValueError
from ldap3.utils.hashed import hashed


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
    payload = {"user": user, "type":"ldap-admin"}
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS512")
    return str(token)


def generate_reset_token(user):
    payload = {"user": user, "type": "reset"}
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS512")
    return str(token)



def get_user_from_token(token):
    return jwt.decode(token, key=SECRET_KEY, algorithms=["HS512"])["user"]


def modify_password(user, password):
    try:
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")
        user = "cn={},{}".format(user, BASE_USER_DN)
        response = ldap_conn.modify(
            user,
            changes={
                "userPassword": [
                    (MODIFY_REPLACE, [hashed(HASHED_SALTED_SHA, password)])
                ]
            },
        )
        print(response)
        print(ldap_conn.result)
        return {"response": response, "status": "success"}
    except LDAPException as e:
        print(e)
        response = {"status": "error", "error": str(e)}
    ldap_conn.unbind()
    return response


def access_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.headers.get("Authorization"):
            token = (request.headers.get("Authorization")).split("Bearer ")[1]
            try:
                token = jwt.decode(token, SECRET_KEY, algorithms=["HS512"])
                if token["type"] != "reset":
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


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.headers.get("Authorization"):
            token = (request.headers.get("Authorization")).split("Bearer ")[1]
            try:
                token = jwt.decode(token, SECRET_KEY, algorithms=["HS512"])
                if token["type"] != "ldap-admin":
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
        ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")

        user_dn = "cn={},{}".format(
            (last_name + "_" + first_name).lower(), BASE_USER_DN
        )
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
                "uidNumber": int(
                    sum([randint(11111111, 99999999), randint(111111, 999999)]) / 2
                ),
                "homeDirectory": "/home/users/test",
                "userPassword": str(uuid.uuid4()),
            },
        )
        print(response[1]['result'])
        if response[1]['result'] != 0:
            return {"error": response[1]["description"], "status": "error"}
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
        response = str("LDAPException error")
        print(response)
    ldap_conn.unbind()

    return {"error": response, "status": "error"}
