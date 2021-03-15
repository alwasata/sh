<template>
    <div>
        <h2 id="page-heading">
            <span id='benefit-request-heading'>طلب منفعة</span>
            <!-- <router-link :to="{name: 'BenefitRequestCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-benefit-request">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة طلب منفعة
                </span>
            </router-link> -->
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && benefitRequests && benefitRequests.length === 0">
            <span>لا يوجد طلبات منعة</span>
        </div>
        <div class="table-responsive" v-if="benefitRequests && benefitRequests.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('nameAr')"><span>الاسم بالعربية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('nameEn')"><span>الاسم بالانجليزية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameEn'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <!-- <th v-on:click="changeOrder('pointsCost')"><span>النقاط</span> -->
                        <!-- <jhi-sort-indicator :current-order='propOrder' :field-name="'pointsCost'" -->
                                            <!-- :reverse='reverse'></jhi-sort-indicator> -->
                    <!-- </th> -->
                    <th v-on:click="changeOrder('cost')"><span>القيمة المالية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cost'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('benefitStatus')"><span>حالة المنفعة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'benefitStatus'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('notes')"><span>الملاحظات</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'notes'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('category.nameAr')"><span>الفئة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'category.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('hospital.nameAr')"><span>المستشفى</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'hospital.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('benefit.nameAr')"><span>المنفعة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'benefit.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="benefitRequest in benefitRequests"
                    :key="benefitRequest.id">
                    <td>
                        <router-link :to="{name: 'BenefitRequestView', params: {benefitRequestId: benefitRequest.id}}">{{benefitRequest.id}}</router-link>
                    </td>
                    <td>{{benefitRequest.nameAr}}</td>
                    <td>{{benefitRequest.nameEn}}</td>
                    <!-- <td>{{benefitRequest.pointsCost}}</td> -->
                    <td>{{benefitRequest.cost}}</td>
                    <td>{{ benefitRequest.benefitStatus }}</td>
                    <td>{{benefitRequest.notes}}</td>
                    <td>
                        <div v-if='benefitRequest.category'>
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefitRequest.category.id}}">
                                {{ benefitRequest.category.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if='benefitRequest.hospital'>
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefitRequest.hospital.id}}">
                                {{ benefitRequest.hospital.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if='benefitRequest.benefit'>
                            <router-link :to="{name: 'BenefitView', params: {benefitId: benefitRequest.benefit.id}}">
                                {{ benefitRequest.benefit.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BenefitRequestView', params: {benefitRequestId: benefitRequest.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link v-if="benefitRequest.benefitStatus == 'PENDING'" :to="{name: 'BenefitRequestEdit', params: {benefitRequestId: benefitRequest.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-if="benefitRequest.benefitStatus == 'PENDING'" v-on:click="prepareRemove(benefitRequest)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>حذف</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span id='sahatiApp.benefitRequest.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-benefitRequest-heading'>هل انت متاكد من حذف Benefit Request?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-benefitRequest' class='btn btn-primary' type='button'
                        v-on:click='removeBenefitRequest()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="benefitRequests && benefitRequests.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-request.component.ts">
</script>
