<template>
    <div>
        <h2 id="page-heading">
            <span id='company-heading'>الشركات</span>
            <router-link :to="{name: 'CompanyCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-company">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة شركة
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
        <div class="alert alert-warning" v-if="!isFetching && companies && companies.length === 0">
            <span>No companies found</span>
        </div>
        <div class="table-responsive" v-if="companies && companies.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <!-- <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th> -->
                    <th v-on:click="changeOrder('nameAr')"><span>الاسم بالعربية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('nameEn')"><span>الاسم بالانجليزية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameEn'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('email')"><span>البريد الالكتروني</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'email'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('phone')"><span> رقم الهاتف الاساسي</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'phone'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('city')"><span>المدينة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'city'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('address')"><span>العنوان</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'address'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('activityType')"><span>نوع النشاط</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'activityType'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('jurisdiction')"><span>الاختصاص</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'jurisdiction'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('active')"><span>الحالة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'active'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('createdDate')"><span>اضافتها من قبل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'createdDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('createdDate')"><span>تعديلها من قبل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'createdDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('createdDate')"><span>تاريخ الانشاء</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'createdDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('createdDate')"><span>تاريخ التعديل</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'createdDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <!-- <th v-on:click="changeOrder('discount')"><span>Discount</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'discount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th> -->
                    <!-- <th v-on:click="changeOrder('fixedDiscount')"><span>Fixed Discount</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'fixedDiscount'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th> -->
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="company in companies"
                    :key="company.id">
                    <td> <router-link :to="{name: 'CompanyView', params: {companyId: company.id}}">{{company.nameAr}}</router-link></td>
                    <td>{{company.nameEn}}</td>
                    <td>{{company.email}}</td>
                    <td>{{company.phone}}</td>
                    <td>{{company.city}}</td>
                    <td>{{company.address}}</td>
                    <td>{{company.activityType == 'public' ? 'عام' : 'خاص ' }}</td>
                    <td>{{ company.jurisdiction}}</td>
                    <td :id="'company-active-' + company.id">
                        <button v-if="company.active == '1'" class="btn btn-danger btn-sm" v-on:click="prepareRemove(false ,company)">
                            تعطيل
                        </button>
                        <button v-if="company.active == '0'" class="btn btn-success btn-sm" v-on:click="prepareRemove(true ,company)">
                            تفعيل
                        </button>
                    </td>
                    <td>{{ company.createdBy.login}}</td>
                    <td>{{ company.lastModifiedBy ? company.lastModifiedBy.login : 'لا يوجد'}}</td>
                    <td>
                        {{ company.createdDate | formatDateOnly }}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{ company.createdDate | formatTimeOnly }}
                        </span>
                    </td>
                    <td>
                        {{company.lastModifiedDate | formatDateOnly}}
                        <span class="badge badge-pill badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        {{company.lastModifiedDate | formatTimeOnly}}
                        </span>
                    </td>
                    <!-- <td>{{company.discount}}</td>
                    <td>{{company.fixedDiscount}}</td> -->
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CompanyView', params: {companyId: company.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'CompanyEdit', params: {companyId: company.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <!-- <b-button v-on:click="prepareRemove(company)"
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
            <span slot='modal-title'><span id='sahatiApp.company.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-company-heading'>هل انت متاكد من حذف شركة?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-company' class='btn btn-primary' type='button'
                        v-on:click='removeCompany()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="companies && companies.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./company.component.ts">
</script>
