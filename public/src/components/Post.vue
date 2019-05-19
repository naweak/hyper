<template>
  <div class="post" :id="'post-' + post.id">
    <div class="media-body">
      <h2 v-if="showSection"><router-link :to="{ name: 'section', params: { address: section.address } }">{{ section.name }}</router-link></h2>
      <div class="text" v-html="parser(post.text)"></div>
      <div class="autograph badge badge-secondary">
        {{ post.author }} написал {{ date(post.createDate * 1000) }},
        <router-link v-if="post.type == 'post'" :to="{ name: 'post', params: { id: post.id } }">#{{ post.id }}</router-link>
        <a v-if="post.type == 'comment'" :href="'#post-' + post.id">#{{ post.id }}</a>
        <span v-if="showChilds && $root.userInfo">, <a href="javascript:void(0);" v-on:click="toggleReply()">ответить</a></span>
      </div>
      <div class="reply mt-2" v-if="replyEnabled">
        <form v-on:submit.prevent="createReply()">
          <div class="form-group">
            <div class="input-group">
              <textarea v-on:keyup.ctrl.enter="createReply()" class="text form-control" v-model="replyText"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <button class="btn btn-primary" type="submit">Вставить текст</button>
            </div>
          </div>
        </form>
      </div>
      <div class="childs" v-if="showChilds">
        <post v-for="child in post.childs" :post="child" :showChilds='true' />
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'post',
    data () {
      return {
        section: {},
        replyEnabled: false,
        replyText: ""
      }
    },
    methods: {
      getSectionInfo () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            method: 'sectionInfo',
            address: that.post.section
          },
          success (data) {
            if (data.success) {
              that.section = data.success
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      },
      toggleReply () {
        this.replyEnabled = !this.replyEnabled
      },
      createReply () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: 'post',
          data: {
            method: 'createPost',
            text: that.replyText,
            parent: that.post.id,
            section: that.post.section,
            token: that.$cookies.get('token')
          },
          success (data) {
            if (data.success) {
              vm.$emit('scroll-to-post', data.success.id)
              that.replyText = ''
              that.replyEnabled = false
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      }
    },
    created () {
      this.getSectionInfo()
    },
    props: [ 'post', 'showSection', 'showChilds' ]
  }
</script>

<style>
  .post {
    padding: 10px;
    margin-bottom: 2px;
    padding-bottom: 2px;
  }
  .post:target {
    background: #efefff;
  }
  .badge > a, .badge > * > a {
    color: white;
  }
  .badge > a:hover, .badge > * > a:hover {
    color: whitesmoke;
  }
  .chain {
    color: whitesmoke;
    border-right: 1px #9f9f9f dotted;
    max-width: 1px !important;
    margin: 0;
    display: block;
    padding-left: 2px !important;
    padding-right: 2px !important;
  }
  .text > p > img {
    max-width: 700px !important;
  }
  .autograph {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .text {
    max-width: 100%;
    overflow: auto;
  }
</style>
