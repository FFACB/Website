<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import Content from '$lib/components/admin/content/Content.svelte';

	
</script>


<Content>

	<svelte:fragment slot="buttons">
		
		<!-- Buttons ici -->

	</svelte:fragment>


<div class="dark:bg-surface-700 bg-surface-300 p-4 rounded-3xl w-full h-full slot-container">
	<h1 class="h1">Home</h1>
</div>

</Content>
