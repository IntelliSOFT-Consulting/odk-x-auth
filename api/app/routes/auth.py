from flask import Blueprint, request, jsonify

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():

    email_address = request.form['email_address']
    password = request.form['password']
    
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