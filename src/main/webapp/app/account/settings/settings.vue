<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8 toastify-container">
                <h2 v-if='username' id='settings-title'><span>اعدادات المستخدم [<b>{{ username }}</b>]</span></h2>

                <div v-if='success' class='alert alert-success' role='alert'>
                    <strong>تم حفظ الاعدادات!</strong>
                </div>

                <div v-if='errorEmailExists' class='alert alert-danger' role='alert'>
                    <strong>البريد الالكتروني مستخدم مسبقا</strong>
                </div>

                <!--<jhi-alert-error></jhi-alert-error>-->

                <form name="form" id="settings-form" role="form" v-on:submit.prevent="save()" v-if="settingsAccount" novalidate>

                    <div class='form-group'>
                        <label class='form-control-label' for='firstName'>الاسم الاول</label>
                        <input id='firstName' class='form-control' name='firstName' type='text'
                               :class="{'valid': !$v.settingsAccount.firstName.$invalid, 'invalid': $v.settingsAccount.firstName.$invalid }"
                               v-model='$v.settingsAccount.firstName.$model' minlength='1' maxlength='50' required>
                        <div v-if='$v.settingsAccount.firstName.$anyDirty && $v.settingsAccount.firstName.$invalid'>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.firstName.required'>
                                 الاسم الاول اجباري
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.firstName.minLength'>
                                Your first name is required to be at least 1 character.
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.firstName.maxLength'>
                                لا يمكن ان يكون الاسم الاول اكثر من 50 حرف
                            </small>
                        </div>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='lastName'>اللقب</label>
                        <input id='lastName' class='form-control' name='lastName' type='text'
                               :class="{'valid': !$v.settingsAccount.lastName.$invalid, 'invalid': $v.settingsAccount.lastName.$invalid }"
                               v-model='$v.settingsAccount.lastName.$model' minlength='1' maxlength='50' required>
                        <div v-if='$v.settingsAccount.lastName.$anyDirty && $v.settingsAccount.lastName.$invalid'>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.lastName.required'>
                                اللقب اجباري
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.lastName.minLength'>
                                Your last name is required to be at least 1 character.
                            </small>
                            <small class='form-text text-danger'
                                   v-if='!$v.settingsAccount.lastName.maxLength'>
                                اللقب لا يمكن ان يكون اطول من 50
                            </small>
                        </div>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='email'>البريد الالكتروني</label>
                        <input id='email' class='form-control' name='email' type='email'
                               :class="{'valid': !$v.settingsAccount.email.$invalid, 'invalid': $v.settingsAccount.email.$invalid }"
                               v-model='$v.settingsAccount.email.$model' minlength='5' maxlength='254' email required>
                        <div v-if='$v.settingsAccount.email.$anyDirty && $v.settingsAccount.email.$invalid'>
                            <small class='form-text text-danger' v-if='!$v.settingsAccount.email.required'
                            >
                                البريد الاكتروني اجباري
                            </small>
                            <small class='form-text text-danger' v-if='!$v.settingsAccount.email.email'
                            >
                                البريد الاكتروني غير صحيح
                            </small>
                            <small class="form-text text-danger" v-if="!$v.settingsAccount.email.minLength"
                            >
                                يجب ان يكون طول البريد الالكتروني اكبر من 5.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.settingsAccount.email.maxLength"
                            >
                               البريد الالكتروني لا يمكن  اطول من 100.
                            </small>
                        </div>
                    </div>
                    <div class="form-group" v-if="languages && Object.keys(languages).length > 1">
                        <label for='langKey'>Language</label>
                        <select class="form-control" id="langKey" name="langKey" v-model="settingsAccount.langKey">
                            <option v-for="(language, key) in languages" :value="key" :key="`lang-${key}`">{{language.name}}</option>
                        </select>
                    </div>
                    <button :disabled='$v.settingsAccount.$invalid' class='btn btn-primary' type='submit'>حفظ</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script lang="ts" src="./settings.component.ts">
</script>
