<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="invoice">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.invoice.detail.title')">Invoice</span> {{invoice.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.invoiceNo')">Invoice No</span>
                    </dt>
                    <dd>
                        <span>{{invoice.invoiceNo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.invoiceDate')">Invoice Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.invoiceDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.payDate')">Pay Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.payDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.total')">Total</span>
                    </dt>
                    <dd>
                        <span>{{invoice.total}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.invoiceStatus')">Invoice Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('sahatiApp.InvoiceStatus.' + invoice.invoiceStatus)">{{invoice.invoiceStatus}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.notes')">Notes</span>
                    </dt>
                    <dd>
                        <span>{{invoice.notes}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoice.cardTransaction')">Card Transaction</span>
                    </dt>
                    <dd>
                        <div v-if="invoice.cardTransactionId">
                            <router-link :to="{name: 'CardTransactionView', params: {cardTransactionId: invoice.cardTransactionId}}">{{invoice.cardTransactionId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="invoice.id" :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-details.component.ts">
</script>
