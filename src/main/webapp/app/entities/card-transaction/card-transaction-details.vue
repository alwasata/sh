<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="cardTransaction">
                <h2 class='jh-entity-heading'><span>CardTransaction</span> {{ cardTransaction.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Transaction No</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.transactionNo}}</span>
                    </dd>
                    <dt>
                        <span>Amount</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.amount}}</span>
                    </dd>
                    <dt>
                        <span>Points Amount</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.pointsAmount}}</span>
                    </dd>
                    <dt>
                        <span>Action</span>
                    </dt>
                    <dd>
                        <span>{{ cardTransaction.action }}</span>
                    </dd>
                    <dt>
                        <span>Notes</span>
                    </dt>
                    <dd>
                        <span>{{cardTransaction.notes}}</span>
                    </dd>
                    <dt>
                        <span>Card</span>
                    </dt>
                    <dd>
                        <div v-if='cardTransaction.card'>
                            <router-link :to="{name: 'CardView', params: {cardId: cardTransaction.card.id}}">
                                {{ cardTransaction.card.cardNo }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='cardTransaction.id'
                             :to="{name: 'CardTransactionEdit', params: {cardTransactionId: cardTransaction.id}}"
                             tag='button' class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card-transaction-details.component.ts">
</script>
