
import uuid
import datetime
from functools import wraps
from flask import request, jsonify
from app.config import LDAP_DOMAIN, SECRET_KEY, LDAP_HOST, LDAP_PORT
import jwt
from ldap3 import Connection, SAFE_SYNC
from ldap3.core.exceptions import LDAPException, LDAPBindError


def ldap_client(user, password):
    try:
        return Connection(LDAP_HOST, user=user,
                          password=password, auto_bind=True, client_strategy=SAFE_SYNC)
    except LDAPBindError as e:
        print(e)


def generate_token(user):
    payload = {"user": user}
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm='HS512')
    return str(token)


def get_user_from_token(token):
    return jwt.decode(token, key=SECRET_KEY, algorithms=['HS512'])['user']


def access_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.headers.get('Authorization'):
            token = (request.headers.get('Authorization')).split("Bearer ")[1]
            try:
                token = jwt.decode(token, SECRET_KEY, algorithms=['HS512'])
                if token['type'] != 'client':
                    return jsonify(error="invalid access token", status="error"), 401
                if token['exp'] <= int(datetime.now().timestamp()):
                    return jsonify(error="invalid access token", status="error"), 401
            except Exception as e:
                return jsonify(error="invalid access token", status="error"), 401
            return f(*args, **kwargs)
        else:
            error = "access token is required"
            return jsonify(error=error, status="error")
    return decorated


""" add method takes a user_dn, objectclass and attributes as    dictionary  """

def add_new_user(first_name, last_name, email):
    full_names = first_name + " " + last_name
    # Bind connection to LDAP server
    ldap_conn = ldap_client("cn=admin,dc=example,dc=org", "admin")

    # this will create testuser inside group1
    user_dn = "cn={},ou=people,dc=example,dc=org".format((last_name + "_" + first_name).lower())

    try:
        # object class for a user is inetOrgPerson
        response = ldap_conn.add(user_dn,
                                attributes={'objectClass':  ['inetOrgPerson', 'top'],
                                             'commonname': full_names, "mail": email, 'sn': last_name})
        print(response[1])
        print(response[3])
        if response[0] == True:
            print(response[0])
            return {"data": response[3], "status": "success"}
        elif response[0] == False:
            return {"error": response[1]['description'], "status": "error"}
    except LDAPException as e:
        response = e
        return {"error": response, "status": "error"}
