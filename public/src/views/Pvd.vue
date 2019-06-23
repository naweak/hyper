<template>
  <div id="pvd">
    <div class="row">
      <div id="mainContent" class="col-md-8">
        <h1>Песков взрывает дома</h1>
        <PvdDDoS :target="pvd.target"></PvdDDoS>
        <div id="chat" class="card">
          <div class="card-body">
            <h2>Говночат наху</h2>
            <form v-on:submit.prevent="createMessage" v-on:keyup.ctrl.enter="createMessage" v-if="$root.userInfo">
              <div class="form-group">
                <div class="input-group">
                  <textarea class="form-control" placeholder="вставить текст" id="text" v-model="text"></textarea>
                </div>
              </div>
              <div class="form-group">
                <div id="emoji">
                  <img class="emoji clickable" v-for="(emoji, name) in $root.config.emoji" :src="emoji" v-on:click="appendText(`:${name}:`)" :alt="`:${name}:`" :title="`:${name}:`">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="btn-group">
                    <button type="submit" class="btn btn-primary btn-sm">Аыыы</button>
                    <button type="button" class="btn btn-success btn-sm" v-on:click="enableAutoreload" v-if="!autoreloadEnabled">врубить автоапдейт</button>
                    <button type="button" class="btn btn-danger btn-sm" v-on:click="disableAutoreload" v-else>вырубить автоапдейт</button>
                  </div>
                </div>
              </div>
            </form>
            <div v-else>
              <router-link :to="{ name: 'login' }">войдите</router-link> чотбы срать в чятик
            </div>
            <div id="messages">
              <div id="pagination">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: page == 0 }">
                    <router-link class="page-link" :to="{ params: { page: page - 1 } }">Назад</router-link>
                  </li>
                  <li class="page-item" :class="{ disabled: page == pvd.chat.totalPagesCount }">
                    <router-link class="page-link" :to="{ params: { page: page + 1 } }">Вперед</router-link>
                  </li>
                </ul>
              </div>
              <PvdChatMessage v-for="message in pvd.chat.messages" :message="message"></PvdChatMessage>
            </div>
          </div>
        </div>
      </div>
      <div id="peskov" class="col-md-4">
        <img v-on:click="newPeskov()" :src="peskov" class="img-fluid img-thumbnail" :alt="peskov">
      </div>
    </div>
  </div>
</template>

<script>
  import PvdDDoS from '../components/PvdDDoS'
  import PvdChatMessage from '../components/PvdChatMessage'
  import $ from 'jquery'
  import lib from '../lib'
  export default {
    name: "Pvd",
    data () {
      return {
        pvd: {},
        autoreloadEnabled: false,
        peskov: this.randomPeskov(),
        text: ''
      }
    },
    props: {
      page: {
        default: 0
      }
    },
    methods: {
      loadPvd () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api + 'pvd',
          data: {
            page: that.$route.params.page
          },
          success (data) {
            if (data.success) {
              that.pvd = data.success
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      },
      enableAutoreload () {
        this.autoreloadEnabled = true
        this.autoreload = setInterval(() => this.loadPvd(), 1500)
      },
      disableAutoreload () {
        this.autoreloadEnabled = false
        clearInterval(this.autoreload)
      },
      createMessage () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api + '/pvd/chat/createMessage',
          method: 'post',
          data: {
            text: that.text,
            token: that.$cookies.get('token')
          },
          success (data) {
            if (data.success) {
              that.loadPvd()
              that.text = ''
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      },
      randomPeskov () {
        return lib.choice(this.$root.config.peskov)
      },
      newPeskov () {
        this.peskov = this.randomPeskov()
      },
      appendText (text) {
        this.text = this.text + text
      }
    },
    created () {
      this.loadPvd()
      this.$title('ПВД')
    },
    components: { PvdDDoS, PvdChatMessage },
    watch: {
      page () {
        this.loadPvd()
      }
    }
  }
</script>

<style scoped>
  #chat {
    margin: 10px;
  }
  #pagination {
    margin-top: 10px;
  }
</style>
