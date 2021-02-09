<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8 toastify-container">
                <h2 v-if='account' id='password-title'><span>كلمة المرور لحساب  [<b>{{ username }}</b>]</span></h2>

                <div v-if='success' class='alert alert-success' role='alert'>
                    <strong>تم تغير كلمة المرور!</strong>
                </div>
                <div v-if='error' class='alert alert-danger' role='alert'>
                    <strong>حدث خطاء!</strong> لا يمكن تغير كلمة المرور.
                </div>

                <div v-if='doNotMatch' class='alert alert-danger' role='alert'>
                    تاكيد كلمة المرور يجب ان يكون مطابق للرقم السري
                </div>

                <form name="form" role="form" id="password-form" v-on:submit.prevent="changePassword()">

                    <div class="form-group">
                        <label class='form-control-label' for='currentPassword'>كلمة المرور الحالي</label>
                        <input type="password" class="form-control" id="currentPassword" name="currentPassword"
                               :class="{'valid': !$v.resetPassword.currentPassword.$invalid, 'invalid': $v.resetPassword.currentPassword.$invalid }"

                               v-model="$v.resetPassword.currentPassword.$model" required>
                        <div v-if="$v.resetPassword.currentPassword.$anyDirty && $v.resetPassword.currentPassword.$invalid">
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.currentPassword.required'>
                                كلمة المرور اجباري.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='newPassword'>كلمة المرور الجديد</label>
                        <input type="password" class="form-control" id="newPassword" name="newPassword"

                               :class="{'valid': !$v.resetPassword.newPassword.$invalid, 'invalid': $v.resetPassword.newPassword.$invalid }"
                               v-model="$v.resetPassword.newPassword.$model" minlength=4 maxlength=50 required>
                        <div v-if="$v.resetPassword.newPassword.$anyDirty && $v.resetPassword.newPassword.$invalid">
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.newPassword.required'>
                                كلمة المرور اجباري.
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.newPassword.minLength'>
                                يجب ان يكون كلمة المرور على الاقل 4 احرف.
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.newPassword.maxLength'>
                                لا يمكن ان يكون كلمة المرور اطول من 50.
                            </small>
                        </div>
                        <!--<jhi-password-strength-bar [passwordToCheck]="newPassword"></jhi-password-strength-bar>-->
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='confirmPassword'>تاكيد كلمة المرور الجديد</label>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                               :class="{'valid': !$v.resetPassword.confirmPassword.$invalid, 'invalid': $v.resetPassword.confirmPassword.$invalid }"

                               v-model="$v.resetPassword.confirmPassword.$model" minlength=4 maxlength=50 required>
                        <div v-if="$v.resetPassword.confirmPassword.$anyDirty && $v.resetPassword.confirmPassword.$invalid">
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.confirmPassword.required'>
                                تاكيد كلمة المرور اجباري
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.confirmPassword.minLength'>
                                تاكيد كلمة المرور يجب ان  يكون على الاقل 4 احرف
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.resetPassword.confirmPassword.maxLength'>
                                لا يمكن ان يكون تاكيد كلمة المرور اطول من 50
                            </small>
                        </div>
                    </div>

                    <button :disabled='$v.resetPassword.$invalid' class='btn btn-primary' type='submit'>حفظ</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./change-password.component.ts">
</script>
