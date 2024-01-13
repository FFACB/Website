<script lang="ts">
    import Icon from '@iconify/svelte';
    import "./button-save.pcss"
    export let titre : string;
</script>



<button data-button="save" {...$$restProps}>

    <div>
        {titre}
    </div>

    <Icon
    data-button-icon="save"
    icon="solar:check-circle-broken"
    width="32"
    height="32"
    />
</button>