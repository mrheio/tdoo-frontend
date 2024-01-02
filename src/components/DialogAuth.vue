<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import FormRegister from './FormRegister.vue';
import FormSignin from './FormSignin.vue';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);
const view = ref<'signin' | 'register'>('signin');

const updateVisible = (val: boolean) => {
	emit('update:visible', val);
};

const changeView = (val: 'signin' | 'register') => {
	view.value = val;
};
</script>

<template>
	<Dialog
		modal
		dismissable-mask
		:visible="props.visible"
		@update:visible="updateVisible"
	>
		<template #header>
			<h2 v-if="view === 'signin'">Enter account</h2>
			<h2 v-else>Create account</h2>
		</template>

		<template v-if="view === 'signin'">
			<FormSignin
				@update:view="changeView"
				:on-success="() => updateVisible(false)"
			/>
			<Button
				type="button"
				style="margin-top: 2rem"
				label="No account? Create one here"
				@click="() => changeView('register')"
			/>
		</template>

		<template v-if="view === 'register'">
			<FormRegister
				@update:view="changeView"
				:on-success="() => updateVisible(false)"
			/>
			<Button
				type="button"
				style="margin-top: 2rem"
				label="Already have an account? Enter here"
				@click="() => changeView('signin')"
			/>
		</template>
	</Dialog>
</template>
