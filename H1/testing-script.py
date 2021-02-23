import requests
import argparse
import time

URL_BASE = "http://localhost:4444"
URL_RANDOM_IMAGE = '{}/api/v1/random-image'.format(URL_BASE)
URL_RANDOM_FACT = '{}/api/v1/random-fact'.format(URL_BASE)
URL_RANDOM_FACT_IMAGE = '{}/api/v1/random-image-fact'.format(URL_BASE)

COMMON_HEADERS = {'Content-Type': "application/json", 'Accept': "application/json"}

def endpoint_call_random_image():
    return requests.get(URL_RANDOM_IMAGE, headers = COMMON_HEADERS)

def endpoint_call_random_fact():
    return requests.post(URL_RANDOM_FACT, headers = COMMON_HEADERS, data = { 'lang' : 'en' })

def endpoint_call_random_image_fact():
    return requests.post(URL_RANDOM_FACT_IMAGE, headers = COMMON_HEADERS, data = { })

def get_seconds_string(s):
    return '{:.4f} seconds'.format(s)

ENDPOINT_MAPPING = {
    "random-image" : endpoint_call_random_image,
    "random-fact": endpoint_call_random_fact,
    "random-image-fact": endpoint_call_random_image_fact
}

def get_cmd_commands():
    parser = argparse.ArgumentParser(description = "Send concurrent requests in batches to a web server")

    possible_endpoints = []
    for key in ENDPOINT_MAPPING:
        possible_endpoints.append(key)

    parser.add_argument('--batches', '-b', type=int, default=10)
    parser.add_argument('--batch-size', '-bs', type=int, default=50)
    parser.add_argument('--endpoint', '-e', type=str, default="random-image-fact", choices=possible_endpoints)

    return parser

def test_endpoint(args):
    for batch_idx in range(1, args.batches + 1):
        print('-----------------')
        print("Batch {}".format(batch_idx))
        batch_start_time = time.perf_counter()

        batch_end_time = time.perf_counter()
        print('Total execution time: {}'.format(get_seconds_string(batch_end_time - batch_start_time)))

if __name__ == '__main__':
    args = get_cmd_commands().parse_args()
    test_endpoint(args)
