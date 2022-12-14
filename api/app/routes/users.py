from flask import Blueprint, jsonify, request
from app.lib.auth import admin_token_required, modify_password, modify_user_group
from app.lib.groups import delete_ldap_user
from app.lib.search import search_ldap

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route('/', methods=['GET'])
@admin_token_required
def get_users():
    try:
        response = search_ldap(entity="users")
        return jsonify(response), 200 if response['status'] == "success" else 400    
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400

@bp.route('/<string:name>', methods=['GET'])
@admin_token_required
def get_user(name):
    try:
        response = search_ldap(entity="users", name=name)
        return jsonify(response), 200 if response['status'] == "success" else 400    
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400

@bp.route('/<string:name>', methods=['POST'])
@admin_token_required
def edit_user(name):
    try:
        data = request.get_json()
        if data['password']:
            response = modify_password(name, data['password'])
        if data['gidNumber']:
            response = modify_user_group(name, data["gidNumber"])
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400

@bp.route('/<string:name>', methods=['DELETE'])
@admin_token_required
def delete_user(name):
    try:
        response = delete_ldap_user(name)
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400
