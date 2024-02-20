<script type="ts">

    import Contact from "$lib/components/Contact.svelte";
    export let data;
    const {parametres}=data
    const { PUBLIC_RECAPCHA_SITEKEY } = parametres


</script>

<img alt="s" src="/images/1.jpg">
<img alt="s" src="/uploads/1.jpg">
<h1 class="font-extrabold ">Home</h1>
<Contact {PUBLIC_RECAPCHA_SITEKEY} />
