import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

/*
vue3中不再提供vue构造函数，而是提供一个createApp函数，
并且返回一个vue应用实例(去除了vue2中实例提供的一些方法)，
不再是vue组件实例
*/
createApp(App).mount('#app')
