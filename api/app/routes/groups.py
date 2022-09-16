from flask import Blueprint, request, jsonify
from app.lib.auth import generate_token, ldap_client
from app.lib.groups import add_ldap_group, delete_ldap_group

bp = Blueprint('groups', __name__, url_prefix='/api/groups')


@bp.route('/', methods=['POST'])
def create_group():
    try:
        data = request.get_json()
        response = add_ldap_group(data['name'], data['gidNumber'])
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        # raise e
        return jsonify(error=str(e), status="error"), 200

@bp.route('/', methods=['GET'])
def list_groups():
    try:
        data = request.get_json()
        response = add_ldap_group(data['name'], data['gid'])
        print(response)
        return jsonify(response), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200

@bp.route('/', methods=['PUT'])
def edit_group():
    try:
        data = request.get_json()
        client = add_ldap_group(data['name'], data['gid'])
        print(client)
        return jsonify(status="success", gid=data['gid']), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200


@bp.route('/', methods=['DELETE'])
def delete_group():
    try:
        data = request.get_json()
        client = delete_ldap_group(data['name'], data['gid'])
        print(client)
        return jsonify(status="success", gid=data['gid']), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200