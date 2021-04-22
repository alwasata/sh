<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form class="form-class"  name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.category.home.createOrEditLabel'>اضافة او تعديل الفئة</h2>
                <div>
                    <div class="form-group" v-if="category.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="category.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='category-nameAr'>الاسم بالعربية</label>
                        <input type="text" class="form-control" name="nameAr" id="category-nameAr"
                            :class="{'valid': !$v.category.nameAr.$invalid, 'invalid': $v.category.nameAr.$invalid }" v-model="$v.category.nameAr.$model"  required/>
                        <div v-if="$v.category.nameAr.$anyDirty && $v.category.nameAr.$invalid">
                            <small v-if='!$v.category.nameAr.required' class='form-text text-danger'>
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='category-nameEn'>الاسم بالانجليزية</label>
                        <input type="text" class="form-control" name="nameEn" id="category-nameEn"
                            :class="{'valid': !$v.category.nameEn.$invalid, 'invalid': $v.category.nameEn.$invalid }" v-model="$v.category.nameEn.$model" />
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.category.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./category-update.component.ts">
</script>
