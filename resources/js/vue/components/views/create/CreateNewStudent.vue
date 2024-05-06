<script setup>
import { ref } from 'vue'
import StudentForm from '../../reusuable/StudentForm.vue'

const snackbarNeedsToShow = defineModel('snackbarNeedsToShow')
const snackbarMessage = ref('')
const snackbarColor = ref('')

const showSnackbar = (message, color) => {
	snackbarNeedsToShow.value = true
	snackbarMessage.value = message
	snackbarColor.value = color
}

const formSubmitted = () => {
	showSnackbar('Student saved.', 'green')
}
</script>

<template>
	<div>
		<v-card flat class='pa-5'>
			<StudentForm 
				@showSnackbar='showSnackbar'
				@formSubmitted='formSubmitted'
				readOnly='false'
			/>
		</v-card>
		<v-snackbar
			v-model='snackbarNeedsToShow'
			:color='snackbarColor'
		>
			{{ snackbarMessage }}
		</v-snackbar>
	</div>
</template>