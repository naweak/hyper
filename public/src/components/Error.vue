<template>
  <div class="error">
    <h2 class="code">{{ code || '403' }}</h2>
    <p class="description" v-html="description || 'Доступ закрыт'"></p>
  </div>
</template>

<script>
  export default {
    name: 'error',
    props: [ 'code', 'description' ]
  }
</script>

<style>
  .code {
    color: #cc3333;
  }
</style>
