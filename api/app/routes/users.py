from flask import Blueprint, jsonify
from app.lib.search import search_ldap

bp = Blueprint('users', __name__, url_prefix='/api/users')


@bp.route('/', methods=['GET'])
def get_users():
    try:
        response = search_ldap(entity="users")
        return jsonify(response), 200 if response['status'] == "success" else 400    
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200

@bp.route('/<string:name>', methods=['GET'])
def get_user(name):
    try:
        response = search_ldap(entity="users", name=name)
        return jsonify(response), 200 if response['status'] == "success" else 400    
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200

@bp.route('/', methods=['DELETE'])
def delete_user():
    try:
        response = search_ldap(entity="users")
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200
