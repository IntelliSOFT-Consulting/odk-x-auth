import os
from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    app.url_map.strict_slashes = False

    app.config.from_mapping(SECRET_KEY=os.environ.get(
        'SECRET_KEY') or 'you-will-never-guess',)

    from app.routes import index, auth, users, groups

    app.register_blueprint(index.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(groups.bp)

    return app


app = create_app()
