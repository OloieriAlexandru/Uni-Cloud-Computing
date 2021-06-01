
set GOOGLE_APPLICATION_CREDENTIALS=D:\github\Uni-Cloud-Computing\gcloud-key.json
setx GOOGLE_APPLICATION_CREDENTIALS D:\github\Uni-Cloud-Computing\gcloud-key.json

gcloud config set project pump-it-up-314917
gcloud auth activate-service-account --key-file=gcloud-key.json
