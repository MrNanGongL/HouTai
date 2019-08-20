import Vue from 'vue'
import Router from 'vue-router'
import manager from '@/components/manager'
import food from '../components/food'
import NutritionLabel from '../components/NutritionLabel'
import add from '../components/add'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
//    name: 'manager',
      component: manager,
      children:[
      	{
      		path:'/',
//    		name:'food',
      		redirect:'/food'
      	},
      	{
      		path:'/food',
//    		name:'food',
      		component:food,
      	},
      	{
      		path:'/NutritionLabel',
//    		name:'NutritionLabel',
      		component:NutritionLabel,
      	},
      	{
      		path:'/add',
		   		name:'add',
      		component:add,
      	}
      ]
    }
  ]
})
