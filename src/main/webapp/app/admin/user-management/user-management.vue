<template>
    <div>
        <h2>
            <span id='user-management-page-heading'>مسؤلين</span>
            <router-link tag='button' class='btn btn-primary float-left jh-create-entity'
                         :to="{name: 'JhiUserCreate'}">
                <font-awesome-icon icon='plus'></font-awesome-icon>
                <span>اضافة مسؤل</span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
                 dismissible
                 :variant="alertType"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
          {{alertMessage}}
        </b-alert>
        <div class="table-responsive" v-if="users">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('login')"><span>Login</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'login'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('email')"><span>البريد الالكتروني</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'email'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                    <th><span>Profiles</span></th>
                    <th v-on:click="changeOrder('createdDate')"><span>Created Date</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'createdDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('lastModifiedBy')"><span>Last Modified By</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'lastModifiedBy'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th id='modified-date-sort' v-on:click="changeOrder('lastModifiedDate')">
                        <span>Last Modified Date</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'lastModifiedDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody v-if ="users">
                    <tr v-for="user in users" :key="user.id" :id="user.login">
                        <td><router-link tag="a" :to="{name: 'JhiUserView', params: {userId: user.login}}">{{user.id}}</router-link></td>
                        <td>{{user.login}}</td>
                        <td class="jhi-user-email">{{user.email}}</td>
                        <td>
                            <button class='btn btn-danger btn-sm deactivated' v-on:click='setActive(user, true)'
                                    v-if='!user.activated'
                            >الحساب معطل
                            </button>
                            <button class='btn btn-success btn-sm' v-on:click='setActive(user, false)'
                                    v-if='user.activated'
                                    :disabled='username === user.login'>الحساب مفعل
                            </button>
                        </td>

                        <td>
                            <div v-for="authority of user.authorities" :key="authority">
                                <span class="badge badge-info">{{ authority }}</span>
                            </div>
                        </td>
                        <td>{{ user.createdDate | formatDate }}</td>
                        <td>{{user.lastModifiedBy}}</td>
                        <td>{{ user.lastModifiedDate | formatDate }}</td>
                        <td class="text-right">
                            <div class="btn-group">
                                <router-link :to="{name: 'JhiUserView', params: {userId: user.login}}" tag="button" class="btn btn-info btn-sm details">
                                    <font-awesome-icon icon="eye"></font-awesome-icon>
                                    <span class='d-none d-md-inline'>عرض</span>
                                </router-link>
                                <router-link :to="{name: 'JhiUserEdit', params: {userId: user.login}}"  tag="button" class="btn btn-primary btn-sm edit">
                                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                    <span class='d-none d-md-inline'>تعديل</span>
                                </router-link>
                                <!-- <b-button v-on:click="prepareRemove(user)"
                                       variant="danger"
                                       class="btn btn-sm delete"
                                       :disabled="username === user.login">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                    <span class='d-none d-md-inline'>حذف</span>
                                </b-button> -->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-modal id='removeUser' ref='removeUser' title='تاكيد عملية الحذف' @ok='deleteUser()'>
                <div class='modal-body'>
                    <p id='jhi-delete-user-heading'>هل انت متاكد من حذف user?</p>
                </div>
                <div slot='modal-footer'>
                    <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                    <button id='confirm-delete-user' class='btn btn-primary' type='button' v-on:click='deleteUser()'>
                        حذف
                    </button>
                </div>
            </b-modal>
        </div>
        <div v-show="users && users.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./user-management.component.ts">
</script>
