<template>
  <div class="card chatMessage" :id="'message-' + message.id">
    <div class="card-body">
      <div class="text" v-html="parser(message.text)"></div>
      <div class="autograph">{{ message.author }}, {{ date(message.createDate * 1000) }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PvdChatMessage",
    props: ['message']
  }
</script>

<style scoped>
  .chatMessage {
    margin: 10px;
  }
  .autograph {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>

<style>
</style>
