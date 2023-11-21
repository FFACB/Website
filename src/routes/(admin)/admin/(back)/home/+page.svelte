<script type="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';


</script>



<div>Logged</div>


<form
	method="POST"
	action="/admin/logout"
	use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {

		return async ({ result, update }) => {
            window.location.href = '/admin/login';
		};
	}}
>
	
	<button type="submit" value="logout" class="submit-button">Deconnexion</button>
</form>

<style lang="scss">


</style>