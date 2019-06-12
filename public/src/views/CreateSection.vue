<template>
  <div id="createSection" v-if="$root.userInfo">
    <h2>Создать раздел</h2>
    <form v-on:submit.prevent="createSection()">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Адрес</div>
          </div>
          <input type="text" class="address form-control" v-model="address">
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Имя</div>
          </div>
          <input type="text" class="name form-control" v-model="name">
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Описание</div>
          </div>
          <textarea class="description form-control" v-model="description"></textarea>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Создать</button>
      </div>
    </form>
  </div>
  <Error v-else />
</template>

<script>
  import Error from '../components/Error'
  import $ from 'jquery'
  export default {
    name: 'create-section',
    data () {
      return {
        address: "",
        name: "",
        description: ""
      }
    },
    components: { Error },
    methods: {
      createSection () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api + '/section/create',
          type: 'post',
          data: {
            address: that.address,
            name: that.name,
            description: that.description,
            token: that.$cookies.get('token')
          },
          success (data) {
            if (data.success) {
              vm.$emit('success', 'Раздел создан')
              vm.$router.push('/section/' + data.success.address + '/')
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      }
    },
    created () {
      this.$title('Создать раздел')
    }
  }
</script>
