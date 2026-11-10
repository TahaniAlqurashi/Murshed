
from flask import Blueprint, jsonify, request

from chatbot.router import route_message


chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/api/chat/message", methods=["POST"])
def chat_message():
    body = request.get_json(silent=True) or {}

    out = route_message(body)

    return jsonify({
        "status": "success",
        "data": out
    })
