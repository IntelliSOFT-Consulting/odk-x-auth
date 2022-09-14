from flask import Blueprint, request, jsonify
from app.lib.auth import add_new_user_to_group, generate_token, ldap_client

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
        return jsonify(add_new_user_to_group(data['name'],data['email'], data['group'])), 200
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
