<script lang="ts">
    import Icon from '@iconify/svelte';
    import "./button-delete.pcss"

</script>



<button data-button="delete" {...$$restProps}>

    <div>
        Supprimer
    </div>

    <Icon
    data-button-icon="delete"
    icon="solar:minus-circle-broken"
    width="32"
    height="32"
    />
</button>