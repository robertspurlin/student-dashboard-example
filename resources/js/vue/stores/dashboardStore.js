import { defineStore } from 'pinia'
import { ref, computed } from "vue"

export const useDashboardStore = defineStore('dashboard', () => {
	let isLoading = ref(true)
	let students = ref([])

	const populateStudents = () => {
		window.axios.get('/api/getStudents')
			.then((res) => {
				students.value = [ ...res.data ]
				isLoading.value = false
			})
	}

	return { isLoading, students, populateStudents }
})