<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
          <span v-else>
            <McvAddToFollowers
              :isFollowed="false"
              :userName="article.author.username">
            </McvAddToFollowers>
            &nbsp;
            <McvAddToFavorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            ></McvAddToFavorites>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="isLoading" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tags="article.tagList" />
        </div>
      </div>
    </div>
    <hr>
    <div class="container" v-if="article">
      <div class="article-actions">
        <div class="article-meta">
           <router-link
              :to="{name: 'userProfile', params: {slug: article.author.username}}"
            >
              <img :src="article.author.image" />
            </router-link>
            <div class="info">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: {slug: article.author.username}
                }"
              >
                {{ article.author.username }}
              </router-link>
              <span class="date">{{ article.createdAt }}</span>
            </div>
          <span v-if="isAuthor">
              <router-link
                class="btn btn-outline-secondary btn-sm"
                :to="{name: 'editArticle', params: {slug: article.slug}}"
              >
                <i class="ion-edit" />
                Edit Article
              </router-link>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteArticle"
              >
                <i class="ion-trash-a" />
                Delete Article
              </button>
            </span>
            <span v-else>
              <McvAddToFollowers
                :isFollowed="false"
                :userName="article.author.username">
                &nbsp;
              </McvAddToFollowers>
              &nbsp;
              <McvAddToFavorites
                :is-favorited="article.favorited"
                :article-slug="article.slug"
                :favorites-count="article.favoritesCount"
              ></McvAddToFavorites>
            </span>
        </div>
      </div>
      <div class="row" v-if="comments">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form  @submit.prevent="onSubmit"
            class="card comment-form ng-pristine ng-valid">
            <div class="card-block">
              <textarea
                class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="Write a comment..." rows="3"
                v-model="body"
              >
              </textarea>
            </div>
            <div class="card-footer">
              <img :src="currentUser.image" class="comment-author-img">
              <button class="btn btn-sm btn-primary" type="submit"
                :disabled = "disabled">
               Post Comment
              </button>
            </div>
          </form>
          <div class="card" v-for="comment in isComments"
          :key="comment.id">
            <div class="card-block">
              <p class="card-text ng-binding">
                {{comment.body}}
              </p>
            </div>
            <div class="card-footer">
              <router-link :to="{name: 'userProfile', params: {slug: comment.author.username}}" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img">
              </router-link>
              &nbsp;
              <router-link :to="{name: 'userProfile', params: {slug: comment.author.username}}" class="comment-author ng-binding">
                {{comment.author.username}}
              </router-link>
              <span class="date-posted ng-binding">{{comment.createdAt}}</span>
              <span @click="deleteComment(comment.id)" class="mod-options">
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {actionTypes as commentsActionTypes} from '@/store/modules/comments'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvAddToFollowers from '@/components/AddToFollowers'
import McvAddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'McvArticle',
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFollowers,
    McvAddToFavorites
  },
  data() {
    return {
      body: "",
      disabled: false
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      article: state => state.article.data,
      error: state => state.article.error,
      isLoadingComments: state => state.comments.isLoading,
      comments: state => state.comments.comments,
      errorComments: state => state.comments.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isComments() {
      if (this.comments) {
        return this.comments.slice(0).reverse()
      }
      return null
    },
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }

      return this.currentUser.username === this.article.author.username
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug
    });
    this.$store.dispatch(commentsActionTypes.getComments, {
      slug: this.$route.params.slug
    }).then((com) =>{console.log(com)})
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    },
    deleteComment(id) {
      this.$store
        .dispatch(commentsActionTypes.deleteComment, {
          slug: this.$route.params.slug,
          id
        }).then(() =>{
          this.$store.dispatch(commentsActionTypes.getComments, {
          slug: this.$route.params.slug
          })
        })
    },
    onSubmit() {
      if (this.body !== "") {
        this.disabled = true
        const form = {
        body: this.body
      }
      this.$store
        .dispatch(commentsActionTypes.createComment, {
          slug: this.$route.params.slug,
          form}).then(() =>{
            this.body = "";
          this.$store.dispatch(commentsActionTypes.getComments, {
          slug: this.$route.params.slug
          })
          this.disabled = false
        })
      }

    }
  }
}
</script>
