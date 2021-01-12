<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.employee.detail.title')">Employee</span> {{employee.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.employee.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{employee.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.employee.phone')">Phone</span>
                    </dt>
                    <dd>
                        <span>{{employee.phone}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.employee.identityNo')">Identity No</span>
                    </dt>
                    <dd>
                        <span>{{employee.identityNo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.employee.employeeStatus')">Employee Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('sahatiApp.EmployeeStatus.' + employee.employeeStatus)">{{employee.employeeStatus}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.employee.notes')">Notes</span>
                    </dt>
                    <dd>
                        <span>{{employee.notes}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.employee.company')">Company</span>
                    </dt>
                    <dd>
                        <div v-if="employee.companyId">
                            <router-link :to="{name: 'CompanyView', params: {companyId: employee.companyId}}">{{employee.companyNameAr}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="employee.id" :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
