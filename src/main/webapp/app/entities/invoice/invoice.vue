<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.invoice.home.title')" id="invoice-heading">Invoices</span>
            <router-link :to="{name: 'InvoiceCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-invoice">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.invoice.home.createLabel')">
                    Create a new Invoice
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
        <div class="alert alert-warning" v-if="!isFetching && invoices && invoices.length === 0">
            <span v-text="$t('sahatiApp.invoice.home.notFound')">No invoices found</span>
        </div>
        <div class="table-responsive" v-if="invoices && invoices.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('invoiceNo')"><span v-text="$t('sahatiApp.invoice.invoiceNo')">Invoice No</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoiceNo'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('invoiceDate')"><span v-text="$t('sahatiApp.invoice.invoiceDate')">Invoice Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoiceDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('payDate')"><span v-text="$t('sahatiApp.invoice.payDate')">Pay Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'payDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('total')"><span v-text="$t('sahatiApp.invoice.total')">Total</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'total'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('invoiceStatus')"><span v-text="$t('sahatiApp.invoice.invoiceStatus')">Invoice Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoiceStatus'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('notes')"><span v-text="$t('sahatiApp.invoice.notes')">Notes</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'notes'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('cardTransactionId')"><span v-text="$t('sahatiApp.invoice.cardTransaction')">Card Transaction</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cardTransactionId'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="invoice in invoices"
                    :key="invoice.id">
                    <td>
                        <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}">{{invoice.id}}</router-link>
                    </td>
                    <td>{{invoice.invoiceNo}}</td>
                    <td>{{invoice.invoiceDate}}</td>
                    <td>{{invoice.payDate}}</td>
                    <td>{{invoice.total}}</td>
                    <td v-text="$t('sahatiApp.InvoiceStatus.' + invoice.invoiceStatus)">{{invoice.invoiceStatus}}</td>
                    <td>{{invoice.notes}}</td>
                    <td>
                        <div v-if="invoice.cardTransactionId">
                            <router-link :to="{name: 'CardTransactionView', params: {cardTransactionId: invoice.cardTransactionId}}">{{invoice.cardTransactionId}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(invoice)"
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
            <span slot="modal-title"><span id="sahatiApp.invoice.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-invoice-heading" v-text="$t('sahatiApp.invoice.delete.question', {'id': removeId})">Are you sure you want to delete this Invoice?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-invoice" v-text="$t('entity.action.delete')" v-on:click="removeInvoice()">Delete</button>
            </div>
        </b-modal>
        <div v-show="invoices && invoices.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice.component.ts">
</script>
