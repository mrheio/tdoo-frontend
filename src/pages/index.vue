<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, watch } from 'vue';
import TodosService from '../api/todos.api';
import ListTodos from '../components/ListTodos.vue';
import { useSession } from '../stores/session.store';
import { useMyToast } from '../stores/toast.store';
import { useTodos } from '../stores/todos.store';

const storeSession = useSession();
const toast = useMyToast();
const storeTodos = useTodos();
const fields = ref({ task: '' });
const fieldErrors = ref({ task: null });
const loading = ref(false);
const success = ref(false);

const createTodo = async () => {
	try {
		loading.value = true;
		success.value = false;
		await TodosService.create({
			...fields.value,
			user_id: storeSession.session!.id,
		});
		success.value = true;
		fields.value = { task: '' };
		fieldErrors.value = { task: null };
	} catch (e) {
		if (e?.details?.fieldErrors) {
			fieldErrors.value = {
				task: e.details.fieldErrors?.task?.[0] ?? null,
			};
		} else {
			toast.error(e.message);
		}
	} finally {
		loading.value = false;
	}
};

watch(success, async (val) => {
	if (val) {
		toast.success('Todo created');
		await storeTodos.fetchCurrentSessionTodos();
	}
});
</script>

<template>
	<div class="container">
		<div v-if="!storeSession.session" class="blank">
			<h1>
				Hey! <br />
				You can't see your todos if you are not logged in.
			</h1>
		</div>

		<template v-else>
			<div
				style="margin: 1rem 2rem; display: flex; flex-direction: column"
			>
				<div>
					<div style="display: flex; gap: 1rem">
						<InputText
							placeholder="What do you have in mind?"
							style="width: 100%"
							:class="{ 'p-invalid': fieldErrors.task }"
							v-model="fields.task"
						/>
						<Button
							type="button"
							icon="pi pi-check"
							:loading="loading"
							@click="createTodo"
						/>
					</div>
					<div style="margin-top: 0.5rem">
						<small v-if="fieldErrors.task" class="p-error">{{
							fieldErrors.task
						}}</small>
					</div>
				</div>
				<ListTodos />
			</div>
		</template>
	</div>
</template>

<style>
.container {
	max-width: 768px;
	margin-inline: auto;
}
.blank {
	height: 50vh;
	display: grid;
	place-items: center;
	text-align: center;
}
</style>
