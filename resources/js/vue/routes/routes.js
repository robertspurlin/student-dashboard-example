import Home from '../views/Home.vue'
import CreateNewStudent from '../views/CreateNewStudent.vue'
import FourOhFour from '../views/FourOhFour.vue'

const routes = [
	{ path: '/', component: Home }, 
	{ path: '/create', component: CreateNewStudent }, 
	{ path: '/:pathMatch(.*)*', component: FourOhFour }
]

export default routes