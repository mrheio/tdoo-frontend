<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import Bootstrap from './Bootstrap.vue';
</script>

<template>
	<Suspense>
		<template #default>
			<Bootstrap />
		</template>

		<template #fallback>
			<div class="loading"><ProgressSpinner /></div>
		</template>
	</Suspense>
</template>

<style>
.loading {
	min-height: 100vh;
	display: grid;
	place-items: center;
}
</style>
