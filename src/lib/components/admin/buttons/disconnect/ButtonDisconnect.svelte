<script lang="ts">
    import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import './button-disconnect.pcss';
</script>

<button id="disconnect" {...$$restProps} type="submit" value="logout" title="Deconnexion" >

    <div>Déconnexion</div>

	<form
		method="POST"
		action="/admin/logout"
		use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
			return async ({ result, update }) => {
				window.location.href = '/admin/login';
			};
		}}
	>
    <Icon id="icon" icon="solar:user-cross-linear" width="32" height="32" />
	</form>

</button>
