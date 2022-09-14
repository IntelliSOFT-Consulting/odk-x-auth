from flask import Blueprint, request, jsonify
from ..lib.auth import generate_token, ldap_client

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        client = ldap_client(user=data['user'], password=data['password'])
        print(client)
        return jsonify(status="success", token=generate_token(data['user'])), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 200


@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        return jsonify(status="success", data=data), 200

    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route('/reset-password', methods=['GET', 'POST'])
def update_password():
    if request.method == 'GET':
        token = request.args.get('token')
        user = request.args.get('user')
        return jsonify(status="success")
    if request.method == 'POST':
        data = request.get_json()
        password = data['password']
        ## find user.

        ## alter user attributes.

        return jsonify(status="success")
