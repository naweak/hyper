<template>
  <div id="sectionList">
    <h2>Разделы</h2>
    <div class="list-group">
      <router-link class="list-group-item list-group-item-action" v-for="section in sections" :to="{ name: 'section', params: { address: section.address } }">{{ section.name }}</router-link>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'section-list',
    data () {
      return {
        sections: []
      }
    },
    methods: {
      getSections () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            method: 'sectionList'
          },
          success (data) {
            if (data.success)
              that.sections = data.success
            else
              vm.$emit('error', data.error.data)
          }
        })
      }
    },
    created () {
      this.getSections()
    }
  }
</script>
