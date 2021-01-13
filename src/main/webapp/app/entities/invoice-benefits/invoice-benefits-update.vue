<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.invoiceBenefits.home.createOrEditLabel'>Create or edit a InvoiceBenefits</h2>
                <div>
                    <div class="form-group" v-if="invoiceBenefits.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="invoiceBenefits.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-benefits-pointsCost'>Points Cost</label>
                        <input type="number" class="form-control" name="pointsCost" id="invoice-benefits-pointsCost"
                            :class="{'valid': !$v.invoiceBenefits.pointsCost.$invalid, 'invalid': $v.invoiceBenefits.pointsCost.$invalid }" v-model.number="$v.invoiceBenefits.pointsCost.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-benefits-cost'>Cost</label>
                        <input type="number" class="form-control" name="cost" id="invoice-benefits-cost"
                            :class="{'valid': !$v.invoiceBenefits.cost.$invalid, 'invalid': $v.invoiceBenefits.cost.$invalid }" v-model.number="$v.invoiceBenefits.cost.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-benefits-quantity'>Quantity</label>
                        <input type="number" class="form-control" name="quantity" id="invoice-benefits-quantity"
                            :class="{'valid': !$v.invoiceBenefits.quantity.$invalid, 'invalid': $v.invoiceBenefits.quantity.$invalid }" v-model.number="$v.invoiceBenefits.quantity.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='invoice-benefits-total'>Total</label>
                        <input type="number" class="form-control" name="total" id="invoice-benefits-total"
                            :class="{'valid': !$v.invoiceBenefits.total.$invalid, 'invalid': $v.invoiceBenefits.total.$invalid }" v-model.number="$v.invoiceBenefits.total.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='invoice-benefits-benefit'>Benefit</label>
                        <select id='invoice-benefits-benefit' v-model='invoiceBenefits.benefit' class='form-control'
                                name='benefit'>
                            <option v-bind:value='null'></option>
                            <option v-for='benefitOption in benefits' :key='benefitOption.id'
                                    v-bind:value='invoiceBenefits.benefit && benefitOption.id === invoiceBenefits.benefit.id ? invoiceBenefits.benefit : benefitOption'>
                                {{ benefitOption.nameAr }}
                            </option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='invoice-benefits-invoice'>Invoice</label>
                        <select id='invoice-benefits-invoice' v-model='invoiceBenefits.invoice' class='form-control'
                                name='invoice'>
                            <option v-bind:value='null'></option>
                            <option v-for='invoiceOption in invoices' :key='invoiceOption.id'
                                    v-bind:value='invoiceBenefits.invoice && invoiceOption.id === invoiceBenefits.invoice.id ? invoiceBenefits.invoice : invoiceOption'>
                                {{ invoiceOption.invoiceNo }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.invoiceBenefits.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./invoice-benefits-update.component.ts">
</script>
