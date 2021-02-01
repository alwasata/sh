<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1>اعادة تعيين كلمة المرور</h1>

                <div class="alert alert-warning" v-if="!success">
                    <p>ادخل البريد الالكتروني </p>
                </div>

                <div class="alert alert-success" v-if="success">
                    <p>تحقق من بريدك الالكتروني</p>
                </div>

                <form v-if="!success" name="form" role="form" v-on:submit.prevent="requestReset()">
                    <div class='form-group'>
                        <label class='form-control-label' for='email'>البريد الالكتروني</label>
                        <input id='email' class='form-control' name='email' type='email'
                               :class="{'valid': !$v.resetAccount.email.$invalid, 'invalid': $v.resetAccount.email.$invalid }"
                               v-model='$v.resetAccount.email.$model' minlength='5' maxlength='254' email required>
                        <div v-if='$v.resetAccount.email.$anyDirty && $v.resetAccount.email.$invalid'>
                            <small class='form-text text-danger' v-if='!$v.resetAccount.email.required'
                            >
                                البريد الاكتروني اجباري
                            </small>
                            <small class='form-text text-danger' v-if='!$v.resetAccount.email.email'
                            >
                                البريد الاكتروني غير صحيح
                            </small>
                            <small class="form-text text-danger" v-if="!$v.resetAccount.email.minLength"
                            >
                                يجب ان يكون طول البريد الالكتروني اكبر من 5.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.resetAccount.email.maxLength"
                            >
                               البريد الالكتروني لا يمكن  اطول من 100.
                            </small>
                        </div>
                    </div>
                    <button :disabled='$v.resetAccount.$invalid' class='btn btn-primary' type='submit'>Reset</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./reset-password-init.component.ts">
</script>
