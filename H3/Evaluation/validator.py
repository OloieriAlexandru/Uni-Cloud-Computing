from cerberus import Validator

EVALUATION_REQUEST_SCHEMA = {
    "evaluation_id": {
        'type': 'string',
        'required': True
    }
}


def validate_body(body):
    return Validator(EVALUATION_REQUEST_SCHEMA).validate(body)
