<script  >

	import EditorJS from '@editorjs/editorjs';
	// @ts-ignore
	// @ts-ignore
	import Header from '@editorjs/header';
	// @ts-ignore
	// @ts-ignore
	import NestedList from '@editorjs/nested-list';
	// @ts-ignore
	// @ts-ignore
	import ImageTool from '@editorjs/image';
	// @ts-ignore
	import { IsJsonString } from '$lib/client/utils/type';
	// @ts-ignore
	import ButtonTool from '$lib/client/editor/button/ButtonTool.js';
	// @ts-ignore
	import { onMount } from 'svelte';

	// @ts-ignore
	export let contenu;

	// @ts-ignore
	let editor;
	// @ts-ignore
	onMount((_) => {
		// @ts-ignore
		contenu = typeof contenu == 'string' ? JSON.parse(contenu) : contenu;

		editor = new EditorJS({
			holder: 'writer',
			tools: {
				header: {
					class: Header,
					config: {
						placeholder: 'Titre',
						levels: [2, 3, 4],
						defaultLevel: 2
					},
					shortcut: 'CMD+SHIFT+H'
				},
				button: {
					// @ts-ignore
					class: ButtonTool
				},
				nestedList: {
					class: NestedList,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+L'
				},
				image: {
					class: ImageTool,
					config: {
						endpoints: {
							byFile: '/api/editorjs', 
							byUrl: '/api/editorjs',
						}
					}
				}
			},
			data: contenu,
			defaultBlock: 'paragraph'
		});
	});

	export const methods = {
		loadContenu: (contenu = null) => {
			// @ts-ignore
			if (editor != null && contenu != null) {

				
				if (IsJsonString(contenu)) {
					contenu = JSON.parse(contenu);
				}

				// @ts-ignore
				if(contenu.blocks == null || contenu.blocks.length == 0)
					return
				
				// @ts-ignore
				editor.isReady.then(() => {
					// @ts-ignore
					editor.render(contenu);
				});
			}
		},

		saveContenu: async () => {
			let contenuSaved = {};

			// @ts-ignore
			if (editor != null) {
				// @ts-ignore
				contenuSaved = await editor.save().catch((error) => {
					console.log('Saving failed: ', error);
				});
			}

			return  JSON.stringify(contenuSaved);
		}
	};
</script>

<div id="writer" />
