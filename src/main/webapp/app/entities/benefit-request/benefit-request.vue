<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.benefitRequest.home.title')" id="benefit-request-heading">Benefit Requests</span>
            <router-link :to="{name: 'BenefitRequestCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-benefit-request">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.benefitRequest.home.createLabel')">
                    Create a new Benefit Request
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
        <div class="alert alert-warning" v-if="!isFetching && benefitRequests && benefitRequests.length === 0">
            <span v-text="$t('sahatiApp.benefitRequest.home.notFound')">No benefitRequests found</span>
        </div>
        <div class="table-responsive" v-if="benefitRequests && benefitRequests.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nameAr')"><span v-text="$t('sahatiApp.benefitRequest.nameAr')">Name Ar</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameAr'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nameEn')"><span v-text="$t('sahatiApp.benefitRequest.nameEn')">Name En</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameEn'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('pointsCost')"><span v-text="$t('sahatiApp.benefitRequest.pointsCost')">Points Cost</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'pointsCost'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('cost')"><span v-text="$t('sahatiApp.benefitRequest.cost')">Cost</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cost'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('benefitStatus')"><span v-text="$t('sahatiApp.benefitRequest.benefitStatus')">Benefit Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'benefitStatus'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('notes')"><span v-text="$t('sahatiApp.benefitRequest.notes')">Notes</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'notes'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('categoryNameAr')"><span v-text="$t('sahatiApp.benefitRequest.category')">Category</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'categoryNameAr'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('hospitalNameAr')"><span v-text="$t('sahatiApp.benefitRequest.hospital')">Hospital</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'hospitalNameAr'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('benefitNameAr')"><span v-text="$t('sahatiApp.benefitRequest.benefit')">Benefit</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'benefitNameAr'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="benefitRequest in benefitRequests"
                    :key="benefitRequest.id">
                    <td>
                        <router-link :to="{name: 'BenefitRequestView', params: {benefitRequestId: benefitRequest.id}}">{{benefitRequest.id}}</router-link>
                    </td>
                    <td>{{benefitRequest.nameAr}}</td>
                    <td>{{benefitRequest.nameEn}}</td>
                    <td>{{benefitRequest.pointsCost}}</td>
                    <td>{{benefitRequest.cost}}</td>
                    <td v-text="$t('sahatiApp.BenefitStatus.' + benefitRequest.benefitStatus)">{{benefitRequest.benefitStatus}}</td>
                    <td>{{benefitRequest.notes}}</td>
                    <td>
                        <div v-if="benefitRequest.categoryId">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefitRequest.categoryId}}">{{benefitRequest.categoryNameAr}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="benefitRequest.hospitalId">
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefitRequest.hospitalId}}">{{benefitRequest.hospitalNameAr}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="benefitRequest.benefitId">
                            <router-link :to="{name: 'BenefitView', params: {benefitId: benefitRequest.benefitId}}">{{benefitRequest.benefitNameAr}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BenefitRequestView', params: {benefitRequestId: benefitRequest.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BenefitRequestEdit', params: {benefitRequestId: benefitRequest.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(benefitRequest)"
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
            <span slot="modal-title"><span id="sahatiApp.benefitRequest.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-benefitRequest-heading" v-text="$t('sahatiApp.benefitRequest.delete.question', {'id': removeId})">Are you sure you want to delete this Benefit Request?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-benefitRequest" v-text="$t('entity.action.delete')" v-on:click="removeBenefitRequest()">Delete</button>
            </div>
        </b-modal>
        <div v-show="benefitRequests && benefitRequests.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-request.component.ts">
</script>
