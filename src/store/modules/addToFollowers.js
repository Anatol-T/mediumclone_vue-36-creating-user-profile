import addToFollowersApi from '@/api/addToFollowers'

export const actionTypes = {
  addToFollowers: '[addToFollowers] Add to followers'
}

export const mutationTypes = {
  addToFollowersStart: '[addToFavorites] Add to favorites start',
  addToFollowersSuccess: '[addToFollowers] Add to followers success',
  addToFollowersFailure: '[addToFollowers] Add to followers failure'
}

const mutations = {
  [mutationTypes.addToFollowersStart]() {},
  [mutationTypes.addToFollowersSuccess]() {},
  [mutationTypes.addToFollowersFailure]() {}
}

const actions = {
  [actionTypes.addToFollowers](context, {slug, isFollowed}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFollowersStart)
      const promise = isFollowed
        ? addToFollowersApi.removeFromFollowers(slug)
        : addToFollowersApi.addToFollowers(slug)
      promise
        .then(profile => {
          context.commit(mutationTypes.addToFollowersSuccess, profile)
          resolve(profile)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFollowersFailure())
        })
    })
  }
}

export default {
  actions,
  mutations
}