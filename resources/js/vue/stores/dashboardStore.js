import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', () => {
	const isLoading = ref(true)
	const students = ref({})

	const populateStudents = () => {
		window.axios.get('/api/getStudents')
			.then((res) => {
				students = { ...res.data }
				isLoading = false
			})
	}
})