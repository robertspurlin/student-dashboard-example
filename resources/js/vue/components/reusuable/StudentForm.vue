<script setup>
import { onMounted, ref } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'
const store = useDashboardStore()

const props = defineProps({
	firstName: String,
	lastName: String,
	grade: Number,
	classes: String,
	id: Number,
	readOnly: Boolean
})

const emit = defineEmits(['formSubmitted', 'showSnackbar'])

const formFirstName = defineModel('formFirstName')
const formLastName = defineModel('formLastName')
const formGrade = defineModel('formGrade')
const formClasses = defineModel('formClasses')
const submitFunction = ref(null)

onMounted(() => {
	formFirstName.value = props.firstName
	formLastName.value = props.lastName
	formGrade.value = props.grade
	formClasses.value = props.classes

	submitFunction.value = props.id ? store.saveEditedStudent : store.saveNewStudent
})

const firstNameRules = ref([
	value => {
		if (value && value.length > 0) return true
		return 'First Name cannot be empty.'
	}
])

const lastNameRules = ref([
	value => {
		if (value && value.length > 0) return true
		return 'Last Name cannot be empty.'
	}
])

const classesRules = ref([
	value => {
		if (value && value.length > 0) return true
		return 'Classes cannot be empty.'
	}
])

const isSubmitting = ref(false)

const saveStudent = async (submitEventPromise) => {
	const { valid, errors } = await submitEventPromise
	if (!valid) return

	isSubmitting.value = true

	try {
		submitFunction.value({
			'first_name': formFirstName.value, 
			'last_name': formLastName.value, 
			'grade': formGrade.value, 
			'classes': formClasses.value,
			'id': props.id ?? null
		})
		console.log('ran')
	} catch (e) {
		emit('showSnackbar', e.message, 'red')
	}

	isSubmitting.value = false
	emit('formSubmitted')
}
</script>

<template>
	<v-form @submit.prevent="saveStudent">
		<v-row>
			<v-col
				cols='12'
				sm='6'
				class='mt-3'
			>
				<v-text-field
					label="First Name"
					v-model="formFirstName"
					:rules="firstNameRules"
					:readonly="isSubmitting"
					required
				></v-text-field>
			</v-col>

			<v-col
				cols='12'
				sm='6'
				class='mt-3'
			>
				<v-text-field
					label="Last Name"
					v-model="formLastName"
					:rules="lastNameRules"
					:readonly="isSubmitting"
					required
				></v-text-field>
			</v-col>

			<v-col
				cols='12'
				sm='6'
				class='mt-3'
			>
				<v-select
					:items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']"
					label="Grade"
					v-model="formGrade"
					:readonly="isSubmitting"
					required
				></v-select>
			</v-col>

			<v-col
				cols='12'
				sm='6'
				class='mt-3'
			>
				<v-text-field
					label="Classes"
					v-model="formClasses"
					:rules="classesRules"
					:readonly="isSubmitting"
					required
				></v-text-field>
			</v-col>

			<v-col class='text-center' v-if="!readonly">
				<v-btn 
					color='primary'
					type='submit'
					:loading='isSubmitting'
				>
					Save Student
				</v-btn>
			</v-col>
		</v-row>
	</v-form>

</template>