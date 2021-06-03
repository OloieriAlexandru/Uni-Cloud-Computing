import subprocess

from EvaluationBase import EvaluationBase
from EvaluationArgs import EvaluationArgs


class EvaluationC(EvaluationBase):

    def __init__(self, evaluation_args: EvaluationArgs) -> None:
        super(EvaluationC, self).__init__(evaluation_args)

    def init_evaluation_lang(self):
        self.source_code_executable_path = self.args.file_utils.get_work_directory_file_name(
            self.args.evaluation_id + '.exe')

    def compile_lang(self):
        command_parts = [
            'gcc',
            '-o',
            self.source_code_executable_path,
            self.source_code_path
        ]

        compilation_exit_code = subprocess.run(command_parts)

        if compilation_exit_code.returncode != 0:
            return False
        return True

    def execute_lang_init(self):
        self.command_parts = [
            '.' + self.args.file_utils.get_delimiter() + self.args.evaluation_id + '.exe'
        ]
