<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form class="form-class" name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.benefit.home.createOrEditLabel'>اضافة منفعة</h2>
                <div class="alert alert-danger" id="alert-danger" role="alert" hidden>
                    {{ error }}
                </div>
                <div>
                    <div class="form-group" v-if="benefit.id">
                        <!-- <label for='id'>ID</label> -->
                        <input type="hidden" class="form-control" id="id" name="id"
                               v-model="benefit.id" readonly  />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-nameAr'>الاسم بالعربية</label>
                        <input type="text" class="form-control" name="nameAr" id="benefit-nameAr"
                            :class="{'valid': !$v.benefit.nameAr.$invalid, 'invalid': $v.benefit.nameAr.$invalid }" v-model="$v.benefit.nameAr.$model"  required/>
                        <div v-if="$v.benefit.nameAr.$anyDirty && $v.benefit.nameAr.$invalid">
                            <small v-if='!$v.benefit.nameAr.required ' class='form-text text-danger'>
                                يجب ادخال الاسم
                            </small>
                            <small v-if='!$v.benefit.nameAr.arabicAr && $v.benefit.nameAr.required' class='form-text text-danger'>
                                يجب ان يكون الاسم بالغة العربية
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-nameEn'> الاسم بالانجليزية</label>
                        <input type="text" class="form-control" name="nameEn" id="benefit-nameEn"
                            :class="{'valid': !$v.benefit.nameEn.$invalid, 'invalid': $v.benefit.nameEn.$invalid }" v-model="$v.benefit.nameEn.$model" />
                        <div v-if="$v.benefit.nameEn.$anyDirty && $v.benefit.nameEn.$invalid">
                            <small v-if='!$v.benefit.nameEn.required ' class='form-text text-danger'>
                                يجب ادخال الاسم
                            </small>
                            <small v-if='!$v.benefit.nameEn.arabicAr  && $v.benefit.nameEn.required' class='form-text text-danger'>
                                يجب ان يكون الاسم بالغة الانجليزية
                            </small>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                        <label class='form-control-label' for='benefit-pointsCost'>النقاط</label>
                        <input type="number" class="form-control" name="pointsCost" id="benefit-pointsCost"
                            :class="{'valid': !$v.benefit.pointsCost.$invalid, 'invalid': $v.benefit.pointsCost.$invalid }" v-model.number="$v.benefit.pointsCost.$model" />
                    </div> -->
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-cost'>المبلغ المالي</label>
                        <input type="number" class="form-control" name="cost" id="benefit-cost"
                            :class="{'valid': !$v.benefit.cost.$invalid, 'invalid': $v.benefit.cost.$invalid }" v-model.number="$v.benefit.cost.$model" />
                    </div>
                    <div class='form-group'>
                        <label class="typo__label">الفئة</label>
                        
                        <!-- <multiselect id='benefit-category' v-model='benefit.category' name='category' :options="categories"  placeholder="Select one" label="nameAr" track-by="id"></multiselect> -->
                        <pre class="language-json"><code></code></pre>
                    </div>
                    <div class='form-group' v-if="isUpdate == true">
                        <label class='form-control-label' for='benefit-hospital'>المستشفى</label>
                        <select id='benefit-hospital'  class='form-control' name='hospital'>
                            <option v-bind:value='benefit.hospital.id'>{{benefit.hospital.nameAr}}</option>
                        </select>
                    </div>
                    <div v-else>
                    <div class='form-group' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <label class="typo__label">اختر المستشفى</label>
                        <multiselect id='benefit-hospital' v-model='benefit.hospital' name='hospital' :options="hospitals"  placeholder="Select one" label="nameAr" track-by="id"></multiselect>
                        <pre class="language-json"><code></code></pre>
                    </div>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' 
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>تعديل</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./benefit-update.component.ts">
</script>
