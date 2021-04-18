<template>
    <div>
        <h2 id="page-heading">
            <span id='category-heading'>الفئات</span>
            <router-link :to="{name: 'CategoryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-left jh-create-entity create-category">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    اضافة فئة
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
        <div class="alert alert-warning" v-if="!isFetching && categories && categories.length === 0">
            <span>No categories found</span>
        </div>
        <div class="table-responsive" v-if="categories && categories.length > 0">
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories"
                    :key="category.id">
                    <td>
                        <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}">{{category.id}}</router-link>
                    </td>
                    <td>{{category.nameAr}}</td>
                    <td>{{category.nameEn}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'CategoryEdit', params: {categoryId: category.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                            <!-- <b-button v-on:click="prepareRemove(category)"
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
                id='sahatiApp.category.delete.question'>تاكيد عملية الحذف</span></span>
            <div class="modal-body">
                <p id='jhi-delete-category-heading'>هل انت متاكد من حذف فئة?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-category' class='btn btn-primary' type='button'
                        v-on:click='removeCategory()'>حذف
                </button>
            </div>
        </b-modal>
        <div v-show="categories && categories.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./category.component.ts">
</script>
