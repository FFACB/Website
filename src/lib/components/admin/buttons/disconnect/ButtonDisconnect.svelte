<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	let { ...rest } = $props();
</script>

<form
	method="POST"
	action="/admin/logout"
	use:enhance={() => {
		return () => {
			window.location.href = '/admin/login';
		};
	}}
>
	<button data-button="disconect" {...rest} type="submit" value="logout" title="Deconnexion">
		<div>Déconnexion</div>

		<Icon data-button-icon="disconect" icon="solar:user-cross-linear" width="32" height="32" />
	</button>
</form>
