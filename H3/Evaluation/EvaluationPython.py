
from EvaluationBase import EvaluationBase
from EvaluationArgs import EvaluationArgs


class EvaluationPython(EvaluationBase):

    def __init__(self, evaluation_args: EvaluationArgs) -> None:
        super(EvaluationPython, self).__init__(evaluation_args)

    def init_evaluation_lang(self):
        self.python_run_file = self.source_code_path

    def compile_lang(self):
        return True

    def execute_lang_init(self,):
        self.command_parts = [
            '.' + self.args.file_utils.get_delimiter() + self.args.evaluation_id + '.py'
        ]
