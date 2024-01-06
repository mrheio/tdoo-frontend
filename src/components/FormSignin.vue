<script setup lang="ts">
import Button from 'primevue/button';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import Input from './Input.vue';

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref({ username: '', password: '' });
const fieldErrors = ref({ username: undefined, password: undefined });

const signIn = async () => {
	await storeSession.signin(fields.value);

	if (storeSession.success === 'signin') {
		props.onSuccess();
	}

	if (storeSession.error && storeSession.error.details.fieldErrors) {
		fieldErrors.value = {
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
	<form class="flex flex-col gap-m" @submit.prevent="signIn">
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
			label="Sign In"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
