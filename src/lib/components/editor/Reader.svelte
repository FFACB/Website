<script lang="ts">
	// @ts-nocheck
	import { IsJsonString } from '$lib/client/utils/type';
	import type { Blocks } from '@editorjs/editorjs/types/api';

	let { contenu } = $props();
	let blocks = $state([]);
	if (contenu != null && contenu.length != 0 && IsJsonString(contenu)) {
		const fullcontenu = JSON.parse(contenu);
		blocks = fullcontenu.blocks;
	}

	function nestedList(listData) {
		const { items, style = 'unordered' } = listData;

		let listHtml = '';

		if (items == null || items.length == 0) listHtml = '';

		listHtml += `<ul style="--index:0;"  class=' parent child-0'>`;
		items.forEach((element, index) => {
			listHtml += listChild(element, style, ++index);
		});
		listHtml += `</ul>`;
		return listHtml;
	}

	function listChild(parent, style, parentIndex, nestedIndex = 1) {
		let listHtml = '';

		const { content, items } = parent;

		listHtml += `<li>${style == 'ordered' ? `<ol>${parentIndex}</ol> &nbsp;` : '&#8226;&nbsp;'}${content}</li>`;

		if (items != null && items.length > 0) {
			listHtml += `<ul style="--index:${nestedIndex};" class='child-${nestedIndex}'>`;
			items.forEach((element, index) => {
				listHtml += listChild(element, style, `${parentIndex}.${++index}`, nestedIndex++);
			});
			listHtml += '</ul>';
		}

		return listHtml;
	}
</script>

<div id="contenu">
	{#each blocks as block, index (index)}
		<div class="block mb-4 block-{block.type}">
			{#if block.type == 'paragraph'}
				<p bind:innerHTML={block.data.text} contenteditable="false"></p>
			{/if}
			{#if block.type == 'header' && block.data.level == 2}
				<h2 class="block-header">{block.data.text}</h2>
			{/if}
			{#if block.type == 'header' && block.data.level == 3}
				<h3 class="block-header">{block.data.text}</h3>
			{/if}
			{#if block.type == 'header' && block.data.level == 4}
				<h4 class="block-header">{block.data.text}</h4>
			{/if}

			{#if block.type == 'list'}
				<ul>
					{#each block.data.items as item, index (index)}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}

			{#if block.type == 'nestedList'}
				<div class="block-nestedList">
					{@html nestedList(block.data)}
				</div>
			{/if}

			{#if block.type == 'quote'}
				<blockquote>{block.data.text}</blockquote>
			{/if}
			{#if block.type == 'image'}
				<div class="w-full max-h-96 overflow-hidden">
					<img
						class="w-full h-full bg-cover object-cover"
						src={block.data.file.url}
						alt={block.data.caption}
					/>
					<blockquote>{block.data.caption}</blockquote>
				</div>
			{/if}
			{#if block.type == 'code'}
				<pre><code>{block.data.code}</code></pre>
			{/if}
			{#if block.type == 'delimiter'}
				<hr />
			{/if}
			{#if block.type == 'raw'}
				<div>{block.data.html}</div>
			{/if}
			{#if block.type == 'button'}
				<a class="btn" href={block.data.link}>{block.data.text}</a>
			{/if}
		</div>
	{/each}
</div>
