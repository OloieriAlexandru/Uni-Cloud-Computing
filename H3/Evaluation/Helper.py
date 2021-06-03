
class Helper:
    
    def process_files(self, files):
        return sorted(str(blob.name) for blob in files)
