<template>
    <div>
        <h2 id="page-heading">
            <span id='benefit-heading'>المنفعات</span>
            <router-link :to="{name: 'BenefitCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-benefit">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة منفعة
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
        <div class="alert alert-warning" v-if="!isFetching && benefits && benefits.length === 0">
            <span>لا يوجد منفعات</span>
        </div>
        <div class="table-responsive" v-if="benefits && benefits.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>رقم المنفعة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('nameAr')"><span>الاسم بالعربية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('nameEn')"><span>الاسم باللانجليزية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'nameEn'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('pointsCost')"><span>النقاط</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'pointsCost'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('cost')"><span>القيمة المالية</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cost'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('category.nameAr')"><span>التصنيف</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'category.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('hospital.nameAr')"><span>المستشفى</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'hospital.nameAr'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="benefit in benefits"
                    :key="benefit.id">
                    <td>
                        <router-link :to="{name: 'BenefitView', params: {benefitId: benefit.id}}">{{benefit.id}}</router-link>
                    </td>
                    <td>{{benefit.nameAr}}</td>
                    <td>{{benefit.nameEn}}</td>
                    <td>{{benefit.cost*1.1}}</td>
                    <td>{{benefit.cost}}</td>
                    <td>
                        <div v-if='benefit.category'>
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefit.category.id}}">
                                {{ benefit.category.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if='benefit.hospital'>
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefit.hospital.id}}">
                                {{ benefit.hospital.nameAr }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BenefitView', params: {benefitId: benefit.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'BenefitEdit', params: {benefitId: benefit.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(benefit)"
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
            <span slot='modal-title'><span id='sahatiApp.benefit.delete.question'> تاكيد عملية الحذف </span></span>
            <div class="modal-body">
                <p id='jhi-delete-benefit-heading' v-bind:style="{ 'text-align' : 'right'}">هل انت متاكد من حذف هذه المنفعة</p>
            </div>
            <div slot='modal-footer'>
                <button  class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-benefit' class='btn btn-primary' type='button'
                        v-on:click='removeBenefit()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="benefits && benefits.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit.component.ts">
</script>
