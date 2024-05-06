import { defineStore } from 'pinia'
import { ref } from 'vue'

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
			throw new Error("Something went wrong.")
		}
		return studentInStore
	}

	const advanceStudent = (id) => {
		const student = findStudent(id)
		if (student.grade >= 12) {
			throw new Error("Grade out of range if advanced, student not updated.")
		}

		student.grade = Number(student.grade) + 1
		
		window.axios.post('/api/advanceStudent', {
			id: id,
			grade: student.grade
		})
		.catch((error) => {
			throw new Error("Something went wrong.")
		})
	}

	const deleteStudent = (id) => {
		const student = findStudent(id)
		const idx = students.value.map(e => e.id).indexOf(id)
		if (idx) {
			students.value.splice(idx, 1)
		}

		window.axios.post('/api/deleteStudent', {
			id: id,
		})
		.catch((error) => {
			throw new Error("Something went wrong.")
		})
	}

	const saveNewStudent = (student) => {
		window.axios.post('/api/saveEditedStudent', {student: student})
		.catch((error) => {
			throw new Error("Something went wrong.")
		})
	}

	const saveEditedStudent = (student) => {
		const idx = students.value.findIndex(s => s.id === student.id)
		console.log(students.value[idx])
		students.value[idx] = { ...student }
		
		window.axios.post('/api/saveEditedStudent', student)
		.catch((error) => {
			throw new Error("Something went wrong.")
		})
	}

	return { 
		isLoading, 
		students, 
		populateStudents, 
		findStudent, 
		advanceStudent, 
		deleteStudent,
		saveNewStudent,
		saveEditedStudent
	}
})