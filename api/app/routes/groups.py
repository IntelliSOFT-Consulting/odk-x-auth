from flask import Blueprint, request, jsonify
from app.lib.search import search_ldap
from app.lib.groups import add_ldap_group, add_user_to_group, delete_ldap_group, modify_ldap_group

bp = Blueprint('groups', __name__, url_prefix='/api/groups')


@bp.route('/', methods=['POST'])
def create_group():
    try:
        data = request.get_json()
        response = add_ldap_group(data['name'], data['gidNumber'])
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        # raise e
        return jsonify(error=str(e), status="error"), 400


@bp.route('/', methods=['GET'])
def list_groups():
    try:
        response = search_ldap(entity="groups")
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route('/<int:gidNumber>', methods=['PUT'])
def edit_group(gidNumber):
    try:
        data = request.get_json()
        client = modify_ldap_group(data['name'], data['gidNumber'])
        print(client)
        return jsonify(status="success", gid=data['gid']), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route('/<int:gidNumber>', methods=['POST'])
def assign_group(gidNumber):
    try:
        data = request.get_json()
        response = add_user_to_group(user=data['user'], gidNumber=gidNumber)
        return jsonify(response), 200 if response['status'] == "success" else 400        
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route('/<int:gidNumber>', methods=['DELETE'])
def delete_group(gidNumber):
    try:
        response = delete_ldap_group(gidNumber)
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400
