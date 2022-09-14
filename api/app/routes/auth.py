from flask import Blueprint, request, jsonify
from ldap3 import generate_token, ldap_client

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        client = ldap_client(user=data['user'], password=data['password'])
        print(client)
        return jsonify(status="success", token=generate_token(data['user']))
    except Exception as e:
        return jsonify(error=str(e), status="error")


@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    return jsonify(data)


@bp.route('/reset-password', methods=['GET', 'POST'])
def update_password():
    if request.method == 'GET':
        token = request.args.get('token')
        user_id = request.args.get('user_id')

    return jsonify(error="rror")
