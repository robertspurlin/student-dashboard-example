<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '../../../stores/dashboardStore'
const store = useDashboardStore()

onMounted(() => {
	store.populateStudents()
})

const titleCase = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())

const search = defineModel('search')

const dataTableHeaders = computed({
	get() {
		if (Object.keys(store.students).length === 0) {
			return []
		}

		const keys = Object.keys(store.students[0])
		let returnArr = []
		keys.forEach((val) => {
			returnArr.push({ key: val, title: titleCase(val) })
		})

		return returnArr
	}
})

</script>

<template>
	<v-card flat>
		<v-container fluid>
			<v-row class='mx-0'>
				<v-col>
					<v-text-field
						v-model="search"
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
			:items="store.students"
		>
		</v-data-table>
	</v-card>
</template>