<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

defineProps({ screen: { type: Boolean } });
</script>

<template>
	<div :class="{ screen: screen }">
		<ProgressSpinner />
	</div>
</template>

<style scoped>
.screen {
	min-height: 100vh;
	display: grid;
	place-items: center;
}
</style>
