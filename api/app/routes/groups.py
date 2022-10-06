from flask import Blueprint, request, jsonify
from app.lib.auth import admin_token_required, modify_user_group
from app.lib.search import search_ldap
from app.lib.groups import add_ldap_group, delete_ldap_group


bp = Blueprint("groups", __name__, url_prefix="/api/groups")


@bp.route("/", methods=["POST"])
@admin_token_required
def create_group():
    try:
        data = request.get_json()
        response = add_ldap_group(data["name"], data["gidNumber"])
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/", methods=["GET"])
@admin_token_required
def list_groups():
    try:
        response = search_ldap(entity="groups")
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/<string:gidNumber>", methods=["GET"])
@admin_token_required
def group_details(gidNumber):
    try:
        response = search_ldap(entity="groups", name=gidNumber)
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/<int:gidNumber>", methods=["PUT"])
@admin_token_required
def edit_group(gidNumber):
    try:
        data = request.get_json()
        client = modify_user_group(data["user"], gidNumber)
        print(client)
        return jsonify(status="success", gid=data["gid"]), 200
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/<int:gidNumber>", methods=["POST"])
@admin_token_required
def assign_group(gidNumber):
    try:
        data = request.get_json()
        response = modify_user_group(data["user"], gidNumber)
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400


@bp.route("/<int:gidNumber>", methods=["DELETE"])
@admin_token_required
def delete_group(gidNumber):
    try:
        response = delete_ldap_group(gidNumber)
        return jsonify(response), 200 if response["status"] == "success" else 400
    except Exception as e:
        return jsonify(error=str(e), status="error"), 400
