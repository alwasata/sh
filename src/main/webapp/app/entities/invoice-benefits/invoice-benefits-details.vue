<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="invoiceBenefits">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.invoiceBenefits.detail.title')">InvoiceBenefits</span> {{invoiceBenefits.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.pointsCost')">Points Cost</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.cost')">Cost</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.cost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.quantity')">Quantity</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.quantity}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.total')">Total</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.total}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.benefit')">Benefit</span>
                    </dt>
                    <dd>
                        <div v-if="invoiceBenefits.benefitId">
                            <router-link :to="{name: 'BenefitView', params: {benefitId: invoiceBenefits.benefitId}}">{{invoiceBenefits.benefitNameAr}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.invoiceBenefits.invoice')">Invoice</span>
                    </dt>
                    <dd>
                        <div v-if="invoiceBenefits.invoiceId">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoiceBenefits.invoiceId}}">{{invoiceBenefits.invoiceInvoiceNo}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="invoiceBenefits.id" :to="{name: 'InvoiceBenefitsEdit', params: {invoiceBenefitsId: invoiceBenefits.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-benefits-details.component.ts">
</script>
