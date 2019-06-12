<template>
  <div id="posts">
    <div id="list">
      <Post v-for="post in posts" :post="post" :showSection="true"></Post>
    </div>
    <ul class="pagination">
      <li class="page-item" v-if="$route.params.page">
        <router-link :to="{ params: { page: (Number($route.params.page)||0)-1 } }" class="page-link">
          <span>Назад</span>
        </router-link>
      </li>
      <li class="page-item" v-if="$route.params.page != pages">
        <router-link :to="{ params: { page: (Number($route.params.page)||0)+1 } }" class="page-link">
          <span>Вперед</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Post from '../components/Post'
  export default {
    name: 'posts',
    data () {
      return {
        posts: [],
        pages: Number()
      }
    },
    components: { Post },
    methods: {
      getPosts () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            page: that.$route.params.page
          },
          success (data) {
            if (data.success) {
              that.posts = data.success.posts
              window.tmp = data.success
              that.pages = data.success.totalPages
              that.$title('Все посты')
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      },
      loadPage () {
        this.getPosts()
      }
    },
    created () {
      this.loadPage()
    },
    watch: {
      $route () {
        this.loadPage()
      }
    }
  }
</script>
