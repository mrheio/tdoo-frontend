<script setup lang="ts">
import { watch } from 'vue';
import { useSession } from './stores/session.store';
import { useMyToast } from './stores/toast.store';

const toast = useMyToast();
const storeSession = useSession();

watch(
	() => storeSession.error,
	(val, _) => {
		if (val) {
			toast.error(val?.message);
		}
	},
	{ immediate: true },
);
</script>
