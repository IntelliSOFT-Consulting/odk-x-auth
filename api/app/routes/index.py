from flask import Blueprint, send_from_directory
import os
bp = Blueprint('index', __name__, url_prefix='',
               static_folder=os.path.realpath(os.path.join(os.getcwd(), '../ui/build')), static_url_path='/')


# Serve React App

@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def serve_(path):
    print(path)
    if path != "" and os.path.exists(bp.static_folder + '/' + path):
        return send_from_directory(bp.static_folder+"/static/", path)
    else:
        return send_from_directory(bp.static_folder, 'index.html')


# @bp.errorhandler(404)
# def not_found(e):
#     return send_from_directory(bp.static_folder, 'index.html')


@bp.route('/static/<string:folder>/<string:filename>')
def serve_static(folder, filename):
    return send_from_directory(bp.static_folder + "/static/", "{}/{}".format(folder, filename))
