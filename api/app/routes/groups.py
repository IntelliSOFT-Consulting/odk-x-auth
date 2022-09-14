from flask import Blueprint, request, jsonify
from app.lib.auth import generate_token, ldap_client
from app.lib.groups import add_ldap_group

bp = Blueprint('groups', __name__, url_prefix='/api/groups')


@bp.route('/', methods=['POST'])
def create_group():
    try:
        data = request.get_json()
        client = add_ldap_group(data['name'], data['gid'])
        print(client)
        return jsonify(status="success", gid=data['gid']), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200

@bp.route('/', methods=['GET'])
def list_groups():
    try:
        data = request.get_json()
        client = add_ldap_group(data['name'], data['gid'])
        print(client)
        return jsonify(status="success", gid=data['gid']), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200

