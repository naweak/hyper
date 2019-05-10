<template>
  <div id="login" v-if="!$root.userInfo">
    <h2>Логин</h2>
    <form v-on:submit.prevent="doLogin()">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Логин</span>
          </div>
          <input type="text" v-model="login" class="form-control login">
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Пароль</span>
          </div>
          <input type="password" v-model="password" class="form-control password">
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Залогиниться</button>
      </div>
    </form>
  </div>
  <Error v-else />
</template>

<script>
  import $ from 'jquery'
  import Error from '../components/Error'
  export default {
    name: 'login',
    data () {
      return {
        login: "",
        password: ""
      }
    },
    components: { Error },
    methods: {
      doLogin () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: 'post',
          data: {
            method: 'getToken',
            login: that.login,
            password: that.password
          },
          success (data) {
            if (data.success) {
              vm.$cookies.set('token', data.success.code, new Date(data.success.expires * 1000))
              vm.updateUserInfo()
              vm.$router.push('/')
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      }
    },
    created () {
      this.$title('Логин')
    }
  }
</script>
