import { defineStore } from 'pinia'
import { ref } from "vue"

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

	const findStudent = (id) => {
		const studentInStore = students.value.find(s => s.id === id)
		if (studentInStore === undefined) {
			throw new Error("Student not found")
		}
		return studentInStore
	}

	const advanceStudent = (studentId) => {
		const student = findStudent(studentId)
		if (student.grade >= 12) {
			throw new Error("Grade out of range if advanced, student not updated")
		}

		student.grade += 1
		
		window.axios.post('/api/advanceStudent', {
			id: studentId,
			grade: student.grade
		})
		.catch((error) => {
			console.log(error)
			throw new Error("/api/advanceStudent call failed")
		})
	}

	return { isLoading, students, populateStudents, findStudent, advanceStudent }
})