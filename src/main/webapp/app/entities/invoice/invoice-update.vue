<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.invoice.home.createOrEditLabel'>Create or edit a Invoice</h2>
                <div>
                    <div class="form-group" v-if="invoice.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="invoice.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-invoiceNo'>Invoice No</label>
                        <input type="text" class="form-control" name="invoiceNo" id="invoice-invoiceNo"
                            :class="{'valid': !$v.invoice.invoiceNo.$invalid, 'invalid': $v.invoice.invoiceNo.$invalid }" v-model="$v.invoice.invoiceNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-invoiceDate'>Invoice Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="invoice-invoiceDate"
                                    v-model="$v.invoice.invoiceDate.$model"
                                    name="invoiceDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="invoice-invoiceDate" type="text" class="form-control" name="invoiceDate"  :class="{'valid': !$v.invoice.invoiceDate.$invalid, 'invalid': $v.invoice.invoiceDate.$invalid }"
                            v-model="$v.invoice.invoiceDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-payDate'>Pay Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="invoice-payDate"
                                    v-model="$v.invoice.payDate.$model"
                                    name="payDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="invoice-payDate" type="text" class="form-control" name="payDate"  :class="{'valid': !$v.invoice.payDate.$invalid, 'invalid': $v.invoice.payDate.$invalid }"
                            v-model="$v.invoice.payDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-total'>Total</label>
                        <input type="number" class="form-control" name="total" id="invoice-total"
                            :class="{'valid': !$v.invoice.total.$invalid, 'invalid': $v.invoice.total.$invalid }" v-model.number="$v.invoice.total.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-invoiceStatus'>Invoice Status</label>
                        <select class='form-control' name='invoiceStatus'
                                :class="{'valid': !$v.invoice.invoiceStatus.$invalid, 'invalid': $v.invoice.invoiceStatus.$invalid }"
                                v-model='$v.invoice.invoiceStatus.$model' id='invoice-invoiceStatus'>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-notes'>Notes</label>
                        <input type="text" class="form-control" name="notes" id="invoice-notes"
                            :class="{'valid': !$v.invoice.notes.$invalid, 'invalid': $v.invoice.notes.$invalid }" v-model="$v.invoice.notes.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='invoice-cardTransaction'>Card Transaction</label>
                        <select id='invoice-cardTransaction' v-model='invoice.cardTransaction' class='form-control'
                                name='cardTransaction'>
                            <option v-bind:value='null'></option>
                            <option v-for='cardTransactionOption in cardTransactions' :key='cardTransactionOption.id'
                                    v-bind:value='invoice.cardTransaction && cardTransactionOption.id === invoice.cardTransaction.id ? invoice.cardTransaction : cardTransactionOption'>
                                {{ cardTransactionOption.id }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.invoice.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./invoice-update.component.ts">
</script>
