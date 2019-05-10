<template>
  <div class="home">
    <div v-if="$root.userInfo">
      Залогинен как {{ $root.userInfo.login }}
    </div>
    <div v-else>
      Не залогинен
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    this.$title('Гиперпараша')
  }
}
</script>
