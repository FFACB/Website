
<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { IsJsonString } from '$lib/client/utils/type';

	let EditorJS = null, Header, NestedList, ImageTool, ButtonTool, ParagraphTool;

	// @ts-ignore
	export let contenu;

	// @ts-ignore
	let editor;
	// @ts-ignore
	onMount(async (_) => {

		EditorJS = (await import('@editorjs/editorjs')).default;
		
		// @ts-ignore
		Header = await import('@editorjs/header');
		// @ts-ignore
		NestedList = await import('@editorjs/nested-list');
		// @ts-ignore
		ImageTool = await import('@editorjs/image');
		ButtonTool = await import('$lib/client/editor/button/ButtonTool.js');
		ParagraphTool = await import('$lib/client/editor/paragraph/ParagraphTool.js');
		// @ts-ignore
		contenu = typeof contenu == 'string' ? JSON.parse(contenu) : contenu;

		// @ts-ignore
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
				paragraph: ParagraphTool,
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
			debugger
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

<textarea id="writer" />
