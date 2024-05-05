<script setup>
import { ref, computed, onMounted } from 'vue'
import titleCase from '../../../../helpers/titleCase'
import DataTableActions from './DataTableActions.vue'
import { useDashboardStore } from '../../../stores/dashboardStore'

const store = useDashboardStore()

onMounted(() => {
	store.populateStudents()
})

const searchValue = defineModel('searchValue')
const selectedRows = defineModel('selectedRows')

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
</script>

<template>
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
			v-model="selectedRows"
			:loading="store.isLoading"
			:headers="dataTableHeaders"
			:search="searchValue"
			:items="store.students"
			item-value="id"
			return-object
			show-select
		>
			<template v-slot:item.actions="{ item }">
				<DataTableActions :studentId="item.id" />
			</template>
		</v-data-table>
	</v-card>
</template>