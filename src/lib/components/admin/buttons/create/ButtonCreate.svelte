<script lang="ts">
    import Icon from '@iconify/svelte';
    import "./button-create.pcss"
    export let titre : string;
    export let link : string;
</script>



<a id="create" {...$$restProps} href="{link}">

    <div>
        {titre}
    </div>

    <Icon
    id="icon"
    icon="solar:add-circle-broken"
    width="32"
    height="32"
    />
</a>