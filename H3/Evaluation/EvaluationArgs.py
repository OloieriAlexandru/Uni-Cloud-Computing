
class EvaluationArgs:

    def __init__(self, datastore_client, storage_client, file_utils, evaluation_id, evaluation_obj, problem_obj, helper):
        self.datastore_client = datastore_client
        self.storage_client = storage_client

        self.evaluation_id = evaluation_id

        self.evaluation_obj = evaluation_obj
        self.problem_obj = problem_obj

        self.file_utils = file_utils
        self.helper = helper
