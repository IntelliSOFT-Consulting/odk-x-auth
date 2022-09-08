from http import client
from flask import Blueprint, request, jsonify
from app.lib.auth import ldap_client

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    client = ldap_client(user=data['user'], password=data['password'])
    print(client)
    return jsonify(error="error")


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
