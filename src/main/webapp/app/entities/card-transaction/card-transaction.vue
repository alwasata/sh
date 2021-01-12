<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.cardTransaction.home.title')" id="card-transaction-heading">Card Transactions</span>
            <router-link :to="{name: 'CardTransactionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-card-transaction">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.cardTransaction.home.createLabel')">
                    Create a new Card Transaction
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
            <span v-text="$t('sahatiApp.cardTransaction.home.notFound')">No cardTransactions found</span>
        </div>
        <div class="table-responsive" v-if="cardTransactions && cardTransactions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('transactionNo')"><span v-text="$t('sahatiApp.cardTransaction.transactionNo')">Transaction No</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'transactionNo'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('amount')"><span v-text="$t('sahatiApp.cardTransaction.amount')">Amount</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('pointsAmount')"><span v-text="$t('sahatiApp.cardTransaction.pointsAmount')">Points Amount</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'pointsAmount'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('action')"><span v-text="$t('sahatiApp.cardTransaction.action')">Action</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'action'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('notes')"><span v-text="$t('sahatiApp.cardTransaction.notes')">Notes</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'notes'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('cardCardNo')"><span v-text="$t('sahatiApp.cardTransaction.card')">Card</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cardCardNo'"></jhi-sort-indicator></th>
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
                    <td v-text="$t('sahatiApp.TransactionAction.' + cardTransaction.action)">{{cardTransaction.action}}</td>
                    <td>{{cardTransaction.notes}}</td>
                    <td>
                        <div v-if="cardTransaction.cardId">
                            <router-link :to="{name: 'CardView', params: {cardId: cardTransaction.cardId}}">{{cardTransaction.cardCardNo}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CardTransactionView', params: {cardTransactionId: cardTransaction.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CardTransactionEdit', params: {cardTransactionId: cardTransaction.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(cardTransaction)"
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
            <span slot="modal-title"><span id="sahatiApp.cardTransaction.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-cardTransaction-heading" v-text="$t('sahatiApp.cardTransaction.delete.question', {'id': removeId})">Are you sure you want to delete this Card Transaction?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-cardTransaction" v-text="$t('entity.action.delete')" v-on:click="removeCardTransaction()">Delete</button>
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
