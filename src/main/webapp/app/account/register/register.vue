<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8 toastify-container">
                <h1 id='register-title'> حساب جديد</h1>

                <div v-if='success' class='alert alert-success' role='alert'>
                    <strong>الان لديك حساب!</strong> ارجو التاكد من بياناتك.
                </div>

                <div v-if='error' class='alert alert-danger' role='alert'>
                    <strong>عذرا!</strong> ارجو المحاولة مرة اخرى.
                </div>

                <div v-if='errorUserExists' class='alert alert-danger' role='alert'>
                    <strong> اسم مستخدم مسبقا!</strong>
                </div>

                <div v-if='errorEmailExists' class='alert alert-danger' role='alert'>
                    <strong>البريد الالكتروني مستخدم مسبقا!</strong>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form id="register-form" name="registerForm" role="form" v-on:submit.prevent="register()" v-if="!success" no-validate>
                    <div class="form-group">
                        <label class='form-control-label' for='username'>اسم المستخدم</label>
                        <input type='text' class='form-control' v-model='$v.registerAccount.login.$model' id='username'
                               name='login'
                               :class="{'valid': !$v.registerAccount.login.$invalid, 'invalid': $v.registerAccount.login.$invalid }"
                               maxlength='50' minlength='1'
                               pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required>
                        <div v-if="$v.registerAccount.login.$anyDirty && $v.registerAccount.login.$invalid">
                            <small class="form-text text-danger" v-if="!$v.registerAccount.login.required"
                            >
                                اسم المستخدم اجباري.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.login.minLength"
                            >
                                Your username is required to be at least 1 character.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.login.maxLength"
                            >
                                اسم المستخدم يجب ان يكون اقل من 50 حرف او رقم.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.login.pattern"
                            >
                                اسم المستخدم يحتوي فقط على احرف انجليزية او ارقام.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='email'>البريد الالكتروني</label>
                        <input type='email' class='form-control' id='email' name='email'
                               :class="{'valid': !$v.registerAccount.email.$invalid, 'invalid': $v.registerAccount.email.$invalid }"
                               v-model='$v.registerAccount.email.$model' email maxlength='254' minlength='5' required>
                        <div v-if="$v.registerAccount.email.$anyDirty && $v.registerAccount.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.registerAccount.email.required"
                            >
                                البريد الالكتروني اجباري.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.email.email"
                            >
                                البريد الالكتروني غير صحيح.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.email.minLength"
                            >
                                يجب ان يكون طول البريد الالكتروني اكبر من 5.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.email.maxLength"
                            >
                               البريد الالكتروني لا يمكن  اطول من 100.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='firstPassword'>كلمة المرور</label>
                        <input type='password' class='form-control' id='firstPassword' name='password'
                               :class="{'valid': !$v.registerAccount.password.$invalid, 'invalid': $v.registerAccount.password.$invalid }"
                               v-model='$v.registerAccount.password.$model' maxlength='50' minlength='4' required >
                        <div v-if="$v.registerAccount.password.$anyDirty && $v.registerAccount.password.$invalid">
                            <small class="form-text text-danger" v-if="!$v.registerAccount.password.required"
                            >
                                كلمة المرور اجباري.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.password.minLength"
                            >
                                يجب ان يكون كلمة المرور على الاقل 4 احرف.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.registerAccount.password.maxLength"
                            >
                                لا يمكن ان يكون كلمة المرور اطول من 50.
                            </small>
                        </div>
                        <!--<jhi-password-strength-bar [passwordToCheck]="registerAccount.password"></jhi-password-strength-bar>-->
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='secondPassword'>تاكيد كلمة المرور</label>
                        <input type='password' class='form-control' id='secondPassword' name='confirmPasswordInput'
                               :class="{'valid': !$v.confirmPassword.$invalid, 'invalid': $v.confirmPassword.$invalid }"
                               v-model='$v.confirmPassword.$model' maxlength='50' minlength='4' required >
                        <div v-if="$v.confirmPassword.$dirty && $v.confirmPassword.$invalid">
                            <small class="form-text text-danger" v-if="!$v.confirmPassword.required"
                            >
                                تاكيد كلمة المرور اجباري
                            </small>
                            <small class="form-text text-danger" v-if="!$v.confirmPassword.minLength"
                            >
                                تاكيد كلمة المرور يجب ان  يكون على الاقل 4 احرف
                            </small>
                            <small class="form-text text-danger" v-if="!$v.confirmPassword.maxLength"
                            >
                                لا يمكن ان يكون تاكيد كلمة المرور اطول من 50
                            </small>
                            <small class="form-text text-danger" v-if="!$v.confirmPassword.sameAsPassword"
                            >
                                تاكيد كلمة المرور يجب ان يكون مطابق للرقم السري
                            </small>
                        </div>
                    </div>

                    <button :disabled='$v.$invalid ' class='btn btn-primary' type='submit'>تسجيل</button>
                </form>
                <p></p>
                <!-- <div class='alert alert-warning'>
                    <span>If you want to </span>
                    <a class='alert-link' v-on:click='openLogin()'>sign
                        in</a><span>, you can try the default accounts:<br />- Administrator (login="admin" and password="admin") <br />- User (login="user" and password="user").</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang='ts' src='./register.component.ts'>
</script>
