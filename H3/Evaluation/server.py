from flask import Flask
from flask import request
from flask import jsonify

from validator import validate_body
from evaluation import evaluate

PORT = 3333

app = Flask(__name__)


def create_error_message(message, status=400):
    return (jsonify({
        'success': 'False',
        'message': message
    }), status)


def create_success_message(message):
    return jsonify({
        'success': 'True',
        'message': message
    })


@app.route("/", methods=['GET'])
def index():
    return 'Pump IT Up Evaluation Server'


@app.route("/api/v1/evaluation", methods=['POST'])
def evaluate_submission():
    try:
        request_body = request.get_json(force=True)
        if not validate_body(request.json):
            return create_error_message("Invalid request body! Expected a JSON object containing only the evaluation id!")
        evaluation_id = request.json['evaluation_id']
        message, status = evaluate(evaluation_id)
        if status == 200:
            return create_success_message(message)
        return create_error_message(message, status)
    except Exception as e:
        print(e)
        return create_error_message("Unexpected server error!", 500)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
