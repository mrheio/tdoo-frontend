<script setup lang="ts">
import Bootstrap from './Bootstrap.vue';
import Loading from './components/Loading.vue';
</script>

<template>
	<Suspense>
		<template #default>
			<Bootstrap />
		</template>

		<template #fallback>
			<Loading screen />
		</template>
	</Suspense>
</template>

<style></style>
