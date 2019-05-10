<template>
  <div id="section" v-if="!notFound">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title name">{{ section.name }}</h2>
        <div class="card-text description">{{ section.description }}</div>
      </div>
    </div>
  </div>
  <Error :code="404" :description="notFound" v-else />
</template>

<script>
  import $ from 'jquery'
  import Error from '../components/Error'
  export default {
    name: 'section',
    data () {
      return {
        section: {},
        notFound: false
      }
    },
    components: { Error },
    methods: {
      getSection () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            method: 'sectionInfo',
            address: that.$route.params.address
          },
          success (data) {
            if (data.success)
              that.section = data.success
            else
              that.notFound = data.error.data
          }
        })
      },
      loadPage () {
        this.getSection()
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
