<template>
    <div class='row justify-content-center'>
        <div class='col-8'>
            <form name='editForm' novalidate role='form' v-on:submit.prevent='save()'>
                <h2 id='sahatiApp.setting.home.createOrEditLabel'>اضافة او تعديل الفئة</h2>
                <div>
                    <div v-if='setting.id' class='form-group'>
                        <label for='id'>ID</label>
                        <input id='id' v-model='setting.id' class='form-control' name='id'
                               readonly type='text' />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='setting-key'>الاسم بالعربية</label>
                        <input id='setting-key' v-model='$v.setting.key.$model'
                               :class="{'valid': !$v.setting.key.$invalid, 'invalid': $v.setting.key.$invalid }"
                               class='form-control'
                               name='key' required type='text' />
                        <div v-if='$v.setting.key.$anyDirty && $v.setting.key.$invalid'>
                            <small v-if='!$v.setting.key.required' class='form-text text-danger'>
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='setting-value'>الاسم بالانجليزية</label>
                        <input id='setting-value' v-model='$v.setting.value.$model'
                               :class="{'valid': !$v.setting.value.$invalid, 'invalid': $v.setting.value.$invalid }"
                               class='form-control'
                               name='value' type='text' />
                    </div>
                </div>
                <div>
                    <button id='cancel-save' class='btn btn-secondary' type='button' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button id='save-entity' :disabled='$v.setting.$invalid || isSaving' class='btn btn-primary'
                            type='submit'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang='ts' src='./setting-update.component.ts'>
</script>
