
<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { IsJsonString } from '$lib/client/utils/type';
	import ButtonTool from '$lib/client/editor/button/ButtonTool.js';
	import ParagraphTool from '$lib/client/editor/paragraph/ParagraphTool.js';
	
	let EditorJS = null, Header, NestedList, ImageTool;

	let contenu = null;
	let editor;
	onMount(async (_) => {
		await loadEditor();

	});

 	async function loadEditor() {

		EditorJS = (await import('@editorjs/editorjs')).default;
		Header = (await import('@editorjs/header')).default;
		NestedList = (await import('@editorjs/nested-list')).default;
		ImageTool = (await import('@editorjs/image')).default;
		
	
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
			defaultBlock: 'paragraph',
			data: contenu
		});
	}

	export const methods = {
		loadContenu: (_contenu = null) => {
			// @ts-ignore
			if(_contenu == null || _contenu.length == 0 || !IsJsonString(contenu))
				return

			contenu = JSON.parse(_contenu);

			if(_contenu.blocks == null || _contenu.blocks.length == 0)
				return
				
			
			if (editor != null ) {

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
