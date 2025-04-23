<script lang="ts">
	interface Props {
		name: string;
		identifier: string;
		value?: string;
		min?: string | undefined;
		max?: string | undefined;
		step?: string | undefined;
	}

	let {
		name,
		identifier,
		value = '',
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold">{name}</span>
	<input
		class="input"
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
		type="number"
		{min}
		{max}
		{step}
	/>
</label>
