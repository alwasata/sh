<template>
    <div class='row justify-content-center'>
        <div class='col-8'>
            <div v-if='setting'>
                <h2 class='jh-entity-heading'><span>الفئة</span> {{ setting.id }}</h2>
                <dl class='row jh-entity-details'>
                    <dt>
                        <span>الاسم بالعربية</span>
                    </dt>
                    <dd>
                        <span>{{ setting.key }}</span>
                    </dd>
                    <dt>
                        <span>الاسم بالانجليزية</span>
                    </dt>
                    <dd>
                        <span>{{ setting.value }}</span>
                    </dd>
                </dl>
                <button class='btn btn-info'
                        type='submit'
                        v-on:click.prevent='previousState()'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='setting.id' :to="{name: 'SettingEdit', params: {settingId: setting.id}}"
                             class='btn btn-primary' tag='button'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> تعديل</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang='ts' src='./setting-details.component.ts'>
</script>
