<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useSession } from '../stores/session.store';
import { useTodos } from '../stores/todos.store';
import CardTodo from './CardTodo.vue';
import Loading from './Loading.vue';

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
	<Loading v-if="shouldShowLoading" screen />

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
