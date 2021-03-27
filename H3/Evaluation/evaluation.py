from google.cloud import datastore

EVALUATION_KIND = 'Evaluation'

def evaluate(evaluation_id):
    client = datastore.Client()
    evaluation_obj_key = client.key(EVALUATION_KIND, int(evaluation_id))
    evaluation_obj = client.get(evaluation_obj_key)
    if evaluation_obj is None:
        return ("Invalid evaluation_id in body! The evaluation doesn't exist!", 400)

    print(evaluation_obj)
    return ("The evaluation was completed successfully!", 200)
