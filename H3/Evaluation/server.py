from flask import Flask, json
from flask import request
from flask import jsonify

PORT = 3333

app = Flask(__name__)


@app.route("/", methods=['GET'])
def index():
    return 'Pump IT Up Evaluation Server'


@app.route("/api/v1/evaluation", methods=['POST'])
def create_dir():
    print(request.json)
    return jsonify({
        'message': 'Evaluation started!'
    })


if __name__ == "__main__":
    app.run(port=PORT, debug=True)
