<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.company.home.createOrEditLabel'>اضافة او تعديل شركة</h2>
                <div class="alert alert-danger" id="alert-danger" role="alert" hidden>
                    {{ error }}
                </div>
                <div>
                    <!-- <div class="form-group" v-if="company.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="company.id" readonly />
                    </div> -->
                    <div class="form-group">
                        <label class='form-control-label' for='company-nameAr'>الاسم بالعربية</label>
                        <input type="text" class="form-control" name="nameAr" id="company-nameAr"  pattern="[\u0600-\u06FF\u0750-\u077F]" data-error="Must be alphanumberic"
                            :class="{'valid': !$v.company.nameAr.$invalid, 'invalid': $v.company.nameAr.$invalid }" v-model="$v.company.nameAr.$model"  required/>
                        <div v-if="$v.company.nameAr.$anyDirty && $v.company.nameAr.$invalid">
                            <small v-if='!$v.company.nameAr.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.company.nameAr.isArabic && $v.company.nameAr.required' class='form-text text-danger'>
                                يجب ان يكون الاسم العربي باللغة العربية
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-nameEn'>الاسم بالانجليزية</label>
                        <input type="text" class="form-control" name="nameEn" id="company-nameEn"
                            :class="{'valid': !$v.company.nameEn.$invalid, 'invalid': $v.company.nameEn.$invalid }" v-model="$v.company.nameEn.$model" />
                        <div v-if="$v.company.nameEn.$anyDirty && $v.company.nameEn.$invalid">
                            <small v-if='!$v.company.nameEn.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.company.nameEn.isArabic && $v.company.nameEn.required' class='form-text text-danger'>
                                يجب ان يكون الاسم العربي باللغة العربية
                        </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-email'>البريد الالكتروني</label>
                        <input type="text" class="form-control" name="email" id="company-email"
                            :class="{'valid': !$v.company.email.$invalid, 'invalid': $v.company.email.$invalid }" v-model="$v.company.email.$model" />
                        <div v-if="$v.company.email.$anyDirty && $v.company.email.$invalid">
                            <small v-if='!$v.company.email.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.company.email.isArabic && $v.company.email.required' class='form-text text-danger'>
                                يجب ان يكون البريد الالكتروني صحيحا
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-activityType'>اختر نوع النشاط</label>
                        <select class='form-control' name='activityType'
                                :class="{'valid': !$v.company.activityType.$model, 'invalid': $v.company.activityType.$model }"
                                 id='company-activityType'>
                            <option :selected="$v.company.activityType.$model == 'public'" value='public'>public</option>
                            <option :selected="$v.company.activityType.$model == 'private'" value='private'>private</option>
                        </select>
                        <div v-if="$v.company.activityType.$anyDirty && $v.company.activityType.$invalid">
                            <small v-if='!$v.company.activityType.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-jurisdiction'>تحديد الاختصاص</label>
                         <input type="text" class="form-control" placeholder="اذا كان عام كتابة اد ما كان وزارة هيئة او بلدية او مراقبة او .. غيرها" name="jurisdiction" id="company-jurisdiction"
                            :class="{'valid': !$v.company.jurisdiction.$invalid, 'invalid': $v.company.jurisdiction.$invalid }" v-model="$v.company.jurisdiction.$model" />
                        <div v-if="$v.company.jurisdiction.$anyDirty && $v.company.jurisdiction.$invalid">
                            <small v-if='!$v.company.jurisdiction.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-phone'>رقم الهاتف</label>
                        <input type="text" class="form-control" name="phone" id="company-phone"
                            :class="{'valid': !$v.company.phone.$invalid, 'invalid': $v.company.phone.$invalid }" v-model="$v.company.phone.$model" />
                        <div v-if="$v.company.phone.$anyDirty && $v.company.phone.$invalid">
                            <small v-if='!$v.company.phone.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.company.phone.isPhoneNo && $v.company.phone.required' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-phoneSecond'>رقم الهاتف البديل 2</label>
                        <input type="text" class="form-control" name="phoneSecond" id="company-phoneSecond"
                            :class="{'valid': !$v.company.phoneSecond.$invalid, 'invalid': $v.company.phoneSecond.$invalid }" v-model="$v.company.phoneSecond.$model" />
                        <div v-if="$v.company.phoneSecond.$anyDirty && $v.company.phoneSecond.$invalid">
                            <small v-if='!$v.company.phoneSecond.isPhoneNo' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-phoneThird'>رقم الهاتف البديل 3</label>
                        <input type="text" class="form-control" name="phoneThird" id="company-phoneThird"
                            :class="{'valid': !$v.company.phoneThird.$invalid, 'invalid': $v.company.phoneThird.$invalid }" v-model="$v.company.phoneThird.$model" />
                        <div v-if="$v.company.phoneThird.$anyDirty && $v.company.phoneThird.$invalid">
                            <small v-if='!$v.company.phoneThird.isPhoneNo' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-city'>المدينة</label>
                        <input type="text" class="form-control" name="city" id="company-city" placeholder="طرابلس , بنغازي ,الخمس , سرت ... غيرها"
                            :class="{'valid': !$v.company.city.$invalid, 'invalid': $v.company.city.$invalid }" v-model="$v.company.city.$model" />
                        <div v-if="$v.company.city.$anyDirty && $v.company.city.$invalid">
                            <small v-if='!$v.company.city.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-address'>العنوان</label>
                        <input type="text" class="form-control" name="address" id="company-address"
                            :class="{'valid': !$v.company.address.$invalid, 'invalid': $v.company.address.$invalid }" v-model="$v.company.address.$model" />
                        <div v-if="$v.company.address.$anyDirty && $v.company.address.$invalid">
                            <small v-if='!$v.company.address.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-lng'>خط العرض</label>
                        <input type="text" class="form-control" name="lng" id="company-lng"
                            :class="{'valid': !$v.company.lng.$invalid, 'invalid': $v.company.lng.$invalid }" v-model="$v.company.lng.$model" />
                        <div v-if="$v.company.lng.$anyDirty && $v.company.lng.$invalid">
                            <small v-if='!$v.company.lng.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='company-lat'>خط الطول</label>
                        <input type="text" class="form-control" name="lat" id="company-lat"
                            :class="{'valid': !$v.company.lat.$invalid, 'invalid': $v.company.lat.$invalid }" v-model="$v.company.lat.$model" />
                        <div v-if="$v.company.lat.$anyDirty && $v.company.lat.$invalid">
                            <small v-if='!$v.company.lat.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.company.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./company-update.component.ts">
</script>
