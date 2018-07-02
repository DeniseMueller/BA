import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use( VueRouter )

/**
 * VUE Router configuration module.
 * 
 * @changes 2018-01-04 / denisemueller / Created
 * 
 * @author denisemueller
 * @version 1.0.0
 * 
 */
export default new VueRouter({
    routes: [    	
        {
            path: '/settings',
            name: 'Settings',
            component: require('components/settings.vue').default
        },
        {
            path: '/raceMode',
            name: 'Race Mode',
            component: require('components/raceMode.vue').default
        }
    ]
});