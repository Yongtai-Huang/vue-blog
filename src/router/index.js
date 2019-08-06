import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("../views/ArticleNavs"),
      children: [
        {
          path: "",
          name: "articles",
          component: () => import("../views/Articles")
        },
        {
          path: "articles-follow",
          name: "articles-follow",
          component: () => import("../views/ArticlesFollow")
        },
        {
          path: "article-tag/:tag",
          name: "articles-by-tag",
          component: () => import("../views/ArticlesByTag")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("../views/Login")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("../views/Register")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("../views/Settings")
    },
    {
      path: "/@:username",
      component: () => import("../views/Profile"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("../views/ProfileArticles")
        },
        {
          name: "upvoted-articles",
          path: "upvoted-articles",
          component: () => import("../views/UpvotedArticles")
        },
        {
          name: "downvoted-articles",
          path: "downvoted-articles",
          component: () => import("../views/DownvotedArticles")
        }
      ]
    },
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("../views/Article"),
      props: true
    },
    {
      name: "article-edit",
      path: "/article-editor/:slug?",
      props: true,
      component: () => import("../views/ArticleEdit")
    }
  ]
});
