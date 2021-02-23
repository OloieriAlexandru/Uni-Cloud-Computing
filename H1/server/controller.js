const https = require('follow-redirects').https;
const requestLib = require('request').defaults({
    encoding: null
});
const config = require('./config');

const URL_RANDOM_IMAGE = "https://api.thedogapi.com/v1/images/search";
const URL_RANDOM_FACT = "https://some-random-api.ml/facts/dog";
const URL_CREATE_FACT_IMAGE = "https://memegen.link/custom";
const URL_TRANSLATE = "https://translation.googleapis.com/language/translate/v2";
const NUMBER_OF_RETRIES = 10;

const ALLOWED_LANGUAGES = [
    'en', 'fr', 'es', 'ro'
];

class Route {
    constructor(method, path, handler) {
        this.method = method;
        this.path = path;
        this.handler = handler;
    }
}

function badRequest(message) {
    return {
        "custom": 1,
        "statusCode": 400,
        "statusMessage": "Bad Request",
        "message": message
    };
}

function internalServerError(message) {
    return {
        "custom": 1,
        "statusCode": 500,
        "statusMessage": "Internal Server Error",
        "message": message
    };
}

// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
// https://stackoverflow.com/questions/41470296/how-to-await-and-return-the-result-of-a-http-request-so-that-multiple-request
function makeRequest(url, options, body) {
    return new Promise((resolve, reject) => {
        let req = https.request(url, options, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
            res.on('error', (err) => {
                reject(err);
            });
        });
        req.on('error', err => {
            reject(err);
        });
        if (body != null) {
            req.write(body);
        }
        req.end();
    });
}

// https://stackoverflow.com/questions/17124053/node-js-get-image-from-web-and-encode-with-base64
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        requestLib.get(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            if (response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                resolve(data);
            }
        });
    });
}

function makeSuccessResponse(req, res, obj) {
    res.statusCode = 200;
    res.statusMessage = 'Ok';
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(obj));
}

async function getRandomImage() {
    let getRandomImageOptions = {
        headers: {
            'x-api-key': config.THE_DOG_API_API_KEY
        },
        method: 'GET'
    };

    let jsonResult = null;
    for (let retryIndex = 1; retryIndex <= NUMBER_OF_RETRIES; ++retryIndex) {
        try {
            let rawResult = await makeRequest(URL_RANDOM_IMAGE, getRandomImageOptions);
            jsonResult = JSON.parse(rawResult);
            break;
        } catch (ignored) {}
    }

    if (jsonResult == null || jsonResult.length == 0) {
        throw internalServerError("Failed to get random image!")
    }

    return jsonResult[0]['url'];
}

async function getRandomFact() {
    let getRandomFactOptions = {
        method: 'GET'
    };

    let jsonResult = null;
    for (let retryIndex = 1; retryIndex <= NUMBER_OF_RETRIES; ++retryIndex) {
        try {
            let rawResult = await makeRequest(URL_RANDOM_FACT, getRandomFactOptions);
            jsonResult = JSON.parse(rawResult);
        } catch (ignored) {}
    }

    if (jsonResult == null) {
        throw internalServerError("Failed to get random fact!")
    }

    return jsonResult['fact'];
}

async function translate(text, language) {
    let translationOptions = {
        method: 'POST'
    };
    let translationBody = {
        q: text,
        target: language,
        source: "en"
    };

    let response = null;
    try {
        response = JSON.parse(await makeRequest(`${URL_TRANSLATE}?key=${config.TRANSLATE_API_KEY}`,
            translationOptions, JSON.stringify(translationBody)));
    } catch (ignored) {}

    if (!response || !response['data'] || !response['data']['translations'] ||
        response['data']['translations'].length == 0 ||
        !response['data']['translations'][0]['translatedText']) {
        throw internalServerError("Failed to translate text!");
    }
    return response['data']['translations'][0]['translatedText'];
}

class RouteController {
    constructor(routes) {
        this.routes = routes;
    }

    async solve(req, res, body) {
        if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
        }
        for (let route of this.routes) {
            if (req.method && req.url && req.method === route.method && req.url === route.path) {
                return route.handler(req, res, body);
            }
        }
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        return res.end('Invalid route path!');
    }

    static async getRandomImage(req, res, body) {
        return makeSuccessResponse(req, res, {
            "url": await getRandomImage()
        });
    }

    static async getRandomFact(req, res, body) {
        if (!body || !body.hasOwnProperty('lang') || !ALLOWED_LANGUAGES.includes(body['lang'])) {
            throw badRequest("Expected the body of the request to have an attribute called \"lang\"");
        }

        let randomFact = await getRandomFact();
        if (body['lang'] != 'en') {
            randomFact = await translate(randomFact, body['lang']);
        }

        return makeSuccessResponse(req, res, {
            'fact': randomFact
        });
    }

    static async getFactImage(req, res, body) {
        let imageUrl = null;
        let imageCaption = null;

        if (body && body.hasOwnProperty('url') && body['url']) {
            imageUrl = body['url'];
        } else {
            imageUrl = await getRandomImage();
        }

        if (body && body.hasOwnProperty('fact') && body['fact']) {
            imageCaption = body['fact'];
        } else {
            imageCaption = await getRandomFact();
        }
        if (body && body.hasOwnProperty('lang') && ALLOWED_LANGUAGES.includes(body['lang']) && body['lang'] !== 'en') {
            imageCaption = await translate(imageCaption, body['lang']);
        }
        let originalImageCaption = imageCaption;
        imageCaption = encodeURI(imageCaption);

        let factImageUrl = `${URL_CREATE_FACT_IMAGE}/${imageCaption}.jpg?alt=${imageUrl}`;
        let imageBase64Content = await downloadImage(factImageUrl);

        return makeSuccessResponse(req, res, {
            'image': imageBase64Content,
            'randomImage': imageUrl,
            'fact': originalImageCaption
        });
    }
}

module.exports = {
    Route,
    RouteController
};
