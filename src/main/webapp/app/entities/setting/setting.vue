<template>
    <div>
        <h2 id='page-heading'>
            <span id='setting-heading'>الوحدة</span>
        </h2>
        <b-alert :show='dismissCountDown'
                 :variant='alertType'
                 dismissible
                 @dismissed='dismissCountDown=0'
                 @dismiss-count-down='countDownChanged'>
            {{ alertMessage }}
        </b-alert>
        <br />
        <div v-if='!isFetching && settings && settings.length === 0' class='alert alert-warning'>
            <span>No settings found</span>
        </div>
        <div v-if='settings && settings.length > 0' class='table-responsive'>
            <table class='table table-striped'>
                <thead>
                <tr>
                    <th v-on:click="changeOrder('key')"><span>الاسم</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'key'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('value')"><span>القيمة</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'value'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th>دينار</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='setting in settings'
                    :key='setting.id'>
                    <td>النقط</td>
                    <td>{{ setting.value }} نقطة</td>
                    <td> 1 د.ل</td>
                    <td class='text-right'>
                        <div class='btn-group'>
                            <router-link :to="{name: 'SettingView', params: {settingId: setting.id}}"
                                         class='btn btn-info btn-sm details' tag='button'>
                                <font-awesome-icon icon='eye'></font-awesome-icon>
                                <span class='d-none d-md-inline'>عرض</span>
                            </router-link>
                            <router-link :to="{name: 'SettingEdit', params: {settingId: setting.id}}"
                                         class='btn btn-primary btn-sm edit' tag='button'>
                                <font-awesome-icon icon='pencil-alt'></font-awesome-icon>
                                <span class='d-none d-md-inline'>تعديل</span>
                            </router-link>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal id='removeEntity' ref='removeEntity'>
            <span slot='modal-title'><span
                id='sahatiApp.setting.delete.question'>تاكيد عملية الحذف</span></span>
            <div class='modal-body'>
                <p id='jhi-delete-setting-heading'>هل انت متاكد من حذف فئة?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>الغاء</button>
                <button id='jhi-confirm-delete-setting' class='btn btn-primary' type='button'
                        v-on:click='removeSetting()'>حذف
                </button>
            </div>
        </b-modal>
    </div>
</template>

<script lang='ts' src='./setting.component.ts'>
</script>
