<template>
    <div>
        <h2 id="page-heading">
            <span id='employee-heading'>الموظفين</span>
            <router-link :to="{name: 'EmployeeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-employee">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة موظف
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
            <span>لا يوجد موظفين</span>
        </div>
        <div class="table-responsive" v-if="employees && employees.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <!-- <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th> -->
                    <th v-on:click="changeOrder('name')"><span>الاسم</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('phone')"><span>رقم الهاتف</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'phone'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('identityNo')"><span>رقم الهوية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'identityNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <!-- <th v-on:click="changeOrder('employeeStatus')"><span>حالة الموظف</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employeeStatus'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th> -->
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.nameAr')"><span>شركة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.nameAr')"><span>تم اضافتها عن طريق</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.nameAr')"><span>تم تعديلها عن طريق</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.nameAr')"><span>تاريخ الانشاء</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.nameAr')"><span>تاريخ التعديل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee in employees"
                    :key="employee.id">
                    <!-- <td>
                        <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}">{{employee.id}}</router-link>
                    </td> -->
                    <td>{{employee.name}}</td>
                    <td>{{employee.phone}}</td>
                    <td>{{employee.identityNo}}</td>
                    <!-- <td>{{ employee.employeeStatus }}</td> -->
                    <td>{{employee.notes}}</td>
                    <td>
                        <div v-if="hasAnyAuthority('ROLE_ADMIN')">
                            <router-link :to="{name: 'CompanyView', params: {companyId: employee.company.id}}">
                                {{ employee.company.nameAr }}
                            </router-link>
                        </div>
                        <div v-else>
                            {{ employee.company.nameAr }}
                        </div>
                    </td>
                    <td>{{employee.createdBy.login}}</td>
                    <td>{{ employee.lastModifiedBy ? employee.lastModifiedBy.login : 'لا يوجد'}}</td>
                    <td>
                        {{ employee.createdDate | formatDateOnly }}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{ employee.createdDate | formatTimeOnly }}
                        </span>
                    </td>
                    <td>
                        {{employee.lastModifiedDate | formatDateOnly}}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{employee.lastModifiedDate | formatTimeOnly}}
                        </span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <!-- <b-button v-on:click="prepareRemove(employee)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>حذف</span>
                            </b-button> -->
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span
                id='sahatiApp.employee.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-employee-heading'>هل انت متاكد من حذف موظف?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-employee' class='btn btn-primary' type='button'
                        v-on:click='removeEmployee()'>حذف
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
