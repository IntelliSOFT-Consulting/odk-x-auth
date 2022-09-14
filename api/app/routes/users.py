from flask import Blueprint, request, jsonify
from app.lib.search import get_ldap_users
from app.lib.groups import add_ldap_group

bp = Blueprint('users', __name__, url_prefix='/api/users')


@bp.route('/', methods=['GET'])
def get_users():
    try:
        users = get_ldap_users()
        if users["status"] == "error":
            return jsonify(error=str(users["error"]), status="error"), 400

        return jsonify(status="success", data=users['data'])
            
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200


@bp.route('/', methods=['DELETE'])
def delete_user():
    try:
        users = get_ldap_users()
        return jsonify(status="success", users=users), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200
