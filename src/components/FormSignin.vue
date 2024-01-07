<script setup lang="ts">
import Button from 'primevue/button';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';
import Input from './Input.vue';

const init = {
	fields: { username: '', password: '' },
	fieldErrors: { username: undefined, password: undefined },
};

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref(init.fields);
const fieldErrors = ref(init.fieldErrors);

const signIn = async () => {
	fieldErrors.value = init.fieldErrors;

	await storeSession.signin(fields.value);

	if (storeSession.success === 'signin') {
		props.onSuccess();
	}

	if (storeSession.error?.details?.fieldErrors) {
		fieldErrors.value = {
			username: storeSession.error.details.fieldErrors?.username?.[0],
			password: storeSession.error.details.fieldErrors?.password?.[0],
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
			v-model="fields.password"
			:error="fieldErrors.password"
		/>
		<Button
			type="submit"
			label="Sign In"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
