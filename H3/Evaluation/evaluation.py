from google.cloud import datastore
from google.cloud import storage

import FileUtils
import EvaluationArgsBuilder
import Helper

from EvaluationBase import EvaluationBase
from EvaluationCpp import EvaluationCpp
from EvaluationPython import EvaluationPython
from EvaluationC import EvaluationC

GPC_DATASTORE_KIND_EVALUATION = 'Evaluation'
GPC_DATASTORE_KIND_PROBLEM = 'Problem'


def evaluate(evaluation_id):
    datastore_client = datastore.Client()
    storage_client = storage.Client()
    file_utils = FileUtils.FileUtils(evaluation_id)
    helper = Helper.Helper()

    evaluation_obj_key = datastore_client.key(
        GPC_DATASTORE_KIND_EVALUATION, int(evaluation_id))
    evaluation_obj = datastore_client.get(evaluation_obj_key)
    if evaluation_obj is None:
        return ("Invalid evaluation_id in body! The evaluation doesn't exist!", 400)

    problem_id = int(evaluation_obj['problemId'])
    problem_obj_key = datastore_client.key(
        GPC_DATASTORE_KIND_PROBLEM, problem_id)
    problem_obj = datastore_client.get(problem_obj_key)
    if problem_obj is None:
        return ("Internal logic error! The evaluation contains an invalid problem_id!", 500)

    evaluation_args = EvaluationArgsBuilder.EvaluationArgsBuilder() \
        .with_datastore_client(datastore_client) \
        .with_storage_client(storage_client) \
        .with_file_utils(file_utils) \
        .with_evaluation_id(evaluation_id) \
        .with_evaluation_obj(evaluation_obj) \
        .with_problem_obj(problem_obj) \
        .with_helper(helper) \
        .build()

    evaluation: EvaluationBase = None

    language = evaluation_obj['lang']
    if language == 'C++':
        evaluation = EvaluationCpp(evaluation_args)
    elif language == 'Python':
        evaluation = EvaluationPython(evaluation_args)
    elif language == 'C':
        evaluation = EvaluationC(evaluation_args)

    if evaluation is None:
        return ("Internal logic error! The evaluation contains an invalid programming language!", 500)

    evaluation.init_evaluation()
    evaluation.evaluate()
    return evaluation.finish_evaluation()
