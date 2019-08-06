import Vue from "vue";
import {
  ArticlesService,
  ArticleCommentsService,
  //FavoriteArticlesService,
  UpvoteArticlesService,
  DownvoteArticlesService,
  ArticleTagsService
} from "../common/articles.service";
import {
  FETCH_ARTICLE,
  FETCH_ARTICLE_COMMENTS,
  ARTICLE_COMMENT_CREATE,
  ARTICLE_COMMENT_DESTROY,
  // FAVORITE_ARTICLE_ADD,
  // FAVORITE_ARTICLE_REMOVE,
  UPVOTE_ARTICLE_ADD,
  UPVOTE_ARTICLE_REMOVE,
  DOWNVOTE_ARTICLE_ADD,
  DOWNVOTE_ARTICLE_REMOVE,
  ARTICLE_CREATE,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_EDIT_ADD_IMAGE,
  ARTICLE_EDIT_REMOVE_IMAGE,
  ARTICLE_EDIT_ADD_IMGFILELIST,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE,
  FETCH_ARTICLES,
  FETCH_ARTICLE_TAGS
} from "./actions.type";
import {
  RESET_ARTICLE_STATE,
  SET_ARTICLE,
  SET_ARTICLE_COMMENTS,
  ARTICLE_TAG_ADD,
  ARTICLE_TAG_REMOVE,
  ARTICLE_IMAGE_ADD,
  ARTICLE_IMAGE_REMOVE,
  ARTICLE_IMGFILELIST_ADD,
  UPDATE_ARTICLE_IN_LIST,
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_END,
  SET_ARTICLE_TAGS
} from "./mutations.type";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  articleComments: [],
  articleTags: [],
  articles: [],
  isLoadingArticles: true,
  articlesCount: 0,
  // Main image
  imageFileList: null,
  // Images in the article body which are uploaded through editor
  imgFileList: [],
  removeImage: ''
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_ARTICLE](context, articleSlug, prevArticle) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle);
    }
    const { data } = await ArticlesService.get(articleSlug);
    context.commit(SET_ARTICLE, data.article);
    return data;
  },
  async [FETCH_ARTICLE_COMMENTS](context, articleSlug) {
    const { data } = await ArticleCommentsService.get(articleSlug);
    //context.commit(SET_ARTICLE_COMMENTS, data.comments);
    context.commit(SET_ARTICLE_COMMENTS, data.articleComments);
    return data.comments;
  },
  async [ARTICLE_COMMENT_CREATE](context, payload) {
    //await ArticleCommentsService.post(payload.slug, payload.comment);
    await ArticleCommentsService.post(payload.slug, payload.articleComment);
    context.dispatch(FETCH_ARTICLE_COMMENTS, payload.slug);
  },
  async [ARTICLE_COMMENT_DESTROY](context, payload) {
    //await ArticleCommentsService.destroy(payload.slug, payload.commentId);
    await ArticleCommentsService.destroy(payload.slug, payload.articleCommentId);
    context.dispatch(FETCH_ARTICLE_COMMENTS, payload.slug);
  },
  // async [FAVORITE_ARTICLE_ADD](context, payload) {
  //   const { data } = await FavoriteArticlesService.add(payload);
  //   context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
  //   context.commit(SET_ARTICLE, data.article);
  // },
  // async [FAVORITE_ARTICLE_REMOVE](context, payload) {
  //   const { data } = await FavoriteArticlesService.remove(payload);
  //   // Update list as well. This allows us to favorite an article.
  //   context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
  //   context.commit(SET_ARTICLE, data.article);
  // },
  async [UPVOTE_ARTICLE_ADD](context, payload) {
    const { data } = await UpvoteArticlesService.add(payload);
    // Update list to upvote an article in list.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [UPVOTE_ARTICLE_REMOVE](context, payload) {
    const { data } = await UpvoteArticlesService.remove(payload);
    // Update list to remove the upvote of an article in list.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [DOWNVOTE_ARTICLE_ADD](context, payload) {
    const { data } = await DownvoteArticlesService.add(payload);
    // Update list to downvote an article in list.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [DOWNVOTE_ARTICLE_REMOVE](context, payload) {
    const { data } = await DownvoteArticlesService.remove(payload);
    // Update list to remove the downvote of an article in list.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  [ARTICLE_CREATE]({ state }) {
    let formData = new FormData();
    if (state.imageFileList && state.imageFileList.length > 0) {
      let file = state.imageFileList[0];
      formData.append('uploadFile', file, file.name);
    }

    formData.append('title', state.article.title);
    formData.append('body', state.article.body);
    if (state.article.description) {
      formData.append('description', state.article.description);
    }

    if (state.article.tagList.length > 0) {
      formData.append('tagList', JSON.stringify(state.article.tagList));
    }

    //return ArticlesService.create(state.article);
    return ArticlesService.create(formData);
  },
  [ARTICLE_DELETE](context, slug) {
    return ArticlesService.destroy(slug);
  },
  [ARTICLE_EDIT]({ state }) {
    let formData = new FormData();
    if (state.imageFileList && state.imageFileList.length > 0) {
      let file = state.imageFileList[0];
      formData.append('uploadFile', file, file.name);
    }

    formData.append('title', state.article.title);
    formData.append('body', state.article.body);
    if (state.article.description) {
      formData.append('description', state.article.description);
    }

    if (state.article.tagList.length > 0) {
      formData.append('tagList', JSON.stringify(state.article.tagList));
    }

    if (state.removeImage) {
      formData.append('removeImage', state.removeImage);
    }

    if (state.imgFileList.length > 0) {
      formData.append('imgFileList', JSON.stringify(state.imgFileList));
    }
    //return ArticlesService.update(state.article.slug, state.article);
    return ArticlesService.update(state.article.slug, formData);
  },
  [ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(ARTICLE_TAG_ADD, tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(ARTICLE_TAG_REMOVE, tag);
  },
  [ARTICLE_EDIT_ADD_IMAGE](context, fileList) {
    context.commit(ARTICLE_IMAGE_ADD, fileList);
  },
  [ARTICLE_EDIT_REMOVE_IMAGE](context, removeImage) {
    context.commit(ARTICLE_IMAGE_REMOVE, removeImage);
  },
  [ARTICLE_EDIT_ADD_IMGFILELIST](context, fileList) {
    context.commit(ARTICLE_IMGFILELIST_ADD, fileList);
  },
  [ARTICLE_RESET_STATE]({ commit }) {
    commit(RESET_ARTICLE_STATE);
  },
  [FETCH_ARTICLES]({ commit }, params) {
    commit(FETCH_ARTICLES_START);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_ARTICLES_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_ARTICLE_TAGS]({ commit }) {
    return ArticleTagsService.get()
      .then(({ data }) => {
        commit(SET_ARTICLE_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  // [SET_ARTICLE_COMMENTS](state, comments) {
  //   state.articleComments = comments;
  // },
  [SET_ARTICLE_COMMENTS](state, articleComments) {
    state.articleComments = articleComments;
  },
  [ARTICLE_TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [ARTICLE_TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag);
  },
  [ARTICLE_IMAGE_ADD](state, fileList) {
    state.imageFileList = fileList;
  },
  [ARTICLE_IMAGE_REMOVE](state, removeImage) {
    state.removeImage = removeImage;
  },
  [ARTICLE_IMGFILELIST_ADD](state, imgFileList) {
    state.imgFileList = imgFileList;
  },
  [RESET_ARTICLE_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  },
  [FETCH_ARTICLES_START](state) {
    state.isLoadingArticles = true;
  },
  [FETCH_ARTICLES_END](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoadingArticles = false;
  },
  [SET_ARTICLE_TAGS](state, tags) {
    state.articleTags = tags;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      article.upvoted = data.upvoted;
      article.upvotesCount = data.upvotesCount;
      article.downvoted = data.downvoted;
      article.downvotesCount = data.downvotesCount;
      return article;
    });
  }
};

const getters = {
  article(state) {
    return state.article;
  },
  articleComments(state) {
    return state.articleComments;
  },
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoadingArticles(state) {
    return state.isLoadingArticles;
  },
  articleTags(state) {
    return state.articleTags;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
