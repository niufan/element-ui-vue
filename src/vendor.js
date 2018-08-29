import axios from 'axios'
import qs from 'qs'
import * as Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapActions } from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import ElementEN from 'element-ui/lib/locale/lang/en'
import ElementZH_CN from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(ElementUI);

export {axios, qs, Cookies, NProgress, Vue, Vuex, mapState, mapActions, VueI18n, VueRouter, ElementUI, ElementLocale, ElementEN, ElementZH_CN};