<script setup lang="ts">
import Button from 'primevue/button';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import Input from './Input.vue';

const init = {
	fields: { email: '', username: '', password: '' },
	fieldErrors: { email: undefined, username: undefined, password: undefined },
};

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref(init.fields);
const fieldErrors = ref(init.fieldErrors);

const register = async () => {
	fieldErrors.value = init.fieldErrors;

	await storeSession.register(fields.value);

	if (storeSession.success === 'register') {
		props.onSuccess();
	}

	if (storeSession.error?.details?.fieldErrors) {
		fieldErrors.value = {
			email: storeSession.error.details.fieldErrors?.email?.[0],
			username: storeSession.error.details.fieldErrors?.username?.[0],
			password: storeSession.error.details.fieldErrors?.password?.[0],
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
			v-model="fields.password"
			:error="fieldErrors.password"
		/>
		<Button
			type="submit"
			label="Register"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
