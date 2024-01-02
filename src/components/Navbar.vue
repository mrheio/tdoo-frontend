<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import DialogAuth from './DialogAuth.vue';

const storeSession = useSession();
const authDialogVisible = ref(false);

const toggleAuthDialog = () => {
	authDialogVisible.value = !authDialogVisible.value;
};
</script>

<template>
	<nav class="nav">
		<h1 class="nav__branding">Tdoo</h1>

		<Button
			v-if="!storeSession.session"
			label="Get started"
			@click="toggleAuthDialog"
		/>

		<div v-if="storeSession.session" class="nav__options">
			<span style="font-weight: 500">{{
				storeSession.session.username
			}}</span>
			<Button label="Let me out!" @click="storeSession.signout" />
		</div>
	</nav>

	<DialogAuth v-model:visible="authDialogVisible" />
</template>

<style scoped>
.nav {
	position: sticky;
	top: 1rem;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	margin-top: 1rem;
	margin-inline: 2rem;
	padding: 1rem 2rem;
	border-radius: 8px;
	background-color: var(--highlight-bg);
	backdrop-filter: blur(2px);
	z-index: 1000;
}

.nav__options {
	display: flex;
	gap: 2rem;
	align-items: center;
}
</style>
