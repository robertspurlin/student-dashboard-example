import { describe, beforeEach, expect, it, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDashboardStore } from '../dashboardStore'
import axios from 'axios'

describe('Dashboard Store', () => {

	beforeEach(() => {
		setActivePinia(createPinia())
		window.axios = axios
	})

	afterEach(() => {
		delete window.axios
	})
/* 
	it("Populates students array when populateStudents is called", () => {
		const store = useDashboardStore()
		expect(store.students).toStrictEqual([])
		setTimeout(() => {
			store.populateStudents()
		}, 1000)

		// Only check if the first elem is what we are expecting
		expect(store.students[0]).toHaveProperty('first_name')
		expect(store.students[0]).toHaveProperty('last_name')
		expect(store.students[0]).toHaveProperty('grade')
		expect(store.students[0]).toHaveProperty('classes')
	}) */

	it("Returns correctly when findStudent is called", () => {
		const store = useDashboardStore()
		const testObj = {
			'first_name': 'Test',
			'last_name': 'Test',
			'grade': 12,
			'classes': 'Test Class',
			'id': 10
		}

		store.students[0] = { ...testObj }

		const findStudentResults = store.findStudent(10)
		expect(findStudentResults).toStrictEqual(testObj)

		expect(() => store.findStudent(100)).toThrowError("Something went wrong.")
	})

/* 	it("Validates correctly when advanceStudent is called", () => {
		const store = useDashboardStore()
		const testObj = {
			'first_name': 'Automated Test',
			'last_name': 'Test',
			'grade': 1,
			'classes': 'Test Class'
		}

		store.saveNewStudent(testObj)
		store.populateStudents()

		const foundStudent = store.students.find(s => s.first_name === 'Automated Test')

		const advanceStudentResults = store.advanceStudent(foundStudent.id)
		expect(advanceStudentResults.grade).toBe(2)

		testObj.grade = 12
		store.students[0] = { ...testObj }
		expect(() => store.advanceStudent(10)).toThrowError("Grade out of range if advanced, student not updated.")

		store.deleteStudent(foundStudent.id)
	})

	it("Deletes a student correctly when deleteStudent is called", () => {
		const store = useDashboardStore()
		const testObj = {
			'first_name': 'Automated Test',
			'last_name': 'Test',
			'grade': 1,
			'classes': 'Test Class'
		}

		store.saveNewStudent(testObj)
		store.populateStudents()

		const foundStudent = store.students.find(s => s.first_name === 'Automated Test')

		store.deleteStudent(foundStudent)

		const foundStudentAfterDelete = store.students.find(s => s.first_name === 'Automated Test')
		expect(foundStudentAfterDelete).toBeFalsy()
	})

	it("Edits a student record appropriately when saveEditedStudent is called", () => {
		const store = useDashboardStore()
		const testObj = {
			'first_name': 'Automated Test',
			'last_name': 'Test',
			'grade': 1,
			'classes': 'Test Class'
		}

		store.saveNewStudent(testObj)
		store.populateStudents()

		const foundStudent = store.students.find(s => s.first_name === 'Automated Test')
		testObj.last_name = 'Test Last Name'
		store.saveEditedStudent(testObj)

		const foundStudentAfterEdit = store.students.find(s => s.first_name === 'Automated Test')
		expect(foundStudentAfterEdit).toBe('Test Last Name')
	}) */
})

