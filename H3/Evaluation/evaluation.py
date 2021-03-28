import os
import subprocess
import filecmp

from google.cloud import datastore
from google.cloud import storage

GPC_DATASTORE_KIND_EVALUATION = 'Evaluation'
GPC_DATASTORE_KIND_PROBLEM = 'Problem'

GPC_STORAGE_TESTS_BUCKET = 'problems-test-cases'
GPC_STORAGE_EVALUATIONS_BUCKET = 'evaluation-submissions'

WORK_DIRECTORY_PREFIX = 'evaluations'


def process_files(files):
    names = []
    for blob in files:
        names.append(str(blob.name))
    return sorted(names)


def create_working_directory(evaluation_id):
    dir_path = './' + WORK_DIRECTORY_PREFIX + '/' + evaluation_id
    if os.path.exists(dir_path):
        return
    try:
        os.mkdir(dir_path)
    except Exception as e:
        print(e)


def download_source_code(storage_client, sources_bucket, evaluation_id):
    source_code_file_name = str(evaluation_id) + '.cpp'
    blob = storage.Blob(source_code_file_name, sources_bucket)
    source_code_file_path = './' + WORK_DIRECTORY_PREFIX + \
        '/' + evaluation_id + '/' + source_code_file_name
    with open(source_code_file_path, "wb") as source_code_file:
        storage_client.download_blob_to_file(blob, source_code_file)
    return source_code_file_path


def compile_source_code(source_code_file_path, evaluation_id):
    source_code_executable_path = './' + \
        WORK_DIRECTORY_PREFIX + '/' + evaluation_id + '/' + evaluation_id + '.exe'

    command_parts = [
        'g++',
        '-std=c++1y',
        '-o',
        source_code_executable_path,
        source_code_file_path
    ]
    exit_code = subprocess.run(command_parts)

    return (exit_code.returncode, source_code_executable_path)


def create_evaluation_input_file(evaluation_id, file_name_prefix):
    pass


def evaluate_source_code(storage_client, evaluation_obj, source_code_executable_path,
                         input_file_names, output_file_names, evaluation_id, file_name_prefix):
    for (inp, outp) in zip(input_file_names, output_file_names):
        create_evaluation_input_file(evaluation_id, file_name_prefix)
        # Execute
        # Check if the two files are the same


def evaluate(evaluation_id):
    datastore_client = datastore.Client()

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

    evaluation_obj['status'] = 'Evaluating'
    datastore_client.put(evaluation_obj)

    storage_client = storage.Client()
    test_cases_bucket = storage_client.get_bucket(GPC_STORAGE_TESTS_BUCKET)
    input_files = list(storage_client.list_blobs(
        test_cases_bucket, prefix=str(problem_id) + '/input'))
    output_files = list(storage_client.list_blobs(
        test_cases_bucket, prefix=str(problem_id) + '/output'))

    input_file_names = process_files(input_files)
    output_file_names = process_files(output_files)

    create_working_directory(evaluation_id)

    sources_bucket = storage_client.get_bucket(GPC_STORAGE_EVALUATIONS_BUCKET)
    source_code_file_path = download_source_code(
        storage_client, sources_bucket, evaluation_id)

    compilation_info = compile_source_code(
        source_code_file_path, evaluation_id)
    if compilation_info[0] != 0:
        evaluation_obj['verdict'] = 'Compilation failed!'
    else:
        evaluate_source_code(storage_client, evaluation_obj, compilation_info[1],
                             input_file_names, output_file_names, evaluation_id, 'input')

    evaluation_obj['status'] = 'Completed'
    datastore_client.put(evaluation_obj)
    return ("The evaluation was completed successfully!", 200)
