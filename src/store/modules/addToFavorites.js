import addToFavoritesApi from '@/api/addToFavorites'
import {mutationTypes as articleMutationTypes} from '@/store/modules/article'

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to favorites'
}

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure'
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {}
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)
      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          context.commit(articleMutationTypes.updateArticleSuccess, article.favoritesCount)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure())
        })
    })
  }
}

export default {
  actions,
  mutations
}
