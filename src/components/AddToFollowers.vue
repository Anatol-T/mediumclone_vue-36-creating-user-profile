<template>
  <button
    @click="handleFollow"
    class="btn btn-sm action-btn ng-binding"
    :class="{ 'disabled': isFollowedOptimistic,
    'btn-outline-secondary': !isFollowedOptimistic,
    'btn-secondary': isFollowedOptimistic }"
    >
    <i class="ion-plus-round"></i>
    &nbsp;{{ followMassage }}
  </button>
</template>

<script>
import {actionTypes as followActionTypes} from '@/store/modules/addToFollowers'

export default {
  name: 'McvAddToFollowers',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFollowedOptimistic: this.isFollowed
    }
  },
  computed: {
    followMassage() {
      const massage = this.isFollowedOptimistic ? "Unfollow" : "Follow"
      return `${massage} ${this.userName}`
    }
  },
  methods: {
    handleFollow() {
      this.$store.dispatch(followActionTypes.addToFollowers, {
        slug: this.userName,
        isFollowed: this.isFollowedOptimistic
      });
      this.isFollowedOptimistic = !this.isFollowedOptimistic;
    },
  }
}
</script>