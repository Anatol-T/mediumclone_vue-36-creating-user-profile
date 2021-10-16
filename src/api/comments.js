import axios from '@/api/axios'

const getComments = slug => {
  return axios.get(`/articles/${slug}/comments`).then(response => response.data.comments)
}

const createComment = (slug, commentInput) => {
  return axios
    .post(`/articles/${slug}/comments`, {comment: commentInput})
    .then(response => response.data.comment)
}

const deleteComment = (slug, id) => {
  return axios.delete(`/articles/${slug}/comments/${id}`)
}

export default {
  getComments,
  deleteComment,
  createComment
}