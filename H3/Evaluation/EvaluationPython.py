import os
import stat

from EvaluationBase import EvaluationBase
from EvaluationArgs import EvaluationArgs


class EvaluationPython(EvaluationBase):

    def __init__(self, evaluation_args: EvaluationArgs) -> None:
        super(EvaluationPython, self).__init__(evaluation_args)

    def init_evaluation_lang(self):
        self.python_run_file = self.source_code_path

        st = os.stat(self.python_run_file)
        os.chmod(self.python_run_file, st.st_mode | stat.S_IEXEC)

    def compile_lang(self):
        return True

    def execute_lang_init(self):
        self.command_parts = [
            self.args.file_utils.get_python_command(),
            self.args.evaluation_id + '.py'
        ]
