import { createWebHistory, createRouter } from 'vue-router'
import routes from '../vue/routes/routes'

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router