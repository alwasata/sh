<template>
    <div>
        <h2 id="page-heading">
            <span id='card-transaction-heading'>تتبع حركة البطاقة</span>
            <router-link :to="{name: 'CardTransactionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-card-transaction">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة بطاقةTransaction
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
        <div class="alert alert-warning" v-if="!isFetching && cardTransactions && cardTransactions.length === 0">
            <span>لا يوجد بيانات</span>
        </div>
        <div class="table-responsive" v-if="cardTransactions && cardTransactions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('transactionNo')"><span>الحركة No</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'transactionNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('amount')"><span>Amount</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'amount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('pointsAmount')"><span>Points Amount</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'pointsAmount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('action')"><span>Action</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'action'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('card.cardNo')"><span>Card</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'card.cardNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cardTransaction in cardTransactions"
                    :key="cardTransaction.id">
                    <td>
                        <router-link :to="{name: 'CardTransactionView', params: {cardTransactionId: cardTransaction.id}}">{{cardTransaction.id}}</router-link>
                    </td>
                    <td>{{cardTransaction.transactionNo}}</td>
                    <td>{{cardTransaction.amount}}</td>
                    <td>{{cardTransaction.pointsAmount}}</td>
                    <td>{{ cardTransaction.action }}</td>
                    <td>{{cardTransaction.notes}}</td>
                    <td>
                        <div v-if='cardTransaction.card'>
                            <router-link :to="{name: 'CardView', params: {cardId: cardTransaction.card.id}}">
                                {{ cardTransaction.card.cardNo }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CardTransactionView', params: {cardTransactionId: cardTransaction.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'CardTransactionEdit', params: {cardTransactionId: cardTransaction.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(cardTransaction)"
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

<script lang="ts" src="./card-transaction.component.ts">
</script>
