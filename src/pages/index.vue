<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import TodosService from '../api/todos.api';
import ListTodos from '../components/ListTodos.vue';
import { useSession } from '../stores/session.store';
import { useMyToast } from '../stores/toast.store';
import { useTodos } from '../stores/todos.store';

const init = { fields: { task: '' }, fieldErrors: { task: undefined } };

const storeSession = useSession();
const toast = useMyToast();
const storeTodos = useTodos();

const fields = ref(init.fields);
const fieldErrors = ref(init.fieldErrors);
const loading = ref(false);

const createTodo = async () => {
	try {
		loading.value = true;
		fieldErrors.value = init.fieldErrors;

		await TodosService.create({
			...fields.value,
			user_id: storeSession.session!.id,
		});

		fields.value = init.fields;
		toast.success('Todo created');
		await storeTodos.fetchCurrentSessionTodos();
	} catch (e) {
		if (e?.details?.fieldErrors) {
			fieldErrors.value = { task: e.details.fieldErrors?.task?.[0] };
		} else {
			toast.error(e.message);
		}
	} finally {
		loading.value = false;
	}
};
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
			<div class="flex flex-col" style="margin: 1rem 2rem">
				<div>
					<div class="flex gap-s">
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

<style scoped>
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
