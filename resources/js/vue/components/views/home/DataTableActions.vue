<script setup>
import { useDashboardStore } from '../../../stores/dashboardStore'
const store = useDashboardStore()

const props = defineProps({
	studentId: Number
})

const advanceStudent = () => {
	try {
		store.advanceStudent(props.studentId)
	} catch (e) {
		// show error
		console.log(e)
	}
}

const editStudent = () => console.log(props.studentId)
const deleteStudent = () => console.log(props.studentId)
</script>

<template>
	<span>
		<v-tooltip location="top">
			<template v-slot:activator="{ props }">
				<v-icon 
					class="me-4" 
					size="small" 
					@click="advanceStudent()"
					v-bind="props"
				>
					mdi-plus-circle
				</v-icon>
			</template>
			<span>Advance Student</span>
		</v-tooltip>

		<v-tooltip location="top">
			<template v-slot:activator="{ props }">
				<v-icon 
					class="me-4" 
					size="small" 
					@click="editStudent()"
					v-bind="props"
				>
					mdi-square-edit-outline
				</v-icon>
			</template>
			<span>Edit Student</span>
		</v-tooltip>

		<v-tooltip location="top">
			<template v-slot:activator="{ props }">
				<v-icon 
					class="me-4" 
					size="small" 
					@click="advanceStudent()"
					v-bind="props"
				>
					mdi-delete
				</v-icon>
			</template>
			<span>Delete Student</span>
		</v-tooltip>	
	</span>
</template>