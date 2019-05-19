<script>
export default {
  name: 'home',
  created () {
    this.$router.push({ name: 'posts' })
  }
}
</script>
