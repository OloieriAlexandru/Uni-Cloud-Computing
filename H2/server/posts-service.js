class PostsService {
    constructor(postsRepository, commentsRepository) {
        this.repository = postsRepository;
        this.commentsRepository = commentsRepository;
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async getById(id) {
        let post = await this.repository.getById(id);
        let postComments = await this.commentsRepository.getAllOnPost(id);
        post.comments = postComments;
        return post;
    }

    async create(newPost) {
        return await this.repository.create(newPost);
    }

    async update(updatedPost) {
        await this.repository.update(updatedPost);
    }

    async delete(id) {
        await this.repository.delete(id);
    }

    async getAllComments(postId) {
        return await this.commentsRepository.getAllOnPost(postId);
    }

    async getCommentById(postId, commentId) {
        return await this.commentsRepository.getByIdOnPost(postId, commentId);
    }

    async createComment(createdComment) {
        return await this.commentsRepository.create(createdComment);
    }

    async updateComment(postId, updatedComment) {
        await this.commentsRepository.updateOnPost(postId, updatedComment);
    }

    async deleteComment(postId, commentId) {
        await this.commentsRepository.deleteOnPost(postId, commentId);
    }
}

module.exports = PostsService;
