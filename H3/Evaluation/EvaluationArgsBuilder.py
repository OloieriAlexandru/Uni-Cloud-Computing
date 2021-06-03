from EvaluationArgs import EvaluationArgs


class EvaluationArgsBuilder:
    
    def __init__(self):
        self.datastore_client = None
        self.storage_client = None
        self.file_utils = None
        self.evaluation_id = None
        self.evaluation_obj = None
        self.problem_obj = None
        self.helper = None

    def with_datastore_client(self, datastore_client):
        self.datastore_client = datastore_client
        return self

    def with_storage_client(self, storage_client):
        self.storage_client = storage_client
        return self

    def with_file_utils(self, file_utils):
        self.file_utils = file_utils
        return self

    def with_evaluation_id(self, evaluation_id):
        self.evaluation_id = evaluation_id
        return self

    def with_evaluation_obj(self, evaluation_obj):
        self.evaluation_obj = evaluation_obj
        return self

    def with_problem_obj(self, problem_obj):
        self.problem_obj = problem_obj
        return self

    def with_helper(self, helper):
        self.helper = helper
        return self

    def build(self):
        return EvaluationArgs(self.datastore_client, self.storage_client, self.file_utils,
                              self.evaluation_id, self.evaluation_obj, self.problem_obj, self.helper)
