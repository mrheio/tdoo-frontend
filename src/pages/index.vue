<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import DialogCreateTodo from '../components/DialogCreateTodo.vue';
import ListTodos from '../components/ListTodos.vue';
import { useSession } from '../stores/session.store';
import { useTodos } from '../stores/todos.store';

const storeSession = useSession();
const storeTodos = useTodos();
const createTodoVisible = ref(false);

const openCreateTodo = () => {
	createTodoVisible.value = !createTodoVisible.value;
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
			<ListTodos />

			<Button
				style="position: fixed; bottom: 8px; right: 8px"
				icon="pi pi-plus"
				@click="openCreateTodo"
			/>

			<DialogCreateTodo v-model:visible="createTodoVisible" />
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
