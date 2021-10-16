import commentsApi from '@/api/comments'

const state = {
  comments: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getCommentsStart: '[comments] Get comments start',
  getCommentsSuccess: '[comments] Get comments success',
  getCommentsFailure: '[comments] Get acommentsfailure',

  createCommentStart: '[comments] Create comment start',
  createCommentSuccess: '[comments] Create comment success',
  createCommentFailure: '[comments] Create comment failure',

  deleteCommentStart: '[comments] Delete comment start',
  deleteCommentSuccess: '[comments] Delete comment success',
  deleteCommentFailure: '[comments] Delete comment failure'
}

export const actionTypes = {
  getComments: '[comments] Get comments',
  createComment: '[comments] Create comment',
  deleteComment: '[comments] Delete comment'
}

const mutations = {
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true
    //state.comments = null
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false
    state.comments = payload
  },
  [mutationTypes.getCommentsFailure](state) {
    state.isLoading = false
  },
  [mutationTypes.createCommentStart]() {},
  [mutationTypes.createCommentSuccess]() {},
  [mutationTypes.createCommentFailure]() {},

  [mutationTypes.deleteCommentStart]() {},
  [mutationTypes.deleteCommentSuccess]() {},
  [mutationTypes.deleteCommentFailure]() {}
}

const actions = {
  [actionTypes.getComments](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCommentsStart)
      commentsApi
        .getComments(slug)
        .then(commemts => {
          context.commit(mutationTypes.getCommentsSuccess, commemts)
          resolve(commemts)
        })
        .catch(() => {
          context.commit(mutationTypes.getCommentsFailure)
        })
    })
  },
  [actionTypes.createComment](context, {slug, form}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createCommentStart)
      console.log(slug, form)
      commentsApi
        .createComment(slug, form)
        .then(commemt => {
          context.commit(mutationTypes.createCommentSuccess)
          resolve(commemt)
        })
        .catch(() => {
          context.commit(mutationTypes.createCommentFailure)
        })
    })
  },
  [actionTypes.deleteComment](context, {slug, id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteCommentStart)
      commentsApi
        .deleteComment(slug, id)
        .then(() => {
          context.commit(mutationTypes.deleteCommentSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteCommentFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}