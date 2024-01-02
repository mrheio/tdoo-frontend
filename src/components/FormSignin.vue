<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref({ username: '', password: '' });
const fieldErrors = ref({ username: null, password: null });

const signIn = async () => {
	await storeSession.signin(fields.value);

	if (storeSession.success === 'signin') {
		props.onSuccess();
	}

	if (storeSession.error && storeSession.error.details.fieldErrors) {
		fieldErrors.value = {
			username:
				storeSession.error.details.fieldErrors?.username?.[0] ?? null,
			password:
				storeSession.error.details.fieldErrors?.password?.[0] ?? null,
		};
	}
};
</script>

<template>
	<form
		style="display: flex; flex-direction: column; gap: 2rem"
		@submit.prevent="signIn"
	>
		<div style="display: flex; flex-direction: column; gap: 1rem">
			<label for="username">Username</label>
			<InputText
				name="username"
				id="username"
				v-model="fields.username"
				:class="{ 'p-invalid': fieldErrors.username }"
			/>
			<small class="p-error" v-if="fieldErrors.username">{{
				fieldErrors.username
			}}</small>
		</div>

		<div style="display: flex; flex-direction: column; gap: 1rem">
			<label for="password">Password</label>
			<InputText
				name="password"
				id="password"
				type="password"
				v-model="fields.password"
				:class="{ 'p-invalid': fieldErrors.password }"
			/>
			<small class="p-error" v-if="fieldErrors.password">{{
				fieldErrors.password
			}}</small>
		</div>

		<Button
			type="submit"
			label="Sign In"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
