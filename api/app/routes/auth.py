from flask import Blueprint, request, jsonify

from app.lib.auth import add_new_user, generate_token, ldap_client

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        client = ldap_client(user=data['user'], password=data['password'])
        print(client)
        if client:
            return jsonify(status="success", token=generate_token(data['user'])), 200
        return jsonify(error="Invalid username / password", status="error"), 401
    except Exception as e:
        return jsonify(error=str(e), status="error"), 401


@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        response = add_new_user(data['first_name'], data['last_name'] , data['email'], data['gidNumber'])
        return jsonify(response), 200 if response['status'] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route('/reset-password', methods=['GET', 'POST'])
def update_password():
    if request.method == 'GET':
        token = request.args.get('token')
        user = request.args.get('user')
        return jsonify(status="success", message="Password reset successfully")
    if request.method == 'POST':
        data = request.get_json()
        password = data['password']
        return jsonify(status="success", message="Password reset instructions sent")
