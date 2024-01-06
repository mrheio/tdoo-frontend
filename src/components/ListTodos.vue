<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { computed, watchEffect } from 'vue';
import { useSession } from '../stores/session.store';
import { useTodos } from '../stores/todos.store';
import CardTodo from './CardTodo.vue';

const storeSession = useSession();
const storeTodos = useTodos();
const shouldShowLoading = computed(
	() => storeTodos.loading && storeTodos.todos.length === 0,
);

watchEffect(async () => {
	await storeTodos.fetchTodos({ user_id: storeSession.session?.id });
});
</script>

<template>
	<div v-if="shouldShowLoading" class="loading">
		<ProgressSpinner />
	</div>

	<ul v-else class="list">
		<li v-for="todo in storeTodos.todos">
			<CardTodo :todo="todo" />
		</li>
	</ul>
</template>

<style scoped>
.list {
}
.list > * + * {
	margin-top: 1rem;
}
</style>
