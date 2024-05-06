<script setup>
import { ref, computed, onMounted } from 'vue'
import titleCase from '../../../../helpers/titleCase'
import DataTableActions from './DataTableActions.vue'
import StudentForm from '../../reusuable/StudentForm.vue'
import { useDashboardStore } from '../../../stores/dashboardStore'

const store = useDashboardStore()

onMounted(() => {
	store.populateStudents()
})

const searchValue = defineModel('searchValue')
const snackbarNeedsToShow = defineModel('snackbarNeedsToShow')
const snackbarMessage = ref('')
const snackbarColor = ref('')

const editDialogNeedsToShow = ref(false)
const selectedStudentFirstName = ref('')
const selectedStudentLastName = ref('')
const selectedStudentGrade = ref('')
const selectedStudentClasses = ref('')
const selectedStudentId = ref('')

const dataTableHeaders = computed({
	get() {
		if (Object.keys(store.students).length === 0) return []

		const keys = Object.keys(store.students[0])
		let returnArr = []
		const colsToHide = ['id', 'created_at', 'updated_at']

		keys.forEach((val) => {
			let objToPush = { key: val, title: titleCase(val) }
			if (colsToHide.includes(val)) {
				objToPush.align = ' d-none' // adds the class to the header, hiding the rest of the col
			}
			returnArr.push(objToPush)
		})

		returnArr.push({ key: 'actions', title: 'Actions', 'sortable': false })
		return returnArr
	}
})

const showSnackbar = (message, color) => {
	snackbarNeedsToShow.value = true
	snackbarMessage.value = message
	snackbarColor.value = color
}

const showEditDialog = (studentId) => {
	const student = store.findStudent(studentId)
	console.log(student)
	selectedStudentFirstName.value = student.first_name
	selectedStudentLastName.value = student.last_name
	selectedStudentGrade.value = student.grade
	selectedStudentClasses.value = student.classes
	selectedStudentId.value = student.id
	editDialogNeedsToShow.value = true
}

const formSubmitted = () => {
	editDialogNeedsToShow.value = false
	showSnackbar('Student saved.', 'green')
}
</script>

<template>
	<div>
		<v-card flat class='my-3'>
			<v-container fluid>
				<v-row class='mx-0 d-flex justify-sm-space-between'>
					<v-col xs='12' sm='4' class='my-auto'>
						<v-btn color='primary'>
							Create New Student
						</v-btn>
					</v-col>
					<v-col xs='12' sm='4'>
						<v-text-field
							v-model="searchValue"
							label="Search"
							prepend-inner-icon="mdi-magnify"
							variant="outlined"
							hide-details
							single-line
						></v-text-field>
					</v-col>
				</v-row>
			</v-container>

			<v-data-table
				:loading="store.isLoading"
				:headers="dataTableHeaders"
				:search="searchValue"
				:items="store.students"
			>
				<template v-slot:item.actions="{ item }">
					<DataTableActions 
						:studentId="item.id" 
						@showSnackbar="showSnackbar"
						@showEditDialog="showEditDialog"
					/>
				</template>
			</v-data-table>
		</v-card>

		<v-snackbar
			v-model='snackbarNeedsToShow'
			:color='snackbarColor'
		>
			{{ snackbarMessage }}
		</v-snackbar>

		<v-dialog
		v-model="editDialogNeedsToShow"
		max-width="1000"
		>
			<v-card
				prepend-icon="mdi-account"
				title="Edit Student"
			>
				<v-card-text>
					<StudentForm
						:firstName='selectedStudentFirstName'
						:lastName='selectedStudentLastName'
						:grade='selectedStudentGrade'
						:classes='selectedStudentClasses'
						:id='selectedStudentId'
						:readOnly='false'
						@showSnackbar="showSnackbar"
						@formSubmitted="formSubmitted"
					/>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>