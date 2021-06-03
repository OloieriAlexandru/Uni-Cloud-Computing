import os
import subprocess
import time

from google.cloud import storage
from EvaluationArgs import EvaluationArgs


GPC_STORAGE_TESTS_BUCKET = 'problems-test-cases'
GPC_STORAGE_EVALUATIONS_BUCKET = 'evaluation-submissions'


FLAG_CORRECT_ANSWER = 1
FLAG_WRONG_ANSWER = 2
FLAG_TIME_LIMIT_EXCEEDED = 3
FLAG_OUTPUT_FILE_MISSING = 4

EVALUATION_MESSAGES = {
    1: 'Okay',
    2: 'Wrong answer',
    3: 'Time limit exceeded',
    4: 'Output file missing'
}


class EvaluationBase:

    def __init__(self, evaluation_args: EvaluationArgs):
        self.args = evaluation_args

    def init_evaluation(self):
        self.problem_id = self.args.evaluation_obj['problemId']

        # Get test files names
        self.test_cases_bucket = self.args.storage_client.get_bucket(
            GPC_STORAGE_TESTS_BUCKET)
        self.input_files = list(self.args.storage_client.list_blobs(
            self.test_cases_bucket, prefix=str(self.problem_id) + '/input'))
        self.output_files = list(self.args.storage_client.list_blobs(
            self.test_cases_bucket, prefix=str(self.problem_id) + '/output'))
        self.input_files_names = self.args.helper.process_files(
            self.input_files)
        self.output_files_names = self.args.helper.process_files(
            self.output_files)

        # Working directory
        self.args.file_utils.create_working_directory()

        # Get evaluated source code
        self.sources_bucket = self.args.storage_client.get_bucket(
            GPC_STORAGE_EVALUATIONS_BUCKET)
        self.source_code_path = self.download_source_code(
            self.sources_bucket, self.args.evaluation_obj['sourceName'])

        # Evaluation variables
        self.time_limit = 1.0
        self.score = 0.0
        self.score_per_test = 100.0 / \
            min(len(self.input_files_names), len(self.output_files_names))
        self.evaluation_file_prefix = self.args.problem_obj['file']

        # Specific initialization for each programming language
        self.init_evaluation_lang()

    def init_evaluation_lang(self):
        raise NotImplementedError(
            "init_evaluation_lang method is not implemented!")

    def evaluate(self):
        self.test_cases_info = []
        if not self.compile_lang():
            self.args.evaluation_obj['verdict'] = 'Compilation failed!'
        else:
            test_case_id = 0
            for (inp, outp) in zip(self.input_files_names, self.output_files_names):
                self.create_evaluation_file(inp, '.in')
                ok_file_path = self.create_evaluation_file(outp, '.ok')

                test_case_obj_obj = {
                    'no': test_case_id,
                    'message': 'Error',
                    'score': 0,
                    'time': 0
                }

                evaluation_flag = self.execute(test_case_obj_obj)
                if evaluation_flag != FLAG_TIME_LIMIT_EXCEEDED:
                    evaluation_flag = self.evaluate_executable_output(
                        ok_file_path)
                if evaluation_flag == FLAG_CORRECT_ANSWER:
                    test_case_obj_obj['score'] = round(self.score_per_test, 2)
                    self.score += self.score_per_test
                test_case_obj_obj['message'] = EVALUATION_MESSAGES[evaluation_flag]

                self.test_cases_info.append(test_case_obj_obj)
                test_case_id += 1
        self.score = round(self.score, 2)
        self.args.evaluation_obj['verdict'] = str(self.score)
        self.args.evaluation_obj['testCasesStatus'] = self.test_cases_info

    def execute(self, test_case_obj_obj):
        self.command_parts = None
        run_directory = self.args.file_utils.get_work_directory()
        self.execute_lang_init()
        if self.command_parts is None:
            raise NotImplementedError(
                "execute_lang_init should set the self.command_parts object reference!")

        print(self.command_parts)
        print(run_directory)
        p = subprocess.Popen(self.command_parts, shell=True, cwd=run_directory)
        start_time = time.time()

        while True:
            end_time = time.time()
            if p.poll() is not None:
                break
            if end_time - start_time >= self.time_limit:
                break
        test_case_obj_obj['time'] = round(end_time - start_time, 4)

        poll_status = p.poll()
        if poll_status is None:
            # The process hasn't finished
            p.kill()
            return FLAG_TIME_LIMIT_EXCEEDED

        # The execution has finished successfully
        return True

    def compile_lang(self):
        raise NotImplementedError(
            "compile_lang method is not implemented!")

    def execute_lang_init(self):
        raise NotImplementedError(
            "execute_lang_init method is not implemented!")

    def finish_evaluation(self):
        self.args.evaluation_obj['status'] = 'Completed'
        self.args.datastore_client.put(self.args.evaluation_obj)
        return ("The evaluation was completed successfully!", 200)

    def evaluate_executable_output(self, ok_file_path):
        out_file_path = self.args.file_utils.get_work_directory_file_name(
            self.evaluation_file_prefix + '.out')

        if not os.path.exists(out_file_path):
            return FLAG_OUTPUT_FILE_MISSING

        if not self.args.file_utils.compare_files(ok_file_path, out_file_path):
            return FLAG_WRONG_ANSWER

        return FLAG_CORRECT_ANSWER

    def create_evaluation_file(self, remote_file_name, file_extension):
        file_path = self.args.file_utils.get_work_directory_file_name(
            self.evaluation_file_prefix + file_extension)
        return self.download_file_from_storage(self.test_cases_bucket, remote_file_name, file_path)

    def download_source_code(self, bucket, source_code_name):
        source_code_file_path = self.args.file_utils.get_work_directory_file_name(
            source_code_name)
        return self.download_file_from_storage(bucket, source_code_name, source_code_file_path)

    def download_file_from_storage(self, bucket, file_name, file_path):
        blob = storage.Blob(file_name, bucket)
        with open(file_path, "wb") as file_out:
            self.args.storage_client.download_blob_to_file(blob, file_out)
        return file_path
