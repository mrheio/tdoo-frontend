<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import { computed, ref } from 'vue';
import TodosService from '../api/todos.api';
import { useMyToast } from '../stores/toast.store';
import { useTodos } from '../stores/todos.store';
import { Todo } from '../utils/types';

const props = defineProps<{ todo: Todo }>();

const toast = useMyToast();
const storeTodos = useTodos();
const menu = ref();
const loading = ref(false);

const toggleMenu = (event: MouseEvent) => {
	menu.value.toggle(event);
};

const updateTodo = async () => {
	loading.value = true;
	await TodosService.update(props.todo.id, {
		completed: !props.todo.completed,
	});
	loading.value = false;
	toast.success('Todo updated');
	await storeTodos.fetchCurrentSessionTodos();
};

const deleteTodo = async () => {
	loading.value = true;
	await TodosService.delete(props.todo.id);
	loading.value = false;
	toast.success('Todo deleted');
	await storeTodos.fetchCurrentSessionTodos();
};

const cardClasses = computed(() =>
	props.todo.completed
		? 'card card--completed card--interactable animated'
		: 'card card--interactable animated',
);
</script>

<template>
	<Card :class="cardClasses" @click="updateTodo">
		<template #content>
			<div class="card__content">
				<div style="display: flex; align-items: center; gap: 1rem">
					<div
						style="display: flex; align-items: center; width: 16px"
					>
						<ProgressSpinner
							v-if="loading"
							style="width: 16px; height: 16px"
							strokeWidth="8"
						/>
						<i
							v-else-if="props.todo.completed"
							class="pi pi-check-square"
						></i>
					</div>

					<div>{{ props.todo.task }}</div>
				</div>

				<div>
					<Button
						type="button"
						text
						severity="secondary"
						icon="pi pi-ellipsis-v"
						@click.stop="toggleMenu"
						aria-haspopup="true"
						aria-controls="overlay_menu"
					/>

					<Menu
						ref="menu"
						id="overlay_menu"
						:popup="true"
						:model="[
							{
								label: 'Delete',
								icon: 'pi pi-trash',
								command: deleteTodo,
							},
						]"
					/>
				</div>
			</div>
		</template>
	</Card>
</template>

<style scoped>
.card {
}

.card--completed {
	background-color: var(--highlight-bg);
	color: var(--highlight-text-color);
}

.card--interactable {
	cursor: pointer;
}

.card--interactable:hover {
	filter: brightness(1.05);
	transform: scale(100.5%);
}

.card__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
