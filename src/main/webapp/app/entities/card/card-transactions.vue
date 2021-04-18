<template>
    <div>
        <h2 id="page-heading">
            <span id='card-transaction-heading'> تتبع حركة البطاقة رقم :  {{ card.cardNo}}</span>
            <router-link :to="{name: 'Card'}" tag="button" id="jh-create-entity" class="btn btn-danger float-left jh-create-entity create-card-transaction">
                <span>
                   رجوع
                </span>
                <font-awesome-icon icon="arrow-left"></font-awesome-icon>
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
        <div class="alert alert-warning" v-if="!isFetching && cardTransactions && cardTransactions.length === 0">
            <span>لا يوجد بيانات</span>
        </div>
        <div class="table-responsive" v-if="cardTransactions && cardTransactions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('card.cardNo')"><span>رقم البطاقة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'card.cardNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('action')"><span> الحركة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'action'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('amount')"><span>سعر</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'amount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('amount')"><span>الذي قام بالحركة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'amount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('amount')"><span>تاريخ الانشاء</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'amount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cardTransaction in cardTransactions"
                    :key="cardTransaction.id">
                    <td>
                        <div v-if='cardTransaction.card'>
                            <router-link :to="{name: 'CardView', params: {cardId: cardTransaction.card.id}}">
                                {{ cardTransaction.card.cardNo }}
                            </router-link>
                        </div>
                    </td>
                    <td class="font-weight-bold">
                        <span v-if="cardTransaction.action == 'PLUS'" class="text-success">
                            زيادة
                        </span>
                        <span v-else class="text-danger">
                            نقصان
                        </span>
                    </td>
                    <td>{{cardTransaction.notes}}</td>
                    <td>{{cardTransaction.amount}}</td>
                    <td>{{cardTransaction.createdBy.login}}</td>
                    <td>
                        {{cardTransaction.createdDate | formatDateOnly}}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{cardTransaction.createdDate | formatTimeOnly}}
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span
                id='sahatiApp.cardTransaction.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-cardTransaction-heading'>هل انت متاكد من حذف بطاقةTransaction?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-cardTransaction' class='btn btn-primary' type='button'
                        v-on:click='removeCardTransaction()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="cardTransactions && cardTransactions.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card-transactions.component.ts">
</script>
