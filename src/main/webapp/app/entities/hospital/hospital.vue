<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.hospital.home.title')" id="hospital-heading">Hospitals</span>
            <router-link :to="{name: 'HospitalCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-hospital">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.hospital.home.createLabel')">
                    Create a new Hospital
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
        <div class="alert alert-warning" v-if="!isFetching && hospitals && hospitals.length === 0">
            <span v-text="$t('sahatiApp.hospital.home.notFound')">No hospitals found</span>
        </div>
        <div class="table-responsive" v-if="hospitals && hospitals.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nameAr')"><span v-text="$t('sahatiApp.hospital.nameAr')">Name Ar</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameAr'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nameEn')"><span v-text="$t('sahatiApp.hospital.nameEn')">Name En</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameEn'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('email')"><span v-text="$t('sahatiApp.hospital.email')">Email</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('phone')"><span v-text="$t('sahatiApp.hospital.phone')">Phone</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phone'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('address')"><span v-text="$t('sahatiApp.hospital.address')">Address</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'address'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="hospital in hospitals"
                    :key="hospital.id">
                    <td>
                        <router-link :to="{name: 'HospitalView', params: {hospitalId: hospital.id}}">{{hospital.id}}</router-link>
                    </td>
                    <td>{{hospital.nameAr}}</td>
                    <td>{{hospital.nameEn}}</td>
                    <td>{{hospital.email}}</td>
                    <td>{{hospital.phone}}</td>
                    <td>{{hospital.address}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: hospital.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'HospitalEdit', params: {hospitalId: hospital.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(hospital)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="sahatiApp.hospital.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-hospital-heading" v-text="$t('sahatiApp.hospital.delete.question', {'id': removeId})">Are you sure you want to delete this Hospital?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-hospital" v-text="$t('entity.action.delete')" v-on:click="removeHospital()">Delete</button>
            </div>
        </b-modal>
        <div v-show="hospitals && hospitals.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./hospital.component.ts">
</script>
