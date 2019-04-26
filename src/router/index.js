import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
	    {
	      path: '/',
	      name: 'Default',
	      component: Default
	    },
	    {
	      path: '/about',
	      name: 'About',
	      component: About
	    }
  	]
})
