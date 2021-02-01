<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="invoice">
                <h2 class='jh-entity-heading'><span>Invoice</span> {{ invoice.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Invoice No</span>
                    </dt>
                    <dd>
                        <span>{{invoice.invoiceNo}}</span>
                    </dd>
                    <dt>
                        <span>Invoice Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.invoiceDate}}</span>
                    </dd>
                    <dt>
                        <span>Pay Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.payDate}}</span>
                    </dd>
                    <dt>
                        <span>المجموع</span>
                    </dt>
                    <dd>
                        <span>{{invoice.total}}</span>
                    </dd>
                    <dt>
                        <span>Invoice حالة</span>
                    </dt>
                    <dd>
                        <span>{{ invoice.invoiceStatus }}</span>
                    </dd>
                    <dt>
                        <span>الملاحظات</span>
                    </dt>
                    <dd>
                        <span>{{invoice.notes}}</span>
                    </dd>
                    <dt>
                        <span>بطاقةTransaction</span>
                    </dt>
                    <dd>
                        <div v-if='invoice.cardTransaction'>
                            <router-link
                                :to="{name: 'CardTransactionView', params: {cardTransactionId: invoice.cardTransaction.id}}">
                                {{ invoice.cardTransaction.id }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='invoice.id' :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}" tag='button'
                             class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> تعديل</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-details.component.ts">
</script>
