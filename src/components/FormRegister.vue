<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useSession } from '../stores/session.store';

const props = defineProps(['onSuccess']);
const storeSession = useSession();
const fields = ref({ email: '', username: '', password: '' });
const fieldErrors = ref({ email: null, username: null, password: null });

const register = async () => {
	await storeSession.register(fields.value);

	if (storeSession.success === 'register') {
		props.onSuccess();
	}

	if (storeSession.error && storeSession.error.details.fieldErrors) {
		fieldErrors.value = {
			email: storeSession.error.details.fieldErrors?.email?.[0] ?? null,
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
		@submit.prevent="register"
		style="display: flex; flex-direction: column; gap: 2rem"
	>
		<div style="display: flex; flex-direction: column; gap: 1rem">
			<label for="email">Email</label>
			<InputText
				id="email"
				v-model="fields.email"
				:class="{ 'p-invalid': fieldErrors.email }"
			/>
			<small class="p-error" v-if="fieldErrors.email">{{
				fieldErrors.email
			}}</small>
		</div>

		<div style="display: flex; flex-direction: column; gap: 1rem">
			<label for="username">Username</label>
			<InputText
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
			label="Register"
			:loading="storeSession.isLoading"
		/>
	</form>
</template>
