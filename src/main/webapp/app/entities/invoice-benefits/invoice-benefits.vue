<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.invoiceBenefits.home.title')" id="invoice-benefits-heading">Invoice Benefits</span>
            <router-link :to="{name: 'InvoiceBenefitsCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-invoice-benefits">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.invoiceBenefits.home.createLabel')">
                    Create a new Invoice Benefits
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
        <div class="alert alert-warning" v-if="!isFetching && invoiceBenefits && invoiceBenefits.length === 0">
            <span v-text="$t('sahatiApp.invoiceBenefits.home.notFound')">No invoiceBenefits found</span>
        </div>
        <div class="table-responsive" v-if="invoiceBenefits && invoiceBenefits.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('pointsCost')"><span v-text="$t('sahatiApp.invoiceBenefits.pointsCost')">Points Cost</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'pointsCost'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('cost')"><span v-text="$t('sahatiApp.invoiceBenefits.cost')">Cost</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cost'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('quantity')"><span v-text="$t('sahatiApp.invoiceBenefits.quantity')">Quantity</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'quantity'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('total')"><span v-text="$t('sahatiApp.invoiceBenefits.total')">Total</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'total'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('benefitNameAr')"><span v-text="$t('sahatiApp.invoiceBenefits.benefit')">Benefit</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'benefitNameAr'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('invoiceInvoiceNo')"><span v-text="$t('sahatiApp.invoiceBenefits.invoice')">Invoice</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoiceInvoiceNo'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="invoiceBenefits in invoiceBenefits"
                    :key="invoiceBenefits.id">
                    <td>
                        <router-link :to="{name: 'InvoiceBenefitsView', params: {invoiceBenefitsId: invoiceBenefits.id}}">{{invoiceBenefits.id}}</router-link>
                    </td>
                    <td>{{invoiceBenefits.pointsCost}}</td>
                    <td>{{invoiceBenefits.cost}}</td>
                    <td>{{invoiceBenefits.quantity}}</td>
                    <td>{{invoiceBenefits.total}}</td>
                    <td>
                        <div v-if="invoiceBenefits.benefitId">
                            <router-link :to="{name: 'BenefitView', params: {benefitId: invoiceBenefits.benefitId}}">{{invoiceBenefits.benefitNameAr}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="invoiceBenefits.invoiceId">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoiceBenefits.invoiceId}}">{{invoiceBenefits.invoiceInvoiceNo}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InvoiceBenefitsView', params: {invoiceBenefitsId: invoiceBenefits.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'InvoiceBenefitsEdit', params: {invoiceBenefitsId: invoiceBenefits.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(invoiceBenefits)"
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
            <span slot="modal-title"><span id="sahatiApp.invoiceBenefits.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-invoiceBenefits-heading" v-text="$t('sahatiApp.invoiceBenefits.delete.question', {'id': removeId})">Are you sure you want to delete this Invoice Benefits?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-invoiceBenefits" v-text="$t('entity.action.delete')" v-on:click="removeInvoiceBenefits()">Delete</button>
            </div>
        </b-modal>
        <div v-show="invoiceBenefits && invoiceBenefits.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-benefits.component.ts">
</script>
