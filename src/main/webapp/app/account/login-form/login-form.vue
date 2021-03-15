<template>
    <div class="modal-body">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <b-alert v-if='authenticationError' show variant='danger'>
                    <strong>عذرا !</strong> ارجو التاكد من بياناتك وحاول مجددا.
                </b-alert>
            </div>
            <div class="col-md-8">
                <b-form role='form' v-on:submit.prevent='doLogin()'>
                    <b-form-group label='اسم المستخدم' label-for='username'>
                        <b-form-input id='username' v-model='login' autofocus name='username'
                                      placeholder='اسم المستخدم' type='text'>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label='كلمة المرور' label-for='pass'>
                        <b-form-input id='pass' v-model='password' name='pass'
                                      placeholder='كلمة المرور' type='password'>
                        </b-form-input>
                    </b-form-group>
                    <b-form-checkbox id='rememberMe' name='rememberMe' v-model='rememberMe' checked>
                        <span>تذكرني</span>
                    </b-form-checkbox>
                    <div>
                        <b-button type='submit' variant='primary'>تسجيل الدخول</b-button>
                    </div>
                </b-form>
                <p></p>
                <!-- <div>
                    <b-alert show variant="warning">
                        <b-link :to="'/account/reset/request'" class='alert-link'>هل نسيت كلمة المرور؟</b-link>
                    </b-alert>
                </div>
                <div>
                    <b-alert show variant='warning'>
                        <span>لا يوجد لديك حساب ؟</span>
                        <b-link :to="'/register'" class='alert-link'>تسجيل حساب جديد</b-link>
                    </b-alert>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
