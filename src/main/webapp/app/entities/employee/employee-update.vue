<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.employee.home.createOrEditLabel'>اضافة او تعديل موظف</h2>
                <div class="alert alert-danger" id="alert-danger" role="alert" hidden>
                    {{ error }}
                </div>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-name'>الاسم الرباعي</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model" />
                        <div v-if="$v.employee.name.$anyDirty && $v.employee.name.$invalid">
                            <small v-if='!$v.employee.name.required' class='form-text text-danger'>
                                الاسم الرباعي اجباري
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-phone'>رقم الهاتف</label>
                        <input type="number" class="form-control" name="phone" id="employee-phone"
                            :class="{'valid': !$v.employee.phone.$invalid, 'invalid': $v.employee.phone.$invalid }" v-model="$v.employee.phone.$model" />
                        <div v-if="$v.employee.phone.$anyDirty && $v.employee.phone.$invalid">
                            <small v-if='!$v.employee.phone.required' class='form-text text-danger'>
                                رقم الهاتف اجباري
                            </small>
                            <small v-if='!$v.employee.phone.isPhone  && $v.employee.phone.required' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف اجباري
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-identityNo'>رقم الهوية</label>
                        <input type="text" class="form-control" name="identityNo" id="employee-identityNo"
                            :class="{'valid': !$v.employee.identityNo.$invalid, 'invalid': $v.employee.identityNo.$invalid }" v-model="$v.employee.identityNo.$model" />
                        <div v-if="$v.employee.identityNo.$anyDirty && $v.employee.identityNo.$invalid">
                            <small v-if='!$v.employee.identityNo.required' class='form-text text-danger'>
                                رقم الهوية اجباري
                            </small>
                        </div>
                    </div>
                    <!-- <div class="form-group" hidden>
                      <div v-if="employee.employeeStatus">
                        <label class='form-control-label' for='employee-employeeStatus'>حالة الموظف</label>
                        <select class='form-control' name='employeeStatus'
                                :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }"
                                 v-model='$v.employee.employeeStatus.$model' id='employee-employeeStatus'>
                            <option value='PENDING'>PENDING</option>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                      </div>
                      <div v-else>
                        <select class='form-control' name='employeeStatus'
                                :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }"
                                hidden id='employee-employeeStatus'>
                            <option  value='PENDING'>PENDING</option>
                            <option selected value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                      </div>
                    </div> -->
                    <div class="form-group">
                        <label class='form-control-label' for='employee-notes'>الملاحظات</label>
                        <input type="text" class="form-control" name="notes" id="employee-notes"
                            :class="{'valid': !$v.employee.notes.$invalid, 'invalid': $v.employee.notes.$invalid }" v-model="$v.employee.notes.$model" />
                    </div>
                    <div class='form-group' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <label class="typo__label">شركة</label>
                        <multiselect id='employee-company' v-model='employee.company' name='companies' :options="companies"  placeholder="Select one" label="nameAr" track-by="id"></multiselect>
                        <pre class="language-json"><code></code></pre>
                    </div>


                    <div class="form-group">
                        <label class='form-control-label' for='attatchment-file'></label>
                        <div>
                            <div v-if='attatchment.file' class='clearfix'>
                                <a class='pull-left'
                                   v-on:click='openFile(attatchment.fileContentType, attatchment.file)'> اضغط هنا لعرض المرفق</a><br>
                                <span
                                    class='pull-left'>{{ attatchment.fileContentType }}, {{ byteSize(attatchment.file.data) }}</span>
                                <button type='button'
                                        v-on:click='attatchment.file=null;attatchment.fileContentType=null;'
                                        class='btn btn-secondary btn-xs pull-right'>
                                    <font-awesome-icon icon='times'></font-awesome-icon>
                                </button>
                            </div>
                            <!-- <label for="file_file" class="btn btn-lg btn-success" >اختر صورة</label> -->
                            <input id='file_file' ref='file_file' type='file'
                                   v-on:change="setFileData($event, attatchment, 'file', false)"/>
                        </div>
                        <input type="hidden" class="form-control" name="file" id="attatchment-file"
                            :class="{'valid': !$v.attatchment.file.$invalid, 'invalid': $v.attatchment.file.$invalid }" v-model="$v.attatchment.file.$model" />
                        <input type="hidden" class="form-control" name="fileContentType" id="attatchment-fileContentType"
                            v-model="attatchment.fileContentType" />
                    </div>
                    <span id="error-file" class="text-danger"></span>
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
