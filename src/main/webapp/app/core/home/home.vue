<template>
    <div>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
        <b-sidebar id='sidebar-1' name='sidebar' right shadow title='صحتي'>
            <div class='px-3 py-2'>
                <section>
                    <p>sidebar</p>
                </section>
                <section>
                    <h2>Section1</h2>
                    <p>section1 whatever data you want to put in this section</p>
                </section>
                <section>
                    <h2>Section2</h2>
                    <p>section1 whatever data you want to put in this section</p>
                </section>
                <section>
                    <h2>Section3</h2>
                    <p>section1 whatever data you want to put in this section</p>
                </section>
                <section>
                    <h2>Section4</h2>
                    <p>section1 whatever data you want to put in this section</p>
                </section>
            </div>
        </b-sidebar>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
