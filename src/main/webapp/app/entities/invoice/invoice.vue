<template>
    <div>
        <h2 id="page-heading">
            <span id='invoice-heading'>الفواتير</span>
            <router-link v-if="hasRole(['ROLE_HOSPITAL_ADMIN'])" :to="{name: 'InvoiceCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-invoice">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة فاتورة
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
        <div class="col col-md-6">
        <input type="text" v-model="search" class="form-control" v-on:input="searchInput()" placeholder="البحث" >
        </div>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && invoices && invoices.length === 0">
            <span>No invoices found</span>
        </div>
        <div class="table-responsive" v-if="invoices && invoices.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>المستشفى</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoiceNo')"><span>رقم الفاتورة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th>
                        <span>نوع الفاتورة</span>
                    </th>
                    <th v-on:click="changeOrder('invoiceStatus')"><span>حالة الفاتورة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceStatus'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('invoiceDate')"><span>تاريخ الفاتورة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'invoiceDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('payDate')"><span>تاريخ الدفع</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'payDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('total')"><span>المجموع</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'total'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('cardTransaction.id')"><span> رقم البطاقة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cardTransaction.id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="invoice in invoices"
                    :key="invoice.id">
                    <td>{{invoice.hospital.nameAr}}</td>
                    <td>{{invoice.invoiceNo}}</td>
                    <td>
                        <span v-if="invoice.mainInvoice">
                             فاتورة مرجعة من {{ invoice.mainInvoice.invoiceNo }}
                        </span>
                        <span v-else>
                            فاتورة صادرة
                        </span>
                    </td>
                    <td :id="'invoice-state-' + invoice.id">
                        <span v-if="invoice.invoiceStatus == 'APPROVED'" class="btn btn-success btn-sm">
                            صادرة
                        </span>
                        <span v-if="invoice.invoiceStatus == 'CANCELLED'" class="btn btn-danger btn-sm">
                            تم الغائها
                        </span>
                        <span v-if="invoice.invoiceStatus == 'RETURNED'" class="btn btn-warning btn-sm">
                            مرتجع
                        </span>
                    </td>
                    <td>{{invoice.notes}}</td>
                    <td>{{invoice.invoiceDate}}</td>
                    <td>{{invoice.payDate}}</td>
                    <td>{{invoice.total}}</td>
                    <td>
                        <div v-if='invoice.cardTransaction'>
                            <router-link
                                :to="{name: 'CardTransactionView', params: {cardTransactionId: invoice.cardTransaction.id}}">
                                {{ invoice.cardTransaction.card.cardNo }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                        <div class="btn-group" v-if="hasRole(['ROLE_HOSPITAL_ADMIN'])" >
                            <router-link v-if="invoice.invoiceStatus == 'APPROVED'" :to="{name: 'InvoiceReturn', params: {invoiceId: invoice.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>ارجاع</span>
                            </router-link>
                        </div>
                        <div v-if="invoice.invoiceStatus == 'APPROVED' && hasRole(['ROLE_HOSPITAL_ADMIN'])"  class="btn-group" :id="'invoice-delete-' + invoice.id">
                           <b-button v-on:click="prepareRemove(invoice)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>الغاء</span>
                            </b-button>
                        </div>
                        </div>
                        <br>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span id='sahatiApp.invoice.delete.question'>تاكيد عملية الالغاء</span></span>
            <div class="modal-body">
                <p id='jhi-delete-invoice-heading'>هل انت متاكد من الغاء الفاتورة?</p>

                 <div class="btn-group text-danger" :id="'invoice-error'">

                </div>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-invoiceBenefits' class='btn btn-primary' type='button'
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
