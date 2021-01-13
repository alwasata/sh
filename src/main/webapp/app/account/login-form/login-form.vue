<template>
    <div class="modal-body">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <b-alert v-if='authenticationError' show variant='danger'>
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </b-alert>
            </div>
            <div class="col-md-8">
                <b-form role='form' v-on:submit.prevent='doLogin()'>
                    <b-form-group label='Username' label-for='username'>
                        <b-form-input id='username' v-model='login' autofocus name='username'
                                      placeholder='Your username' type='text'>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label='Password' label-for='pass'>
                        <b-form-input id='pass' v-model='password' name='pass'
                                      placeholder='Your password' type='password'>
                        </b-form-input>
                    </b-form-group>
                    <b-form-checkbox id='rememberMe' name='rememberMe' v-model='rememberMe' checked>
                        <span>Remember me</span>
                    </b-form-checkbox>
                    <div>
                        <b-button type='submit' variant='primary'>Sign in</b-button>
                    </div>
                </b-form>
                <p></p>
                <div>
                    <b-alert show variant="warning">
                        <b-link :to="'/account/reset/request'" class='alert-link'>Did you forget your password?</b-link>
                    </b-alert>
                </div>
                <div>
                    <b-alert show variant='warning'>
                        <span>You don't have an account yet?</span>
                        <b-link :to="'/register'" class='alert-link'>Register a new account</b-link>
                    </b-alert>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
