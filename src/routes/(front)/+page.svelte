<script type="ts">

    import Contact from "$lib/components/Contact.svelte";
    export let data;
    const {parametres}=data
    const { PUBLIC_RECAPCHA_SITEKEY } = parametres
    
</script>

<img alt="s" src="/images/1.png">
<img alt="s" src="/uploads/1.png">
<h1 class="font-extrabold ">Home</h1>
<Contact {PUBLIC_RECAPCHA_SITEKEY} />
