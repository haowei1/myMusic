import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/home"
import Search from "@/pages/search";
import Index from "@/components/Index";
import Player from "@/pages/player";
import qs from "qs"

Vue.use(Router)
Vue.use(qs)

export default new Router({
  routes: [
    {
      path: '/',
      name: "Index",
      component: Index,
      redirect: '/home',
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
          children: [
            {
              path: "search",
              name: "Search",
              component: Search
            }
          ]
        }
      ]
    },
    {
      path: "/player",
      name: "Player",
      component: Player
    }
  ]
})
