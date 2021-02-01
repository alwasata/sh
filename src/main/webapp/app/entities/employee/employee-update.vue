<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.employee.home.createOrEditLabel'>اضافة او تعديل موظف</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-name'>الاسم</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-phone'>رقم الهاتف</label>
                        <input type="text" class="form-control" name="phone" id="employee-phone"
                            :class="{'valid': !$v.employee.phone.$invalid, 'invalid': $v.employee.phone.$invalid }" v-model="$v.employee.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-identityNo'>رقم الهوية</label>
                        <input type="text" class="form-control" name="identityNo" id="employee-identityNo"
                            :class="{'valid': !$v.employee.identityNo.$invalid, 'invalid': $v.employee.identityNo.$invalid }" v-model="$v.employee.identityNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-employeeStatus'>الموظف حالة</label>
                        <select class='form-control' name='employeeStatus'
                                :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }"
                                v-model='$v.employee.employeeStatus.$model' id='employee-employeeStatus'>
                            <option value='PENDING'>PENDING</option>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-notes'>الملاحظات</label>
                        <input type="text" class="form-control" name="notes" id="employee-notes"
                            :class="{'valid': !$v.employee.notes.$invalid, 'invalid': $v.employee.notes.$invalid }" v-model="$v.employee.notes.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='employee-company'>شركة</label>
                        <select id='employee-company' v-model='employee.company' class='form-control' name='company'>
                            <option v-bind:value='null'></option>
                            <option v-for='companyOption in companies' :key='companyOption.id'
                                    v-bind:value='employee.company && companyOption.id === employee.company.id ? employee.company : companyOption'>
                                {{ companyOption.nameAr }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.employee.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
