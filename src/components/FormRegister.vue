<script setup lang="ts">
import Button from 'primevue/button';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import Input from './Input.vue';

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref({ email: '', username: '', password: '' });
const fieldErrors = ref({
	email: undefined,
	username: undefined,
	password: undefined,
});

const register = async () => {
	await storeSession.register(fields.value);

	if (storeSession.success === 'register') {
		props.onSuccess();
	}

	if (storeSession.error && storeSession.error.details.fieldErrors) {
		fieldErrors.value = {
			email:
				storeSession.error.details.fieldErrors?.email?.[0] ?? undefined,
			username:
				storeSession.error.details.fieldErrors?.username?.[0] ??
				undefined,
			password:
				storeSession.error.details.fieldErrors?.password?.[0] ??
				undefined,
		};
	}
};
</script>

<template>
	<form class="flex flex-col gap-m" @submit.prevent="register">
		<Input
			name="email"
			id="email"
			label="Email"
			type="text"
			v-model="fields.email"
			:error="fieldErrors.email"
		/>
		<Input
			name="username"
			id="username"
			label="Username"
			type="text"
			v-model="fields.username"
			:error="fieldErrors.username"
		/>
		<Input
			name="password"
			id="password"
			label="Password"
			type="password"
			:v-model="fields.password"
			:error="fieldErrors.password"
		/>
		<Button
			type="submit"
			label="Register"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
