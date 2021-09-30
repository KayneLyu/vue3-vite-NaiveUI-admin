<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :native-scrollbar="false"
    :inverted="inverted"
  >
    <n-menu
      :inverted="inverted"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :native-scrollbar="false"
      @update:value="menuRouter"
      accordion
      :value="activeId"
    />
  </n-layout-sider>
</template>

<script setup lang="ts" >
import { h, ref, computed } from "vue";
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";
import { NIcon, NLayoutSider, NMenu } from "naive-ui";
// import router from '../../router/index';

// 引入图标
import {
  PodiumOutline,
  Analytics,
  HammerOutline,
  PeopleOutline
} from "@vicons/ionicons5";

interface IOption {
  label: string,
  key: number,
  icon?: any,
  path: string,
  children?: IOption[] | [],
  href?: string,
  fatherPath?: string,
}
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const store = useStore();
const route = useRoute();
const router = useRouter();


const menuInfo = sessionStorage.menu;
const menu = JSON.parse(menuInfo);

console.log(menu);
// 菜单图标 
const iconMap: any = {
  "数据统计": PodiumOutline,
  "付费统计": Analytics,
  "权限管理": HammerOutline,
  "用户统计": PeopleOutline,
}

// 菜单参数
const remakeMenuOption = <T>(oldMenu: T, fatherPath?: string): any[] => {
  if (!Array.isArray(oldMenu) || oldMenu.length < 1) {
    return [];
  }
  let newMenu: any[] = [];

  oldMenu.filter((item: IMenu) => {
    // const linkName = item.otherData.resourceUrl.replace(/\//g, '').trim()
    let option: IOption = {
      // label: item.children.length ? item.nodeName : () => h(RouterLink, { to: linkName }, item.nodeName),
      label: item.nodeName,
      key: item.nodeId,
      path: item.otherData.resourceUrl,
    };
    if (fatherPath) {
      option['fatherPath'] = fatherPath
    }
    if (item.otherData.resourceIcon) {
      option["icon"] = renderIcon(iconMap[item.nodeName])
    }
    if (item.children.length) {
      option["children"] = remakeMenuOption(item.children, item.url)
    } 
    newMenu.push(option);
  });
  return newMenu
};

const menuOptions = remakeMenuOption(menu.children)

// let chooseMenuItem = ref();
// 路由切换 菜单栏高亮
const activeId= computed(() => route.meta.id as string)
// chooseMenuItem.value = activeId;

// 切换菜单路由
const menuRouter = (e: any, item: any) => {
  const linkName = item.path.replace(/\//g, '').trim();
  console.log(linkName, item);
  router.push({ name: linkName })
};
// const menuOptions = [
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {name:'userList'},
//           target: '_blank',
//           rel: 'noopenner noreferrer'
//         },
//         '且听风吟'
//       ),
//     key: 'hear-the-wind-sing',
//     // icon: renderIcon(BookIcon)
//   },
//   {
//     label: '1973年的弹珠玩具',
//     key: 'pinball-1973',
//     // icon: renderIcon(BookIcon),
//     disabled: true,
//     children: [
//       {
//         label: '鼠',
//         key: 'rat'
//       }
//     ]
//   },
// ]

const inverted = ref(true);

</script>

<style scoped>
</style>