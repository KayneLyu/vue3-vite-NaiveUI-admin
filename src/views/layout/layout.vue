<template>
  <n-space vertical>
    <n-layout position="absolute">
      <n-layout-header :inverted="inverted" bordered style="height: 6%">
        <div class="logoArea">
          <img src="../../assets/logo.png"  class="logo" />
          <!-- <span>管理系统</span> -->
        </div>
        <div class="logOut" @click="loginOut">退出</div>
      </n-layout-header>
      <n-layout style="height: 94%" has-sider>
        <!-- 导航菜单 -->
        <Sider />

        <!-- 内容 -->
        <n-layout :native-scrollbar="false">
          <div class="mainContent">
            <!-- 页面内容 -->
            <!-- <n-card :title="cardTitle" :bordered="false"> -->
            <n-spin :show="show">
              <router-view></router-view>
            </n-spin>
            <!-- </n-card> -->
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts" >
import { h, defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useLoadingBar, NSpin } from 'naive-ui';
import {useStore} from 'vuex'
import Sider from "./sider.vue";
import {
  NSpace,
  NLayout,
  NLayoutHeader,
  NCard
} from "naive-ui";

const inverted = ref(true);
const router = useRouter();
const route = useRoute();
// 登出
const loginOut = () => {
  // 清除storage
  router.push('/login')
}

onMounted(() => {
  window['$loading'] = useLoadingBar();
})
// 页面标题
const cardTitle: any = computed(() => route.meta.name);

const store = useStore()
const show = computed(() => store.state.isLoading);
</script>


<style scoped>
.test {
  height: 400px;
}

.container {
  height: 100%;
}
.logoArea {
  position: relative;
  float: left;
  max-width: 100px;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
}
.logo {
  width: 35px;
  height: 35px;
}

span {
  font-size: 20px;
  font-weight: 700;
}

.logOut {
  position: relative;
  float: right;
  max-width: 100px;
  right: 30px;
  top: 50%;
  font-size: 16px;
  cursor: pointer;
  transform: translateY(-50%);
}
.logOut:hover {
  color: rgb(46, 192, 54);
}

.mainContent {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.n-card {
  box-sizing: border-box;
  min-height: 850px;
  height: 100%;
  /* box-shadow: 0 0 10px rgb(117, 117, 117); */
}
:deep().n-layout--static-positioned {
  background-color: rgb(241, 241, 241);
}
</style>