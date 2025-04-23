<script lang="ts">
	interface Props {
		name: string;
		identifier: string;
		value?: string;
		rows?: number;
		cols?: number;
		maxlength?: number | undefined;
	}

	let {
		name,
		identifier,
		value = '',
		rows = 3,
		cols = 45,
		maxlength = undefined
	}: Props = $props();
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold"
		>{name}{maxlength != null ? ` (Max ${maxlength} caractères)` : ''}</span
	>
	<textarea
		class="textarea"
		{rows}
		{cols}
		{maxlength}
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
	></textarea>
</label>
