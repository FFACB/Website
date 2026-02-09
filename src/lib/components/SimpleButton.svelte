<script lang="ts">
	interface Props {
		title: string;
		link: string;
		backgroundColor: string;
		borderColor: string;
	}

	let { title, backgroundColor, borderColor, link }: Props = $props();
</script>

<a class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap" href={link}
	>
	<div
		class="m-2 p-4 pt-2 pb-2 font-bold text-white border-2 {borderColor} {backgroundColor} rounded-full hover:bg-white hover:text-black transition-all duration-300"
	>{title}</div>
</a>
