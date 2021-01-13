<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="attatchment">
                <h2 class='jh-entity-heading'><span>Attatchment</span> {{ attatchment.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{attatchment.name}}</span>
                    </dd>
                    <dt>
                        <span>File</span>
                    </dt>
                    <dd>
                        <div v-if="attatchment.file">
                            <a v-on:click='openFile(attatchment.fileContentType, attatchment.file)'>open</a>
                            {{attatchment.fileContentType}}, {{byteSize(attatchment.file)}}
                        </div>
                    </dd>
                    <dt>
                        <span>File Url</span>
                    </dt>
                    <dd>
                        <span>{{attatchment.fileUrl}}</span>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if='attatchment.employee'>
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: attatchment.employee.id}}">
                                {{ attatchment.employee.name }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='attatchment.id'
                             :to="{name: 'AttatchmentEdit', params: {attatchmentId: attatchment.id}}" tag='button'
                             class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./attatchment-details.component.ts">
</script>
