<script lang="ts">
	import Icon from '@iconify/svelte';
    import "./trail.pcss";
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
</script>


<div class="rounded-3xl border-2 border-secondary-500 w-fit">
	<LightSwitch />
</div>

<form
	method="POST"
	action="/admin/logout"
	use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			window.location.href = '/admin/login';
		};
	}}
>
	<button
		type="submit"
		value="logout"
		title="Deconnexion"
		class="btn-logout"
	>
		<Icon
			class="logout-icon"
			icon="solar:login-broken"
			width="32"
			height="32"
		/>
	</button>
</form>