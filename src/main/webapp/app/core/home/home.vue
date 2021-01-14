<template>
    <div>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
        <b-sidebar id='sidebar-1' name='sidebar' title='Sidebar'>
            <div class='px-3 py-2'>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
            </div>
        </b-sidebar>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
