from cerberus import Validator

EVALUATION_REQUEST_SCHEMA = {
    "evaluation_id": {
        'type': ('integer', 'string'),
        'required': True,
        'empty': True
    }
}


def is_int(evaluation_id):
    evaluation_id_str = str(evaluation_id)
    if len(evaluation_id_str) == 0 or evaluation_id_str == '-':
        return False
    start_from = 1 if evaluation_id_str[0] in ('-', '+') else 0
    return evaluation_id_str[start_from:].isdigit()


def validate_body(body):
    if not Validator(EVALUATION_REQUEST_SCHEMA).validate(body):
        return False
    return is_int(body['evaluation_id'])
