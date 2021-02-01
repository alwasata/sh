<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1>اعادة تعيين كلمة المرور</h1>

                <div class='alert alert-danger'
                     v-if='keyMissing'>
                    <strong>The password reset key is missing.</strong>
                </div>

                <div class="alert alert-danger" v-if="error">
                    <p>Your password couldn't be reset. Remember a password request is only valid for 24 hours.</p>
                </div>

                <div class='alert alert-success' v-if='success'>
                    <span><strong>Your password had been reset.</strong> Please </span>
                    <a class='alert-link' v-on:click='openLogin'>sign in</a>
                </div>
                <div class="alert alert-danger" v-if="doNotMatch">
                    <p>تاكيد الرقم السري يجب ان يكون مطابق للرقم السري</p>
                </div>

                <div class="alert alert-warning" v-if="!success && !keyMissing">
                    <p>Choose a new password.</p>
                </div>

                <div v-if="!keyMissing">
                    <form v-if="!success" name="form" role="form" v-on:submit.prevent="finishReset()">
                        <div class="form-group">
                            <label class='form-control-label' for='newPassword'>New password</label>
                            <input type="password" class="form-control" id="newPassword" name="newPassword"

                                :class="{'valid': !$v.resetAccount.newPassword.$invalid, 'invalid': $v.resetAccount.newPassword.$invalid }"
                                v-model="$v.resetAccount.newPassword.$model" minlength=4 maxlength=50 required>
                            <div v-if="$v.resetAccount.newPassword.$anyDirty && $v.resetAccount.newPassword.$invalid">
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.newPassword.required'>
                                    الرقم السري اجباري.
                                </small>
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.newPassword.minLength'>
                                    يجب ان يكون الرقم السري على الاقل 4 احرف.
                                </small>
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.newPassword.maxLength'>
                                    لا يمكن ان يكون الرقم السري اطول من 50.
                                </small>
                            </div>
                        </div>
                        <!--<jhi-password-strength-bar [passwordToCheck]="newPassword"></jhi-password-strength-bar>-->
                        <div class="form-group">
                            <label class='form-control-label' for='confirmPassword'>تاكيد الرقم السري</label>
                            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                               :class="{'valid': !$v.resetAccount.confirmPassword.$invalid, 'invalid': $v.resetAccount.confirmPassword.$invalid }"

                               v-model="$v.resetAccount.confirmPassword.$model" minlength=4 maxlength=50 required>
                            <div v-if="$v.resetAccount.confirmPassword.$anyDirty && $v.resetAccount.confirmPassword.$invalid">
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.confirmPassword.required'>
                                    تاكيد الرقم السري اجباري
                                </small>
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.confirmPassword.minLength'>
                                    تاكيد الرقم السري يجب ان  يكون على الاقل 4 احرف
                                </small>
                                <small class='form-text text-danger'
                                       v-if='!$v.resetAccount.confirmPassword.maxLength'>
                                    لا يمكن ان يكون تاكيد الرقم السري اطول من 50
                                </small>
                            </div>
                        </div>
                        <button :disabled='$v.resetAccount.$invalid' class='btn btn-primary' type='submit'>حفظ</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./reset-password-finish.component.ts">
</script>
