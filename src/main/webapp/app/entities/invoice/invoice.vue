<template>
    <div>
        <h2 id="page-heading">
            <span id='invoice-heading'>Invoices</span>
            <router-link :to="{name: 'InvoiceCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-invoice">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة Invoice
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
            <span>No invoices found</span>
        </div>
        <div class="table-responsive" v-if="invoices && invoices.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoiceNo')"><span>Invoice No</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoiceDate')"><span>Invoice Date</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('payDate')"><span>Pay Date</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'payDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('total')"><span>المجموع</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'total'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoiceStatus')"><span>Invoice حالة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceStatus'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('cardTransaction.id')"><span>بطاقةTransaction</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cardTransaction.id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
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
                    <td>{{ invoice.invoiceStatus }}</td>
                    <td>{{invoice.notes}}</td>
                    <td>
                        <div v-if='invoice.cardTransaction'>
                            <router-link
                                :to="{name: 'CardTransactionView', params: {cardTransactionId: invoice.cardTransaction.id}}">
                                {{ invoice.cardTransaction.id }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(invoice)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>حذف</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span id='sahatiApp.invoice.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-invoice-heading'>هل انت متاكد من حذف Invoice?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-invoice' class='btn btn-primary' type='button'
                        v-on:click='removeInvoice()'>حذف
                </button>
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
