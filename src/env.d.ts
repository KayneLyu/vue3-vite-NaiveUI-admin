/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**  
 * 用户登录信息
*/
interface IUserInfo {
  userAccount: string,
  password: string
}
/**
 * window全局挂载变量,消息提示
 */
interface Window {
  $message: any,
  $loading:{
    start:Function,
    finish:Function,
    error:Function,
  }
}

/** 
 * 用户详情/菜单
*/
interface ILoginInfo {
  config: {},
  data: {
    code: number,
    msg: string,
    data: {
      resources: any[],
      userInfo: {
        roleName: string,
      },
      token: string
    }
  },
  status:number,
  statusText:string
}
/** 
 * 菜单详情
*/
interface IMenu {
  children:IMenu[] | [],
  nodeId:number,
  nodeName:string,
  otherData:{
    id:string,
    pageCode:string,
    resourceName:string,
    resourceOder:number,
    resourceUrl:string,
    resourceIcon:string
  },
  path:string,
  url:string
}

