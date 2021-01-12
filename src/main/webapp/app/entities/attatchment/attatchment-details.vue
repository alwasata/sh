<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="attatchment">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.attatchment.detail.title')">Attatchment</span> {{attatchment.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.attatchment.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{attatchment.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.attatchment.file')">File</span>
                    </dt>
                    <dd>
                        <div v-if="attatchment.file">
                            <a v-on:click="openFile(attatchment.fileContentType, attatchment.file)" v-text="$t('entity.action.open')">open</a>
                            {{attatchment.fileContentType}}, {{byteSize(attatchment.file)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.attatchment.fileUrl')">File Url</span>
                    </dt>
                    <dd>
                        <span>{{attatchment.fileUrl}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.attatchment.employee')">Employee</span>
                    </dt>
                    <dd>
                        <div v-if="attatchment.employeeId">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: attatchment.employeeId}}">{{attatchment.employeeName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="attatchment.id" :to="{name: 'AttatchmentEdit', params: {attatchmentId: attatchment.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./attatchment-details.component.ts">
</script>
