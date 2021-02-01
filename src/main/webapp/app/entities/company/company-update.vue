<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.company.home.createOrEditLabel'>اضافة او تعديل شركة</h2>
                <div>
                    <div class="form-group" v-if="company.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="company.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-nameAr'>الاسم بالعربية</label>
                        <input type="text" class="form-control" name="nameAr" id="company-nameAr"
                            :class="{'valid': !$v.company.nameAr.$invalid, 'invalid': $v.company.nameAr.$invalid }" v-model="$v.company.nameAr.$model"  required/>
                        <div v-if="$v.company.nameAr.$anyDirty && $v.company.nameAr.$invalid">
                            <small v-if='!$v.company.nameAr.required' class='form-text text-danger'>
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-nameEn'>الاسم بالانجليزية</label>
                        <input type="text" class="form-control" name="nameEn" id="company-nameEn"
                            :class="{'valid': !$v.company.nameEn.$invalid, 'invalid': $v.company.nameEn.$invalid }" v-model="$v.company.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-email'>البريد الالكتروني</label>
                        <input type="text" class="form-control" name="email" id="company-email"
                            :class="{'valid': !$v.company.email.$invalid, 'invalid': $v.company.email.$invalid }" v-model="$v.company.email.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-phone'>رقم الهاتف</label>
                        <input type="text" class="form-control" name="phone" id="company-phone"
                            :class="{'valid': !$v.company.phone.$invalid, 'invalid': $v.company.phone.$invalid }" v-model="$v.company.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='company-address'>العنوان</label>
                        <input type="text" class="form-control" name="address" id="company-address"
                            :class="{'valid': !$v.company.address.$invalid, 'invalid': $v.company.address.$invalid }" v-model="$v.company.address.$model" />
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
