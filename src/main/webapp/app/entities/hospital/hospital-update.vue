<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.hospital.home.createOrEditLabel'>اضافة او تعديل المستشفى</h2>
                <div class="alert alert-danger" id="alert-danger" role="alert" hidden>
                    {{ error }}
                </div>
                <div>
                    <div class="form-group" v-if="hospital.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="hospital.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-nameAr'>الاسم بالعربية</label>
                        <input type="text" class="form-control" name="nameAr" id="hospital-nameAr"  pattern="[\u0600-\u06FF\u0750-\u077F]" data-error="Must be alphanumberic"
                            :class="{'valid': !$v.hospital.nameAr.$invalid, 'invalid': $v.hospital.nameAr.$invalid }" v-model="$v.hospital.nameAr.$model"  required/>
                        <div v-if="$v.hospital.nameAr.$anyDirty && $v.hospital.nameAr.$invalid">
                            <small v-if='!$v.hospital.nameAr.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.hospital.nameAr.isArabic && $v.hospital.nameAr.required' class='form-text text-danger'>
                                يجب ان يكون الاسم العربي باللغة العربية
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-nameEn'>الاسم بالانجليزية</label>
                        <input type="text" class="form-control" name="nameEn" id="hospital-nameEn"
                            :class="{'valid': !$v.hospital.nameEn.$invalid, 'invalid': $v.hospital.nameEn.$invalid }" v-model="$v.hospital.nameEn.$model" />
                        <div v-if="$v.hospital.nameEn.$anyDirty && $v.hospital.nameEn.$invalid">
                            <small v-if='!$v.hospital.nameEn.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.hospital.nameEn.isArabic && $v.hospital.nameEn.required' class='form-text text-danger'>
                                يجب ان يكون الاسم العربي باللغة العربية
                        </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-address'>النوع</label>
                        <select class="form-control"  v-model='hospital.type'>
                            <option value="المصحات">
                                المصحات
                            </option>
                            <option value="العيادات">
                                العيادات
                            </option>
                            <option value="المستشفيات">
                                المستشفيات
                            </option>
                            <option value="مختبر">
                                مختبر
                            </option>
                            <option value="مركز">
                                مركز
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-notes'> تخصص العيادة</label>
                        <input placeholder="مثال : قلب - عظام - علاج طبيعي - غيرها ..."
                             type="text" class="form-control" name="notes" id="hospital-notes"
                            :class="{'valid': !$v.hospital.notes.$invalid, 'invalid': $v.hospital.notes.$invalid }" v-model="$v.hospital.notes.$model" />
                        <div v-if="$v.hospital.notes.$anyDirty && $v.hospital.notes.$invalid">
                            <small v-if='!$v.hospital.notes.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-email'>البريد الالكتروني</label>
                        <input type="text" class="form-control" name="email" id="hospital-email"
                            :class="{'valid': !$v.hospital.email.$invalid, 'invalid': $v.hospital.email.$invalid }" v-model="$v.hospital.email.$model" />
                        <div v-if="$v.hospital.email.$anyDirty && $v.hospital.email.$invalid">
                            <small v-if='!$v.hospital.email.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.hospital.email.isArabic && $v.hospital.email.required' class='form-text text-danger'>
                                يجب ان يكون البريد الالكتروني صحيحا
                            </small>
                        </div>
                    </div>
                     <div class="form-group">
                        <label class='form-control-label' for='hospital-phone'>رقم الهاتف</label>
                        <input type="text" class="form-control" name="phone" id="hospital-phone"
                            :class="{'valid': !$v.hospital.phone.$invalid, 'invalid': $v.hospital.phone.$invalid }" v-model="$v.hospital.phone.$model" />
                        <div v-if="$v.hospital.phone.$anyDirty && $v.hospital.phone.$invalid">
                            <small v-if='!$v.hospital.phone.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                            <small v-if='!$v.hospital.phone.isPhoneNo && $v.hospital.phone.required' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-phoneSecond'>رقم الهاتف البديل 2</label>
                        <input type="text" class="form-control" name="phoneSecond" id="hospital-phoneSecond"
                            :class="{'valid': !$v.hospital.phoneSecond.$invalid, 'invalid': $v.hospital.phoneSecond.$invalid }" v-model="$v.hospital.phoneSecond.$model" />
                        <div v-if="$v.hospital.phoneSecond.$anyDirty && $v.hospital.phoneSecond.$invalid">
                            <small v-if='!$v.hospital.phoneSecond.isPhoneNo' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='hospital-phoneThird'>رقم الهاتف البديل 3</label>
                        <input type="text" class="form-control" name="phoneThird" id="hospital-phoneThird"
                            :class="{'valid': !$v.hospital.phoneThird.$invalid, 'invalid': $v.hospital.phoneThird.$invalid }" v-model="$v.hospital.phoneThird.$model" />
                        <div v-if="$v.hospital.phoneThird.$anyDirty && $v.hospital.phoneThird.$invalid">
                            <small v-if='!$v.hospital.phoneThird.isPhoneNo' class='form-text text-danger'>
                                يجب ان يكون رقم الهاتف صحيحا
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='hospital-city'>المدينة</label>
                        <input type="text" class="form-control" name="city" id="hospital-city" placeholder="طرابلس , بنغازي ,الخمس , سرت ... غيرها"
                            :class="{'valid': !$v.hospital.city.$invalid, 'invalid': $v.hospital.city.$invalid }" v-model="$v.hospital.city.$model" />
                        <div v-if="$v.hospital.city.$anyDirty && $v.hospital.city.$invalid">
                            <small v-if='!$v.hospital.city.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='hospital-address'>العنوان</label>
                        <input type="text" class="form-control" name="address" id="hospital-address"
                            :class="{'valid': !$v.hospital.address.$invalid, 'invalid': $v.hospital.address.$invalid }" v-model="$v.hospital.address.$model" />
                        <div v-if="$v.hospital.address.$anyDirty && $v.hospital.address.$invalid">
                            <small v-if='!$v.hospital.address.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='hospital-lng'>خط العرض</label>
                        <input type="text" class="form-control" name="lng" id="hospital-lng"
                            :class="{'valid': !$v.hospital.lng.$invalid, 'invalid': $v.hospital.lng.$invalid }" v-model="$v.hospital.lng.$model" />
                        <div v-if="$v.hospital.lng.$anyDirty && $v.hospital.lng.$invalid">
                            <small v-if='!$v.hospital.lng.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='form-control-label' for='hospital-lat'>خط الطول</label>
                        <input type="text" class="form-control" name="lat" id="hospital-lat"
                            :class="{'valid': !$v.hospital.lat.$invalid, 'invalid': $v.hospital.lat.$invalid }" v-model="$v.hospital.lat.$model" />
                        <div v-if="$v.hospital.lat.$anyDirty && $v.hospital.lat.$invalid">
                            <small v-if='!$v.hospital.lat.required' class='form-text text-danger'>
                                يجب ان لا يترك فارغا.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="alert alert-danger" id="error" role="alert" hidden>
                            rtgtr
                        </div>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.hospital.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./hospital-update.component.ts">
</script>
