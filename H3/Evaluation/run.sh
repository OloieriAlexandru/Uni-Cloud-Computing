#!/bin/bash

cp ~/gcloud-key.json ~/Uni-Cloud-Computing/H3/Evaluation/gcloud-key.json

export GOOGLE_APPLICATION_CREDENTIALS="./gcloud-key.json"

python3 server.py

