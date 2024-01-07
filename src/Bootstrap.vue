<script setup lang="ts">
import Toast from 'primevue/toast';
import { watchEffect } from 'vue';
import Navbar from './components/Navbar.vue';
import { useSession } from './stores/session.store';
import { useMyToast } from './stores/toast.store';

const toast = useMyToast();
const storeSession = useSession();

await storeSession.getSession();

watchEffect(() => {
	if (storeSession.error) {
		toast.error(storeSession.error?.message);
	}
});
</script>

<template>
	<Navbar />
	<router-view></router-view>
	<Toast />
</template>
