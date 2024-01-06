<script setup lang="ts">
import Toast from 'primevue/toast';
import Watcher from './Watcher.vue';
import Navbar from './components/Navbar.vue';
import { useSession } from './stores/session.store';

const storeSession = useSession();

await storeSession.getSession();
</script>

<template>
	<Navbar />
	<router-view></router-view>
	<Toast />
	<Watcher />
</template>
