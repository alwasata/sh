<template>
    <div>
        <h2 id="page-heading">
            <span id='invoice-benefits-heading'>Invoice Benefits</span>
            <router-link :to="{name: 'InvoiceBenefitsCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-invoice-benefits">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة Invoice Benefits
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
            <span>No invoiceBenefits found</span>
        </div>
        <div class="table-responsive" v-if="invoiceBenefits && invoiceBenefits.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('pointsCost')"><span>النقاط</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'pointsCost'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('cost')"><span>القيمة المالية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cost'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('quantity')"><span>الكمية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'quantity'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('total')"><span>المجموع</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'total'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('benefit.nameAr')"><span>المنفعة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'benefit.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoice.invoiceNo')"><span>Invoice</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoice.invoiceNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
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
                        <div v-if='invoiceBenefits.benefit'>
                            <router-link :to="{name: 'BenefitView', params: {benefitId: invoiceBenefits.benefit.id}}">
                                {{ invoiceBenefits.benefit.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if='invoiceBenefits.invoice'>
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoiceBenefits.invoice.id}}">
                                {{ invoiceBenefits.invoice.invoiceNo }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InvoiceBenefitsView', params: {invoiceBenefitsId: invoiceBenefits.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'InvoiceBenefitsEdit', params: {invoiceBenefitsId: invoiceBenefits.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(invoiceBenefits)"
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
            <span slot='modal-title'><span
                id='sahatiApp.invoiceBenefits.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-invoiceBenefits-heading'>هل انت متاكد من حذف Invoice Benefits?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-invoiceBenefits' class='btn btn-primary' type='button'
                        v-on:click='removeInvoiceBenefits()'>حذف
                </button>
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
