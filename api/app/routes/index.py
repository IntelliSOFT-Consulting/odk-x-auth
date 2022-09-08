from flask import Blueprint, render_template

bp = Blueprint('index', __name__, url_prefix='')


@bp.route('/')
def index():
    return render_template("index.html")

# @bp.route('/secured')
# @login_required
# def index_unsecured():

#     return render_template("index.html")
