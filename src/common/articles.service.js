import ApiService from './api.service';

export const ArticleTagsService = {
  get() {
    return ApiService.get("articleTags");
  }
};

export const ArticlesService = {
  query(type, params) {
    return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("articles", slug);
  },
  create(params) {
    return ApiService.post("articles", params );
  },
  update(slug, params) {
    return ApiService.update("articles", slug, params );
  },
  destroy(slug) {
    return ApiService.delete(`articles/${slug}`);
  },
  uploadImg(slug, params) {
    return ApiService.update("articles/imgs", slug, params );
  }
};

export const ArticleCommentsService = {
  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "ArticleCommentsService.get() article slug required to fetch comments"
      );
    }
    return ApiService.get("articles", `${slug}/articleComments`);
  },

  post(slug, payload) {
    return ApiService.post(`articles/${slug}/articleComments`, {
      articleComment: { body: payload }
    });
  },

  destroy(slug, articleCommentId) {
    return ApiService.delete(`articles/${slug}/articleComments/${articleCommentId}`);
  }
};

export const UpvoteArticlesService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/upvote`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/upvote`);
  }
};

export const DownvoteArticlesService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/downvote`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/downvote`);
  }
};