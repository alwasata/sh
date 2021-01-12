<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="cardTransaction">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.cardTransaction.detail.title')">CardTransaction</span> {{cardTransaction.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.transactionNo')">Transaction No</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.transactionNo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.amount')">Amount</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.amount}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.pointsAmount')">Points Amount</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.pointsAmount}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.action')">Action</span>
                    </dt>
                    <dd>
                        <span v-text="$t('sahatiApp.TransactionAction.' + cardTransaction.action)">{{cardTransaction.action}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.notes')">Notes</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.notes}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.cardTransaction.card')">Card</span>
                    </dt>
                    <dd>
                        <div v-if="cardTransaction.cardId">
                            <router-link :to="{name: 'CardView', params: {cardId: cardTransaction.cardId}}">{{cardTransaction.cardCardNo}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="cardTransaction.id" :to="{name: 'CardTransactionEdit', params: {cardTransactionId: cardTransaction.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card-transaction-details.component.ts">
</script>
