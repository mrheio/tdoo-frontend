<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { watch } from 'vue';
import { useSession } from '../stores/session.store';
import { useTodos } from '../stores/todos.store';
import CardTodo from './CardTodo.vue';

const storeSession = useSession();
const storeTodos = useTodos();

watch(
	() => storeSession.session,
	async () => {
		await storeTodos.fetchTodos({ user_id: storeSession.session?.id });
	},
	{ immediate: true },
);
</script>

<template>
	<ul v-if="!storeTodos.isLoading" class="list">
		<li v-for="todo in storeTodos.todos">
			<CardTodo :todo="todo" />
		</li>
	</ul>

	<div v-else class="loading"><ProgressSpinner /></div>
</template>

<style scoped>
.list {
	margin: 1rem 2rem;
}
.list > * + * {
	margin-top: 1rem;
}
</style>
