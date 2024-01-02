<script setup lang="ts">
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { watch } from 'vue';
import Navbar from './components/Navbar.vue';
import { useSession } from './stores/session.store';
import { useTodos } from './stores/todos.store';

const toast = useToast();
const storeSession = useSession();
const storeTodos = useTodos();

await storeSession.getSession();

watch(
	() => storeSession.error,
	(val, _) => {
		if (val) {
			toast.add({
				summary: val?.message,
				severity: 'error',
				life: 3000,
			});
		}
	},
	{ immediate: true },
);

watch(
	() => storeTodos.success,
	() => {
		if (storeTodos.success === 'create') {
			toast.add({
				summary: 'Todo created',
				severity: 'success',
				life: 3000,
			});
		}

		if (storeTodos.success === 'update') {
			toast.add({
				summary: 'Todo updated',
				severity: 'success',
				life: 3000,
			});
		}

		if (storeTodos.success === 'delete') {
			toast.add({
				summary: 'Todo deleted',
				severity: 'success',
				life: 3000,
			});
		}
	},
	{ immediate: true },
);
</script>

<template>
	<Navbar />
	<router-view></router-view>
	<Toast />
</template>
