<script lang="ts">
	let pictures: HTMLDivElement | null = null;

	export function toggle(value: boolean) {
		if (!pictures) return;

		if (value) pictures.style.display = 'flex';
		else pictures.style.display = 'none';
	}
</script>

<div
	bind:this={pictures}
	class="hidden justify-center items-center absolute left-0 top-0 w-full h-full z-40 p-10"
	{...$$restProps}
>
	<div class="absolute left-0 top-0 w-full h-full z-10 bg-black backdrop-blur-2xl opacity-20"></div>

	<div class="z-20">
		<label class="label mb-4" for="file">
			<span class="ml-3 font-semibold">Image</span>
			<input
				class="input"
				type="file"
				id="file"
				name="photoFile"
				accept={['.jpg', '.jpeg', '.png', '.webp'].join(',')}
			/>
		</label>
	</div>
</div>
