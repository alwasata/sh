<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sahatiApp.employee.home.title')" id="employee-heading">Employees</span>
            <router-link :to="{name: 'EmployeeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-employee">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sahatiApp.employee.home.createLabel')">
                    Create a new Employee
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && employees && employees.length === 0">
            <span v-text="$t('sahatiApp.employee.home.notFound')">No employees found</span>
        </div>
        <div class="table-responsive" v-if="employees && employees.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('sahatiApp.employee.name')">Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('phone')"><span v-text="$t('sahatiApp.employee.phone')">Phone</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phone'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('identityNo')"><span v-text="$t('sahatiApp.employee.identityNo')">Identity No</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'identityNo'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('employeeStatus')"><span v-text="$t('sahatiApp.employee.employeeStatus')">Employee Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'employeeStatus'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('notes')"><span v-text="$t('sahatiApp.employee.notes')">Notes</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'notes'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('companyNameAr')"><span v-text="$t('sahatiApp.employee.company')">Company</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'companyNameAr'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee in employees"
                    :key="employee.id">
                    <td>
                        <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}">{{employee.id}}</router-link>
                    </td>
                    <td>{{employee.name}}</td>
                    <td>{{employee.phone}}</td>
                    <td>{{employee.identityNo}}</td>
                    <td v-text="$t('sahatiApp.EmployeeStatus.' + employee.employeeStatus)">{{employee.employeeStatus}}</td>
                    <td>{{employee.notes}}</td>
                    <td>
                        <div v-if="employee.companyId">
                            <router-link :to="{name: 'CompanyView', params: {companyId: employee.companyId}}">{{employee.companyNameAr}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(employee)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="sahatiApp.employee.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-employee-heading" v-text="$t('sahatiApp.employee.delete.question', {'id': removeId})">Are you sure you want to delete this Employee?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-employee" v-text="$t('entity.action.delete')" v-on:click="removeEmployee()">Delete</button>
            </div>
        </b-modal>
        <div v-show="employees && employees.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee.component.ts">
</script>
