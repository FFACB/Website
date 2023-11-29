<script lang="ts">
    import Icon from '@iconify/svelte';
    import "./button-delete.pcss"

</script>



<button id="btn-delete" type="button" {...$$restProps}>

    <div>
        Supprimer
    </div>

    <Icon
    id="icon"
    icon="solar:minus-circle-broken"
    width="32"
    height="32"
    />
</button>