<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.cardTransaction.home.createOrEditLabel" v-text="$t('sahatiApp.cardTransaction.home.createOrEditLabel')">Create or edit a CardTransaction</h2>
                <div>
                    <div class="form-group" v-if="cardTransaction.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="cardTransaction.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.transactionNo')" for="card-transaction-transactionNo">Transaction No</label>
                        <input type="text" class="form-control" name="transactionNo" id="card-transaction-transactionNo"
                            :class="{'valid': !$v.cardTransaction.transactionNo.$invalid, 'invalid': $v.cardTransaction.transactionNo.$invalid }" v-model="$v.cardTransaction.transactionNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.amount')" for="card-transaction-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="card-transaction-amount"
                            :class="{'valid': !$v.cardTransaction.amount.$invalid, 'invalid': $v.cardTransaction.amount.$invalid }" v-model.number="$v.cardTransaction.amount.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.pointsAmount')" for="card-transaction-pointsAmount">Points Amount</label>
                        <input type="number" class="form-control" name="pointsAmount" id="card-transaction-pointsAmount"
                            :class="{'valid': !$v.cardTransaction.pointsAmount.$invalid, 'invalid': $v.cardTransaction.pointsAmount.$invalid }" v-model.number="$v.cardTransaction.pointsAmount.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.action')" for="card-transaction-action">Action</label>
                        <select class="form-control" name="action" :class="{'valid': !$v.cardTransaction.action.$invalid, 'invalid': $v.cardTransaction.action.$invalid }" v-model="$v.cardTransaction.action.$model" id="card-transaction-action" >
                            <option value="PLUS" v-bind:label="$t('sahatiApp.TransactionAction.PLUS')">PLUS</option>
                            <option value="MINUS" v-bind:label="$t('sahatiApp.TransactionAction.MINUS')">MINUS</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.notes')" for="card-transaction-notes">Notes</label>
                        <input type="text" class="form-control" name="notes" id="card-transaction-notes"
                            :class="{'valid': !$v.cardTransaction.notes.$invalid, 'invalid': $v.cardTransaction.notes.$invalid }" v-model="$v.cardTransaction.notes.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.cardTransaction.card')" for="card-transaction-card">Card</label>
                        <select class="form-control" id="card-transaction-card" name="card" v-model="cardTransaction.cardId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="cardOption.id" v-for="cardOption in cards" :key="cardOption.id">{{cardOption.cardNo}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.cardTransaction.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./card-transaction-update.component.ts">
</script>
