<script lang="ts">
    import Icon from '@iconify/svelte';
    import "./button-save.pcss"
    export let titre : string;
</script>



<button id="save" {...$$restProps}>

    <div>
        {titre}
    </div>

    <Icon
    id="icon"
    icon="solar:check-circle-broken"
    width="32"
    height="32"
    />
</button>