<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import './button-disconnect.pcss';
</script>

<form
	method="POST"
	action="/admin/logout"
	use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			window.location.href = '/admin/login';
		};
	}}
>
	<button id="disconnect" {...$$restProps} type="submit" value="logout" title="Deconnexion">
		<div>Déconnexion</div>

		<Icon id="icon" icon="solar:user-cross-linear" width="32" height="32" />
	</button>
</form>
