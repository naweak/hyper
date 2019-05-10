<script>
  export default {
    name: 'logout',
    created () {
      this.$cookies.remove('token')
      this.$root.updateUserInfo()
      this.$router.push('/')
    }
  }
</script>
