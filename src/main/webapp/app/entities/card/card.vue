<template>
    <div>
        <h2 id="page-heading">
            <span id='card-heading'>البطاقات</span>
            <router-link :to="{name: 'CardCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-card">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة بطاقة جديدة
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
        <div class="col col-md-6">
        <input type="text" v-model="search" class="form-control" v-on:input="searchInput()" placeholder="البحث" >
        </div>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && cards && cards.length === 0">
            <span>لا يوجد بطاقات</span>
        </div>
        <div class="table-responsive" v-if="cards && cards.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('employee.name')"><span>الموظف</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th><span>رقم البطاقة</span>
                    </th>
                    <th v-on:click="changeOrder('expiryDate')"><span>تاريخ الانتهاء</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'expiryDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>مفعل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>تم اضافتها عن طريق</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>تم تعديلها عن طريق</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>تاريخ الانشاء</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>تاريخ التعديل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="card in cards"
                    :key="card.id">
                    <td>
                        <div v-if='card.employee'>
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: card.employee.id}}">
                                {{ card.employee.name }}
                            </router-link>
                        </div>
                    </td>
                    <td>{{card.cardNo}}</td>
                    <td>{{card.expiryDate}}</td>
                    <td>
                        <span  :class="card.isActive == true ? 'badge badge-pill badge-success' : 'badge badge-pill badge-danger'">
                        {{ card.isActive == true ? "مفعل" : "معطل" }}
                        </span>
                    </td>
                    <td>{{card.createdBy.login}}</td>
                    <td>{{ card.lastModifiedBy ? card.lastModifiedBy.login : 'لا يوجد'}}</td>
                    <td>
                        {{card.createdDate | formatDateOnly}}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{card.createdDate | formatTimeOnly}}
                        </span>
                    </td>
                    <td>
                        {{card.lastModifiedDate | formatDateOnly}}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{card.lastModifiedDate | formatTimeOnly}}
                        </span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link v-if="hasRole(['ROLE_ADMIN'])" :to="{name: 'CardCharge', params: {cardId: card.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="plus"></font-awesome-icon>
                                <span class='d-none d-md-inline'>شحن</span>
                            </router-link>
                            <router-link :to="{name: 'CardTransactions', params: {cardId: card.id}}"  tag="button" class="btn btn-success btn-sm edit">
                                <font-awesome-icon icon="bars"></font-awesome-icon>
                                <span class='d-none d-md-inline'>حركات البطاقة</span>
                            </router-link>
                            <router-link :to="{name: 'CardView', params: {cardId: card.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link v-if="hasRole(['ROLE_ADMIN'])"  :to="{name: 'CardEdit', params: {cardId: card.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <!-- <b-button v-on:click="prepareRemove(card)"
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
            <span slot='modal-title'><span id='sahatiApp.card.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-card-heading'>هل انت متاكد من حذف Card?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-card' class='btn btn-primary' type='button' v-on:click='removeCard()'>
                    حذف
                </button>
            </div>
        </b-modal>
        <div v-show="cards && cards.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card.component.ts">
</script>
