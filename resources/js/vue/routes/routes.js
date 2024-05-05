import Home from '../views/Home.vue'
import FourOhFour from '../views/FourOhFour.vue'

const routes = [
	{ path: '/', component: Home }, 
	{ path: '/:pathMatch(.*)*', component: FourOhFour }
]

export default routes