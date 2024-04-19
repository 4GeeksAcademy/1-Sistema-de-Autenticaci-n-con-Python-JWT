"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Primera ruta para el login
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # remplazar con la logica para consultar la base de datos 
    # tratamos el Error
    if email != "loco@loco" or password != "loco":
        response_body['message'] = "error con el Email o con la Password"
        return response_body, 401  
    user = {'email': email,
            'name': 'Carlos',
            'is_admin': True,
            'lastname': 'Betancourt'}
    access_token = create_access_token(identity=['Funciona', user]) # esta sera nuestra respuesta al ser el toquen correcto
    response_body['access_token'] = access_token
    response_body['message'] = "Logeado con existo y con el token"
    response_body['results'] = user
    return response_body, 200


# Segunda ruta para la pagina privada 
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()
    if current_user[1]['name'] == 'Carlos':
        response_body['message'] = 'Perfil de Carlos, Tiene Acceso'
        return response_body, 200
    response_body['message'] = 'Perfil sin acceso'
    return response_body, 401
