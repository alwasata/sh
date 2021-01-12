<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.employee.home.createOrEditLabel" v-text="$t('sahatiApp.employee.home.createOrEditLabel')">Create or edit a Employee</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.name')" for="employee-name">Name</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.phone')" for="employee-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="employee-phone"
                            :class="{'valid': !$v.employee.phone.$invalid, 'invalid': $v.employee.phone.$invalid }" v-model="$v.employee.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.identityNo')" for="employee-identityNo">Identity No</label>
                        <input type="text" class="form-control" name="identityNo" id="employee-identityNo"
                            :class="{'valid': !$v.employee.identityNo.$invalid, 'invalid': $v.employee.identityNo.$invalid }" v-model="$v.employee.identityNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.employeeStatus')" for="employee-employeeStatus">Employee Status</label>
                        <select class="form-control" name="employeeStatus" :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }" v-model="$v.employee.employeeStatus.$model" id="employee-employeeStatus" >
                            <option value="PENDING" v-bind:label="$t('sahatiApp.EmployeeStatus.PENDING')">PENDING</option>
                            <option value="APPROVED" v-bind:label="$t('sahatiApp.EmployeeStatus.APPROVED')">APPROVED</option>
                            <option value="REFUSED" v-bind:label="$t('sahatiApp.EmployeeStatus.REFUSED')">REFUSED</option>
                            <option value="CANCELLED" v-bind:label="$t('sahatiApp.EmployeeStatus.CANCELLED')">CANCELLED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.notes')" for="employee-notes">Notes</label>
                        <input type="text" class="form-control" name="notes" id="employee-notes"
                            :class="{'valid': !$v.employee.notes.$invalid, 'invalid': $v.employee.notes.$invalid }" v-model="$v.employee.notes.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.employee.company')" for="employee-company">Company</label>
                        <select class="form-control" id="employee-company" name="company" v-model="employee.companyId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="companyOption.id" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.nameAr}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.employee.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
