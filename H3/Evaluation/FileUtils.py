import os
import shutil

WORK_DIRECTORY_PREFIX = 'evaluations'


class FileUtils:

    def __init__(self, evaluation_id):
        self.evaluation_id = evaluation_id

    def get_work_directory_prefix(self):
        return WORK_DIRECTORY_PREFIX

    def get_delimiter(self):
        if os.name == 'nt':
            return '\\'
        else:
            return '/'

    def create_directory(self, directory_path):
        try:
            os.mkdir(directory_path)
            return True
        except Exception as e:
            return False

    def remove_directory(self, directory_path):
        if os.path.exists(directory_path):
            shutil.rmtree(directory_path)

    def get_work_directory(self):
        return '.' + self.get_delimiter() + self.get_work_directory_prefix() + \
            self.get_delimiter() + self.evaluation_id

    def get_work_directory_file_name(self, file_name):
        return self.get_work_directory() + self.get_delimiter() + file_name

    def create_working_directory(self):
        directory_path = self.get_work_directory()
        self.remove_directory(directory_path)
        return self.create_directory(directory_path)

    def compare_files(self, file_path_1, file_path_2):
        if not os.path.isfile(file_path_1) or not os.path.isfile(file_path_2):
            return False

        with open(file_path_1, "r") as file_1:
            with open(file_path_2, "r") as file_2:
                line_file_1 = file_1.readline()
                line_file_2 = file_2.readline()

                while line_file_1 and line_file_2:
                    line_file_1 = line_file_1.strip()
                    line_file_2 = line_file_2.strip()

                    if line_file_1 != line_file_2:
                        return False

                    line_file_1 = file_1.readline()
                    line_file_2 = file_2.readline()

                while line_file_1:
                    line_file_1 = line_file_1.strip()
                    if line_file_1 != '':
                        return False
                    line_file_1 = file_1.readline()

                while line_file_2:
                    line_file_2 = line_file_2.strip()
                    if line_file_2 != '':
                        return False
                    line_file_2 = file_2.readline()

                return True
