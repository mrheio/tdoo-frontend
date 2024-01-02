<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import { useTodos } from '../stores/todos.store';

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const storeTodos = useTodos();
const fields = ref({ task: '', completed: false });
const fieldErrors = ref({ task: null, completed: null });

const createTodo = async () => {
	await storeTodos.createTodo({
		...fields.value,
		user_id: storeSession.session!.id,
	});

	if (storeTodos.success === 'create') {
		props.onSuccess();
	}

	if (storeTodos.error && storeTodos.error.details.fieldErrors) {
		fieldErrors.value = {
			task: storeTodos.error.details.fieldErrors?.task?.[0] ?? null,
			completed:
				storeTodos.error.details.fieldErrors?.completed?.[0] ?? null,
		};
	}
};
</script>

<template>
	<form
		@submit.prevent="createTodo"
		style="display: flex; flex-direction: column; gap: 2rem"
	>
		<div style="display: flex; flex-direction: column; gap: 1rem">
			<label for="task">Task</label>
			<InputText
				id="task"
				type="text"
				v-model="fields.task"
				:class="{ 'p-invalid': fieldErrors.task }"
			/>
			<small class="p-error" v-if="fieldErrors.task">{{
				fieldErrors.task
			}}</small>
		</div>

		<div>
			<Checkbox v-model="fields.completed" :binary="true" />
			<label for="completed" style="margin-left: 1rem">
				Already completed?
			</label>
			<small class="p-error" v-if="fieldErrors.completed">{{
				fieldErrors.completed
			}}</small>
		</div>

		<Button
			type="submit"
			label="Create Todo"
			:loading="storeTodos.isLoading"
		/>
	</form>
</template>
