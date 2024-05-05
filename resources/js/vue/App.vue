<script setup>
import Header from './components/Header.vue'
import PageContainer from './components/PageContainer.vue'
</script>

<template>
	<v-app>
		<Header />
		<PageContainer>
			<RouterView />
		</PageContainer>
	</v-app>
</template>