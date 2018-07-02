/**
 * Bootstrapping file. Initializes vue.js system
 * 
 * @changes 2018-03-16 / denisemueller / Created
 * 
 * @author denisemueller
 * @version 1.0.0
 * 
 */
import 'animate.css/animate.min.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss';
import 'vue-directive-tooltip/css/index.css';
import 'css/base.scss';

import '@fortawesome/fontawesome';
import 'jquery.scrollbar';
import 'jquery-scroll-lock';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';
import 'template/coreui/js/app.js';

// Some initialization and object used on view
import router from 'controller/routes.js';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';
import numeral from 'numeral';

import Vue from 'vue';
import VueBootstrap from 'bootstrap-vue'
import VueAxios from 'vue-axios';
//import VueDatatable from 'vue2-datatable-component';
import VueEvents from 'vue-events';
import VueFilters from 'vue2-filters';
import VueInject from 'vue-inject';
import VueJsonTreeView from "vue-json-tree-view";
import VueMoment from "vue-moment";
import VueSNotify from 'vue-snotify';
import VueTooltip from 'vue-directive-tooltip';
import Main from 'components/main.vue';

// Register injections
import BackendConnection from 'controller/backendConnection.js';
VueInject.constant('BackendConnection', BackendConnection);

// Initial vue js 
Vue.use(VueAxios, axios);
Vue.use(VueBootstrap);
//Vue.use(VueDatatable);
Vue.use(VueEvents);
Vue.use(VueFilters);
Vue.use(VueJsonTreeView);
Vue.use(VueInject);
Vue.use(VueMoment, {moment});
Vue.use(VueSNotify, {toast: {titleMaxLength: 50, bodyMaxLength: 300}});
Vue.use(VueTooltip);

// Initial some special filter
Vue.filter("numberFormat", function (value, format) {
	return numeral(value).format(format);
});

// Create new vue root
var vm = new Vue(Vue.util.extend({router}, Main));
window.vm = vm;
vm.$mount('#app');