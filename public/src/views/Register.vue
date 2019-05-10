<template>
  <div id="register" v-if="!$root.userInfo">
    <h2>Рега</h2>
    <form v-on:submit.prevent="register()">
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
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Пароль</span>
          </div>
          <input type="password" v-model="passwordVerify" class="form-control passwordVerify">
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Зарегаться</button>
      </div>
    </form>
  </div>
  <Error v-else />
</template>

<script>
  import $ from 'jquery'
  import Error from '../components/Error'
  export default {
    name: 'register',
    data () {
      return {
        login: '',
        password: '',
        passwordVerify: ''
      }
    },
    components: { Error },
    methods: {
      register () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: 'post',
          data: {
            method: 'register',
            login: that.login,
            password: that.password,
            passwordVerify: that.passwordVerify
          },
          success (data) {
            if (data.success) {
              vm.$emit('success', 'Рега успешна')
              vm.$router.push('/login')
            }
            else
              vm.$emit('error', data.error.data)
          }
        })
      }
    },
    created () {
      this.$title('Рега')
    }
  }
</script>
