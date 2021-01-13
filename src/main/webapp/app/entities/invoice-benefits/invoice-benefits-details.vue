<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="invoiceBenefits">
                <h2 class='jh-entity-heading'><span>InvoiceBenefits</span> {{ invoiceBenefits.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Points Cost</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span>Cost</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.cost}}</span>
                    </dd>
                    <dt>
                        <span>Quantity</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.quantity}}</span>
                    </dd>
                    <dt>
                        <span>Total</span>
                    </dt>
                    <dd>
                        <span>{{invoiceBenefits.total}}</span>
                    </dd>
                    <dt>
                        <span>Benefit</span>
                    </dt>
                    <dd>
                        <div v-if='invoiceBenefits.benefit'>
                            <router-link :to="{name: 'BenefitView', params: {benefitId: invoiceBenefits.benefit.id}}">
                                {{ invoiceBenefits.benefit.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Invoice</span>
                    </dt>
                    <dd>
                        <div v-if='invoiceBenefits.invoice'>
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoiceBenefits.invoice.id}}">
                                {{ invoiceBenefits.invoice.invoiceNo }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='invoiceBenefits.id'
                             :to="{name: 'InvoiceBenefitsEdit', params: {invoiceBenefitsId: invoiceBenefits.id}}"
                             tag='button' class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-benefits-details.component.ts">
</script>
