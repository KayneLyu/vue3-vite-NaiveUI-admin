<script setup lang="ts">
import { NMessageProvider, useMessage, NSpace, NLoadingBarProvider } from "naive-ui";
import { ref } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import login from "@/views/Login/login.vue";
const isloading = ref(true);
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style>
body,
html {
  height: 100%;
  overflow: scroll;
  overflow-y: hidden;
}

::-webkit-scrollbar {
  display: none;
}

#app {
  height: 100%;
}
</style>
