<template>
  <div id="comments" v-if='!hasError'>
    <Post :showSection="true" :showChilds="true" :post="post" />
  </div>
  <Error v-else :code="hasError.code" :description="hasError.description" />
</template>

<script>
  import Post from '../components/Post'
  import $ from 'jquery'
  import Error from '../components/Error'
  export default {
    name: 'comments',
    data () {
      return {
        post: {},
        hasError: false
      }
    },
    methods: {
      getPostInfo (postId) {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api,
          async: false,
          data: {
            method: 'postInfo',
            id: that.$route.params.id,
            showChilds: true
          },
          success (data) {
            if (data.success) {
              that.post = data.success
              that.$title('Пост #' + data.success.id)
              if (postId) {
                that.$nextTick(() => {
                  location.hash = 'post-' + postId
                })
              }
            }
            else {
              let code
              if (data.error.code == 132 || data.error.code == 133)
                code = 404
              else
                code = 403
              that.hasError = {
                code,
                description: data.error.data
              }
              that.$title(data.error.data)
            }
          }
        })
      },
      loadPage () {
        this.getPostInfo()
      }
    },
    created () {
      this.loadPage()
      this.$root.$on('scroll-to-post', (id) => {
        this.getPostInfo(id)
      })
    },
    watch: {
      $route() {
        this.loadPage()
      }
    },
    components: { Post, Error }
  }
</script>
