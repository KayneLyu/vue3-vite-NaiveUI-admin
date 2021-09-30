<template>
  <div class="loginBackground">
    <div class="loginArea">
      <h2>系统登录</h2>

      <n-form :model="account" ref="formRef" :rules="rules" :show-label="false">
        <div class="account">
          <n-form-item path="userAccount" label="">
            <div class="icon">
              <n-icon size="20" color="#9EA4AA">
                <PersonOutline />
              </n-icon>
            </div>
            <n-input
              v-model:value="account.userAccount"
              @keydown.enter.prevent
              size="large"
              placeholder="用户名"
              style="text-align: left"
            >
            </n-input>
          </n-form-item>
        </div>

        <div class="password">
          <n-form-item path="password" label="">
            <div class="icon">
              <n-icon size="20" color="#9EA4AA">
                <LockClosedOutline />
              </n-icon>
            </div>
            <n-input
              v-model:value="account.password"
              type="password"
              show-password-on="click"
              @keydown.enter.prevent
              placeholder="密码"
              size="large"
              style="text-align: left"
            />
          </n-form-item>
        </div>
      </n-form>

      <div class="loginBtn">
        <n-button
          type="primary"
          style="width: 440px; height: 40px"
          @click="signIn"
          >登 录</n-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { PersonOutline, LockClosedOutline } from "@vicons/ionicons5";
import {
  NInput,
  NSpace,
  NButton,
  NForm,
  NFormItem,
  useMessage,
  NSpin,
  NIcon,
} from "naive-ui";
import { login } from "../../api";
// 全局挂载提示
window.$message = useMessage();
const store = useStore();
const router = useRouter();
console.log(store.state.count);

const account = ref({
  userAccount: "",
  password: "",
});
const formRef = ref();
// 校验规则
const rules = {
  userAccount: [
    {
      required: true,
      validator(rule: any, value: string) {
        if (!value) {
          return new Error("请输入账号");
        } else if (value.length < 5) {
          return new Error("账号长度最少5位");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      validator(rule: any, value: string) {
        if (!value) {
          return new Error("请输入密码");
        } else if (value.length < 6 || value.length > 16) {
          return new Error("密码长度为6~16位");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

// 登录
const signIn = () => {
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const data: IUserInfo = account.value;
      const result: ILoginInfo = await login(data);
      // store.commit("getSideBar", result);
      if (result.data.code === 0) {
        const menuInfo = result.data.data.resources[0];
        const userInfo = result.data.data.userInfo;
        const token = result.data.data.token;
        sessionStorage.menu = JSON.stringify(menuInfo);
        sessionStorage.userInfo = JSON.stringify(userInfo);
        sessionStorage.token = JSON.stringify(token);
        router.push("/");
        window.$message.success("欢迎登入管理系统");
      }
    } else {
      console.log(errors);
      window.$message.error("请检查你的输入");
    }
  });
};
</script>

<style>
.loginArea {
  position: relative;
  height: 260px;
  padding: 5px 30px;
  width: 500px;
  margin: auto;
  /* text-align: center; */
  top: 50%;
  transform: translateY(-70%);
  border-radius: 5px;
  box-shadow: 0 0 20px #333;
  background-color: #fff;
  box-sizing: border-box;
}

.loginBackground {
  width: 100%;
  height: 100%;
  background-color: rgb(131, 172, 211);
}
h2 {
  text-align: center;
}
.account,
.password {
  position: relative;
}
.icon {
  z-index: 999;
  position: absolute;
  float: left;
  left: 5px;
  top: 10px;
}
.n-input-wrapper {
  padding-left: 33px !important;
}
</style>