<script>
export default {
  name: 'home',
  created () {
    this.$router.push({ name: 'section', params: { address: this.$root.config.defaultSection } })
  }
}
</script>
