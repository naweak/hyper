<template>
  <div id="section" v-if="!notFound">
    <div>
      <h2 class="name">{{ section.name }}</h2>
    </div>
    <div class="createPost mt-2" v-if="$root.userInfo">
      <form v-on:submit.prevent="createPost()">
        <div class="form-group">
          <div class="input-group">
            <textarea v-on:keyup.ctrl.enter="createPost()" class="form-control text" v-model="text"></textarea>
          </div>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="noko" v-model="noko"> Noko
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Вставить текст</button>
        </div>
      </form>
    </div>
    <div id="posts" class="mb-3">
      <Post v-for="post in section.posts" :post="post" />
    </div>
    <ul class="pagination">
      <li class="page-item" v-if="$route.params.page">
        <router-link :to="{ params: { page: (Number($route.params.page)||0)-1 } }" class="page-link">
          <span>Назад</span>
        </router-link>
      </li>
      <li class="page-item" v-if="$route.params.page != section.totalPagesCount">
        <router-link :to="{ params: { page: (Number($route.params.page)||0)+1 } }" class="page-link">
          <span>Вперед</span>
        </router-link>
      </li>
    </ul>
  </div>
  <Error :code="404" :description="notFound" v-else />
</template>

<script>
  import $ from 'jquery'
  import Error from '../components/Error'
  import Post from '../components/Post'
  export default {
    name: 'section',
    data () {
      return {
        section: {},
        notFound: false,
        text: '',
        noko: true
      }
    },
    components: { Error, Post },
    methods: {
      getSection () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api + '/section',
          data: {
            address: that.$route.params.address
          },
          success (data) {
            if (data.success) {
              that.section = data.success
              that.$title(that.section.name)
            }
            else {
              that.notFound = data.error.data
              that.$title(that.notFound)
            }
          }
        })
      },
      loadPage () {
        this.getSection()
      },
      createPost() {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api + '/post/create',
          type: 'post',
          data: {
            token: that.$cookies.get('token'),
            text: that.text,
            section: that.$route.params.address
          },
          success (data) {
            if (data.success) {
              if (that.noko) {
                that.$router.push({ name: 'post', params: { id: data.success.id } })
              }
              else {
                that.text = ''
                that.getSection()
              }
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
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
