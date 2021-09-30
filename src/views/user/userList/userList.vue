<template>
  <div>
    <n-card title="用户列表" :bordered="false">
      hhhhh
      <n-button type="primary" @click="startLoading">加载条 开始</n-button>
      <n-button type="primary" @click="endLoading">加载条 结束</n-button>
      <div>
        <n-button type="primary" @click="changeLoading">加载</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NButton,useLoadingBar } from 'naive-ui';
import {useStore} from 'vuex'
const loadingBar = useLoadingBar()
const store =useStore()
const startLoading = () => {
  loadingBar.start()
}
const endLoading = () => {
  loadingBar.finish()
}
const changeLoading =() => {
  store.commit('changeLoading');
}

</script>

<style>
</style>