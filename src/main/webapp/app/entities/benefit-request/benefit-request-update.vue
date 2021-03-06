<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.benefitRequest.home.createOrEditLabel'>اضافة او تعديل طلب منفعة</h2>
                <div>
                    <div class="form-group" v-if="benefitRequest.id">
                        <label for='id'>ID</label>
                        <input disabled type="text" class="form-control" id="id" name="id"
                               v-model="benefitRequest.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-request-nameAr'>الاسم بالعربية</label>
                        <input disabled type="text" class="form-control" name="nameAr" id="benefit-request-nameAr"
                            :class="{'valid': !$v.benefitRequest.nameAr.$invalid, 'invalid': $v.benefitRequest.nameAr.$invalid }" v-model="$v.benefitRequest.nameAr.$model"  required/>
                        <div v-if="$v.benefitRequest.nameAr.$anyDirty && $v.benefitRequest.nameAr.$invalid">
                            <small v-if='!$v.benefitRequest.nameAr.required' class='form-text text-danger'>
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-request-nameEn'>الاسم بالانجليزية</label>
                        <input disabled type="text" class="form-control" name="nameEn" id="benefit-request-nameEn"
                            :class="{'valid': !$v.benefitRequest.nameEn.$invalid, 'invalid': $v.benefitRequest.nameEn.$invalid }" v-model="$v.benefitRequest.nameEn.$model" />
                    </div>
                    <!-- <div class="form-group">
                        <label class='form-control-label' for='benefit-request-pointsCost'>النقاط</label>
                        <input disabled type="number" class="form-control" name="pointsCost" id="benefit-request-pointsCost"
                            :class="{'valid': !$v.benefitRequest.pointsCost.$invalid, 'invalid': $v.benefitRequest.pointsCost.$invalid }" v-model.number="$v.benefitRequest.pointsCost.$model" />
                    </div> -->
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-request-cost'>القيمة المالية</label>
                        <input disabled type="number" class="form-control" name="cost" id="benefit-request-cost"
                            :class="{'valid': !$v.benefitRequest.cost.$invalid, 'invalid': $v.benefitRequest.cost.$invalid }" v-model.number="$v.benefitRequest.cost.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-request-benefitStatus'>حالة المنفعة</label>
                        <select class='form-control' name='benefitStatus'
                                :class="{'valid': !$v.benefitRequest.benefitStatus.$invalid, 'invalid': $v.benefitRequest.benefitStatus.$invalid }"
                                v-model='$v.benefitRequest.benefitStatus.$model' id='benefit-request-benefitStatus'>
                            <option value='PENDING'>PENDING</option>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-request-notes'>الملاحظات</label>
                        <input disabled type="text" class="form-control" name="notes" id="benefit-request-notes"
                            :class="{'valid': !$v.benefitRequest.notes.$invalid, 'invalid': $v.benefitRequest.notes.$invalid }" v-model="$v.benefitRequest.notes.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='benefit-request-category'>الفئة</label>
                        <select disabled id='benefit-request-category' v-model='benefitRequest.category' class='form-control'
                                name='category'>
                            <option v-bind:value='null'></option>
                            <option v-for='categoryOption in categories' :key='categoryOption.id'
                                    v-bind:value='benefitRequest.category && categoryOption.id === benefitRequest.category.id ? benefitRequest.category : categoryOption'>
                                {{ categoryOption.nameAr }}
                            </option>
                        </select>
                    </div>
                    <div class='form-group' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <label class='form-control-label' for='benefit-request-hospital'>المستشفى</label>
                        <select disabled id='benefit-request-hospital' v-model='benefitRequest.hospital' class='form-control'
                                name='hospital'>
                            <option v-bind:value='null'></option>
                            <option v-for='hospitalOption in hospitals' :key='hospitalOption.id'
                                    v-bind:value='benefitRequest.hospital && hospitalOption.id === benefitRequest.hospital.id ? benefitRequest.hospital : hospitalOption'>
                                {{ hospitalOption.nameAr }}
                            </option>
                        </select>
                    </div>
                    <!-- <div class='form-group'>
                        <label class='form-control-label' for='benefit-request-benefit'>المنفعة</label>
                        <select id='benefit-request-benefit' v-model='benefitRequest.benefit' class='form-control'
                                name='benefit'>
                            <option v-bind:value='null'></option>
                            <option v-for='benefitOption in benefits' :key='benefitOption.id'
                                    v-bind:value='benefitRequest.benefit && benefitOption.id === benefitRequest.benefit.id ? benefitRequest.benefit : benefitOption'>
                                {{ benefitOption.nameAr }}
                            </option>
                        </select>
                    </div> -->
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.benefitRequest.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./benefit-request-update.component.ts">
</script>
