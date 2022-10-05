from flask import Blueprint, request, jsonify
from app.lib.email import send_email

from app.lib.auth import (
    access_token_required,
    add_new_user,
    admin_token_required,
    generate_token,
    get_user_from_token,
    ldap_client,
)

bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@bp.route("/login", methods=["POST"])
@admin_token_required
def login():
    try:
        data = request.get_json()
        client = ldap_client(user=data["user"], password=data["password"])
        print(client)
        if client:
            return jsonify(status="success", token=generate_token(data["user"])), 200
        return jsonify(error="Invalid username / password", status="error"), 401
    except Exception as e:
        return jsonify(error=str(e), status="error"), 401


@bp.route("/register", methods=["POST"])
@admin_token_required
def register():
    try:
        data = request.get_json()
        response = add_new_user(
            data["first_name"], data["last_name"], data["email"], data["gidNumber"]
        )
        print(response)
        if response["status"] == "success":
            email_response = send_email(data["email"], email_type="welcome")
            print("SMTP: " ,email_response)
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/reset-password", methods=["POST"])
def initiate_password_reset():
    try:
        data = request.get_json()
        email_response = send_email(data["user"], email_type="reset")
        print("SMTP: ", email_response)
        return jsonify(status="success", message="Password reset successfully")
    except Exception as e:
        return jsonify(error=str(e), status="error"), 401


@bp.route("/set-password", methods=["POST"])
@access_token_required
def set_password():
    try:
        data = request.get_json()
        token = (request.headers.get("Authorization")).split("Bearer ")[1]
        user = get_user_from_token(token)
        password = data["password"]
        return jsonify(status="success", message="Password reset instructions sent")
    except Exception as e:
        return jsonify(error=str(e), status="error"), 401
