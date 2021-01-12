<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.card.home.createOrEditLabel" v-text="$t('sahatiApp.card.home.createOrEditLabel')">Create or edit a Card</h2>
                <div>
                    <div class="form-group" v-if="card.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="card.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.card.cardNo')" for="card-cardNo">Card No</label>
                        <input type="text" class="form-control" name="cardNo" id="card-cardNo"
                            :class="{'valid': !$v.card.cardNo.$invalid, 'invalid': $v.card.cardNo.$invalid }" v-model="$v.card.cardNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.card.expiryDate')" for="card-expiryDate">Expiry Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="card-expiryDate"
                                    v-model="$v.card.expiryDate.$model"
                                    name="expiryDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="card-expiryDate" type="text" class="form-control" name="expiryDate"  :class="{'valid': !$v.card.expiryDate.$invalid, 'invalid': $v.card.expiryDate.$invalid }"
                            v-model="$v.card.expiryDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.card.isActive')" for="card-isActive">Is Active</label>
                        <input type="checkbox" class="form-check" name="isActive" id="card-isActive"
                            :class="{'valid': !$v.card.isActive.$invalid, 'invalid': $v.card.isActive.$invalid }" v-model="$v.card.isActive.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.card.employee')" for="card-employee">Employee</label>
                        <select class="form-control" id="card-employee" name="employee" v-model="card.employeeId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="employeeOption.id" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.card.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./card-update.component.ts">
</script>
