<template>
    <div>
        <h2 id="page-heading">
            <span id='employee-heading'>Employees</span>
            <router-link :to="{name: 'EmployeeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-employee">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
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
            <span>No employees found</span>
        </div>
        <div class="table-responsive" v-if="employees && employees.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('name')"><span>Name</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('phone')"><span>Phone</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'phone'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('identityNo')"><span>Identity No</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'identityNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employeeStatus')"><span>Employee Status</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employeeStatus'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>Notes</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('company.nameAr')"><span>Company</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'company.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
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
                    <td>{{ employee.employeeStatus }}</td>
                    <td>{{employee.notes}}</td>
                    <td>
                        <div v-if='employee.company'>
                            <router-link :to="{name: 'CompanyView', params: {companyId: employee.company.id}}">
                                {{ employee.company.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>View</span>
                            </router-link>
                            <router-link :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(employee)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span
                id='sahatiApp.employee.delete.question'>Confirm delete operation</span></span>
            <div class="modal-body">
                <p id='jhi-delete-employee-heading'>Are you sure you want to delete this Employee?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>Cancel</button>
                <button id='jhi-confirm-delete-employee' class='btn btn-primary' type='button'
                        v-on:click='removeEmployee()'>Delete
                </button>
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
