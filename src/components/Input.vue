<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps({
	error: { type: String },
	label: { type: String },
	name: { type: String },
	id: { type: String },
	type: { type: String },
});
const model = defineModel<string>();
</script>

<template>
	<div class="input-container">
		<label v-if="label" :for="id">{{ label }}</label>
		<InputText
			:name="name"
			:id="id"
			:type="type"
			:class="{ 'p-invalid': error }"
			v-model="model"
		/>
		<small class="p-error" v-if="error">{{ error }}</small>
	</div>
</template>

<style scoped>
.input-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
