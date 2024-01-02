<script setup lang="ts">
import Dialog from 'primevue/dialog';
import FormCreateTodo from './FormCreateTodo.vue';

const props = defineProps(['visible']);
const emit = defineEmits(['update:visible']);

const updateVisible = (val: boolean) => {
	emit('update:visible', val);
};
</script>

<template>
	<Dialog
		modal
		dismissable-mask
		:visible="props.visible"
		@update:visible="updateVisible"
	>
		<template #header><h2>Create a new task</h2></template>

		<FormCreateTodo :on-success="() => updateVisible(false)" />
	</Dialog>
</template>
