<script lang="ts">
	interface Props {
		name: string;
		identifier: string;
		value?: string;
	}

	let { name, identifier, value = '' }: Props = $props();
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold">{name}</span>
	<input
		class="input"
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
		type="text"
	/>
</label>
