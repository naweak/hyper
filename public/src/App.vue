<template>
  <div id="app">
    <Status />
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Гиперпараша</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="item in menu">
              <router-link class="nav-link" :to="item.link" v-html="item.text"></router-link>
            </li>
          </ul>
          <div class="navbar-nav my-2 my-lg-0">
            <div class="nav-item">
              <a href="/dev" class="nav-link">Разработчикам</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="container mt-2" role="main">
      <div class="row">
        <div class="col-md-12" id="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import Status from './components/Status'
  export default {
    name: 'app',
    data () {
      return {}
    },
    computed: {
      menu () {
        let menu = [
          { link: { name: 'sectionList' }, text: 'Разделы' },
          { link: { name: 'pvd' }, text: 'Песков взрывает дома' }
        ]
        if (!this.$root.userInfo) {
          menu = menu.concat([
            { link: { name: 'register' }, text: 'Рега' },
            { link: { name: 'login' }, text: 'Логин' }
          ])
        }
        else {
          menu = menu.concat([
            { link: { name: 'createSection' }, text: 'Создать раздел' },
            { link: { name: 'logout' }, text: 'Выход' }
          ])
        }
        return menu
      }
    },
    components: {
      Status
    }
  }
</script>

<style>
  .container-fluid {
    padding: 60px 15px 0;
  }
  .clickable {
    cursor: pointer;
  }
  .emoji, .text > p > .emoji {
    max-width: 32px !important;
    margin: 3px;
  }
</style>
