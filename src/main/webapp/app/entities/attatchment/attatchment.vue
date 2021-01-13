<template>
    <div>
        <h2 id="page-heading">
            <span id='attatchment-heading'>Attatchments</span>
            <router-link :to="{name: 'AttatchmentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-attatchment">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    Create a new Attatchment
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && attatchments && attatchments.length === 0">
            <span>No attatchments found</span>
        </div>
        <div class="table-responsive" v-if="attatchments && attatchments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('name')"><span>Name</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('file')"><span>File</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'file'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('fileUrl')"><span>File Url</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'fileUrl'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.name')"><span>Employee</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="attatchment in attatchments"
                    :key="attatchment.id">
                    <td>
                        <router-link :to="{name: 'AttatchmentView', params: {attatchmentId: attatchment.id}}">{{attatchment.id}}</router-link>
                    </td>
                    <td>{{attatchment.name}}</td>
                    <td>
                        <a v-if='attatchment.file' v-on:click='openFile(attatchment.fileContentType, attatchment.file)'>open</a>
                        <span v-if="attatchment.file">{{attatchment.fileContentType}}, {{byteSize(attatchment.file)}}</span>
                    </td>
                    <td>{{attatchment.fileUrl}}</td>
                    <td>
                        <div v-if='attatchment.employee'>
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: attatchment.employee.id}}">
                                {{ attatchment.employee.name }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AttatchmentView', params: {attatchmentId: attatchment.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>View</span>
                            </router-link>
                            <router-link :to="{name: 'AttatchmentEdit', params: {attatchmentId: attatchment.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(attatchment)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span
                id='sahatiApp.attatchment.delete.question'>Confirm delete operation</span></span>
            <div class="modal-body">
                <p id='jhi-delete-attatchment-heading'>Are you sure you want to delete this Attatchment?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>Cancel</button>
                <button id='jhi-confirm-delete-attatchment' class='btn btn-primary' type='button'
                        v-on:click='removeAttatchment()'>Delete
                </button>
            </div>
        </b-modal>
        <div v-show="attatchments && attatchments.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./attatchment.component.ts">
</script>
