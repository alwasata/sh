<template>
    <div>
        <h2 id="page-heading">
            <span id='hospital-heading'>Hospitals</span>
            <router-link :to="{name: 'HospitalCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-hospital">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة Hospital
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
        <div class="alert alert-warning" v-if="!isFetching && hospitals && hospitals.length === 0">
            <span>No hospitals found</span>
        </div>
        <div class="table-responsive" v-if="hospitals && hospitals.length > 0">
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
                    <th v-on:click="changeOrder('email')"><span>البريد الالكتروني</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'email'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('phone')"><span>رقم الهاتف</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'phone'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('address')"><span>العنوان</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'address'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="hospital in hospitals"
                    :key="hospital.id">
                    <td>
                        <router-link :to="{name: 'HospitalView', params: {hospitalId: hospital.id}}">{{hospital.id}}</router-link>
                    </td>
                    <td>{{hospital.nameAr}}</td>
                    <td>{{hospital.nameEn}}</td>
                    <td>{{hospital.email}}</td>
                    <td>{{hospital.phone}}</td>
                    <td>{{hospital.address}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: hospital.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'HospitalEdit', params: {hospitalId: hospital.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(hospital)"
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
            <span slot='modal-title'><span
                id='sahatiApp.hospital.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-hospital-heading'>هل انت متاكد من حذف المستشفى؟</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-hospital' class='btn btn-primary' type='button'
                        v-on:click='removeHospital()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="hospitals && hospitals.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./hospital.component.ts">
</script>
