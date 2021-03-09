const OkResponse = require('../Olo.js').OkResponse;
const NoContentResponse = require('../Olo.js').NoContentResponse;
const NotFoundResponse = require('../Olo.js').NotFoundResponse;
const BadRequestResponse = require('../Olo.js').BadRequestResponse;

const PropertyValidator = require('../Olo.js').PropertyValidator;
const Validator = require('../Olo.js').Validator;

class PostsController {
    constructor(postsService, userRepository) {
        this.service = postsService;
        this.userRepository = userRepository;
    }

    getAll = async (req, res) => {
        return new OkResponse(await this.service.getAll());
    }

    getById = async (req, res) => {
        let post = await this.service.getById(req.olo.urlVars['id']);

        if (post == null) {
            return new NotFoundResponse({
                'message': `A post with id "${req.olo.urlVars['id']}" doesn't exist!`
            });
        }

        return new OkResponse(post);
    }

    create = async (req, res) => {
        let result = this.validatePost(req.olo.body, false);
        if (result != true) {
            return result;
        }

        let createdPost = {
            'title': req.olo.body['title'],
            'content': req.olo.body['content'],
            'userId': req.olo.userId
        };

        return new OkResponse(await this.service.create(createdPost));
    }

    update = async (req, res) => {
        let result = this.validatePost(req.olo.body, true);
        if (result != true) {
            return result;
        }

        let updatedPost = {
            '_id': req.olo.body['_id'],
            'title': req.olo.body['title'],
            'content': req.olo.body['content']
        };
        await this.service.update(updatedPost);

        return new NoContentResponse();
    }

    delete = async (req, res) => {
        await this.service.delete(req.olo.urlVars['id']);
        return new NoContentResponse();
    }

    getAllComments = async (req, res) => {
        return new OkResponse(await this.service.getAllComments(req.olo.urlVars['id']));
    }

    getCommentById = async (req, res) => {
        let comment = await this.service.getCommentById(req.olo.urlVars['id'], req.olo.urlVars['commentId']);

        if (comment == null) {
            return new NotFoundResponse({
                'message': `A comment with id "${req.olo.urlVars['commentId']}" doesn't exist!`
            });
        }

        return new OkResponse(comment);
    }

    createComment = async (req, res) => {
        let result = this.validateComment(req.olo.body, false, false);
        if (result != true) {
            return result;
        }

        let createdComment = {
            'content': req.olo.body['content'],
            'postId': req.olo.urlVars['id'],
            'userId': req.olo.userId
        };

        return new OkResponse(await this.service.createComment(createdComment));
    }

    updateComment = async (req, res) => {
        let result = this.validateComment(req.olo.body, true, true);
        if (result != true) {
            return result;
        }

        let user = await this.userRepository.getById(req.olo.body['userId']);
        if (!user) {
            return new BadRequestResponse({
                'message': `Invalid request body! Invalid property value for \"userId\"!`
            });
        }

        let updatedComment = {
            '_id': req.olo.body['_id'],
            'content': req.olo.body['content'],
            'userId': req.olo.body['userId']
        };
        await this.service.updateComment(req.olo.urlVars['id'], updatedComment);
        updatedComment._id = req.olo.body['_id'];

        return new OkResponse(updatedComment);
    }

    deleteComment = async (req, res) => {
        await this.service.deleteComment(req.olo.urlVars['id'], req.olo.urlVars['commentId']);
        return new NoContentResponse();
    }

    validatePost(body, idRequired) {
        let id = new PropertyValidator('_id').isOfType('string').isRequired(idRequired);
        let title = new PropertyValidator('title').isOfType('string');
        let content = new PropertyValidator('content').isOfType('string');
        return new Validator().addProperties([id, title, content]).validate(body);
    }

    validateComment(body, commentIdRequired, userIdRequired) {
        let id = new PropertyValidator('_id').isOfType('string').isRequired(commentIdRequired);
        let content = new PropertyValidator('content').isOfType('string');
        let userId = new PropertyValidator('userId').isOfType('string').isRequired(userIdRequired);
        return new Validator().addProperties([id, content, userId]).validate(body);
    }
}

module.exports = PostsController;
