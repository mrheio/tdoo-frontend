<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import { computed, ref } from 'vue';
import { useTodos } from '../stores/todos.store';
import { Todo } from '../utils/types';

const props = defineProps<{ todo: Todo }>();
const storeTodos = useTodos();
const isLoading = ref(false);
const menu = ref();

const toggleMenu = (event) => {
	menu.value.toggle(event);
};

const updateTodo = async () => {
	isLoading.value = true;

	await storeTodos.updateTodo(props.todo.id, {
		completed: !props.todo.completed,
	});

	isLoading.value = false;
};

const deleteTodo = async () => {
	isLoading.value = true;

	await storeTodos.deleteTodo(props.todo.id);

	isLoading.value = false;
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
						<i
							v-if="!isLoading && props.todo.completed"
							class="pi pi-check-square"
						></i>
						<ProgressSpinner
							v-if="isLoading"
							style="width: 16px; height: 16px"
							strokeWidth="8"
						/>
					</div>

					<div>{{ props.todo.task }}</div>
				</div>

				<div>
					{{
						new Date(props.todo.created_at).toLocaleDateString(
							'en-GB',
							{ day: 'numeric', month: 'short', year: 'numeric' },
						)
					}}
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
	background-color: var(--highlight-bg);
}

.card--completed {
	background-color: var(--primary-color);
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
