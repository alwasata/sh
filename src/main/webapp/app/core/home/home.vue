<template>
    <div>
        <div class="row" v-if="authenticated">
        <div class="card text-white bg-primary mb-3 ml-3 col-md-3" style="max-width: 18rem;" v-if="hasRole(['ROLE_ADMIN','ROLE_HOSPITAL_ADMIN'])">
            <div class="card-header">الفواتير</div>
            <div class="card-body">
                <h5 class="card-title">الفواتير الصادرة : 34</h5>
            </div>
        </div>
        <div class="card text-white bg-danger mb-3 ml-3 col-md-3" style="max-width: 18rem;" v-if="hasRole(['ROLE_ADMIN','ROLE_HOSPITAL_ADMIN'])">
            <div class="card-header">الفواتير الملغية</div>
            <div class="card-body">
                <h5 class="card-title">فواتير تم الغائها : 0</h5>
            </div>
        </div>
        <div class="card text-white bg-secondary mb-3 ml-3 col-md-3" style="max-width: 18rem;" v-if="hasRole(['ROLE_ADMIN','ROLE_HOSPITAL_ADMIN'])">
            <div class="card-header">الفواتير المرجعة</div>
            <div class="card-body">
                <h5 class="card-title">فواتير مرجعة : 0</h5>
            </div>
        </div>
        <div class="card text-white bg-success mb-3 ml-3 col-md-3" style="max-width: 18rem;" v-if="hasRole(['ROLE_ADMIN','ROLE_HOSPITAL_ADMIN'])">
            <div class="card-header">المنفعات المفعلة</div>
            <div class="card-body">
                <h5 class="card-title">المنفعات : 4</h5>
            </div>
        </div>
        <div class="card text-white bg-warning mb-3 ml-3 col-md-3" style="max-width: 18rem;" v-if="hasRole(['ROLE_ADMIN'])">
            <div class="card-header">المنفعات الغير مفعلة</div>
            <div class="card-body">
                <h5 class="card-title">المنفعات : 1</h5>
            </div>
        </div>
        </div>

    <section v-if="!authenticated">
        <div style="flex: 0 0 auto;" class="modal-body">
        <div class="row justify-content-center box">
            <div class="col-md-12">
                <b-alert v-if='authenticationError' show variant='danger'>
                    <strong>عذرا !</strong> ارجو التاكد من بياناتك وحاول مجددا.
                </b-alert>
            </div>
            <div class="col-md-12">
                <b-form class="form" role='form' v-on:submit.prevent='doLogin()'>
                <h2>تسجيل الدخول</h2>
                    <b-form-group  class="inputBx" label='اسم المستخدم' label-for='username'>
                        <b-form-input id='username' v-model='login' autofocus name='username'
                                        placeholder='اسم المستخدم' type='text'>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group  class="inputBx" label='كلمة المرور' label-for='pass'>
                        <b-form-input id='pass' v-model='password' name='pass'
                                      placeholder='كلمة المرور' type='password'>
                        </b-form-input>
                    </b-form-group>
                    <div class="inputBx">
                        <input type='submit' value="تسجيل الدخول" variant='primary'/>
                    </div>
                </b-form>
            </div>
        </div>
    </div>
    </section>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap');

* {
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    margin: 0;
}

section {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(
-30deg
, #03a9f4 0%, #276cb1 50%,#262626 50%, #607d8b 100%);
    -webkit-filter: hue-rotate(
120deg
);
    filter: hue-rotate(
-25deg
);
    -webkit-animation: animate-data-v-16362f12 10s linear infinite;
    animation: animate-data-v-16362f12 10s linear infinite
}

@keyframes animate {

    /* 0%
    {
        filter: hue-rotate(0deg)
    }

    100%
    {
        filter: hue-rotate(360deg)
    } */
}

.box {
    position: relative;
    padding: 50px;
    width: 453px;
    height: 515px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    box-shadow: 0 5px 35px #00000054
}

.box::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 5px;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 15%, transparent 50%,transparent 85%,rgba(255,255,255,0.3) 100%);
}

.box .form {
    position: relative;
}

.box .form h2 {
    color: #fff;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 30px;
}

.box .form .inputBx {
    position: relative;
    width: 100%;
}

.box .form .inputBx input {
    width: 100%;
    outline: none;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    margin-bottom: 20px;
    padding: 8px 10px;
    padding-left: 35px;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    font-weight: 300px;
    box-shadow: inset 0 0 25px rgba(0,0,0,0.2);
}

.box .form .inputBx input[type="submit"] {
    background-color: #fff;
    color: #111;
    max-width: 100px;
    padding: 8px 10px;
    letter-spacing: 1px;
    font-weight: 500;
    box-shadow: none;
    cursor: pointer;
}

.box .form .inputBx i {
    position: absolute;
    top: 13px;
    left: 10px;
    color: rgba(255, 255, 255, 0.904);
}

.box .form .remeber {
    position: relative;
    display: inline-block;
    color: #fff;
    font-weight: 300px;
    margin-bottom: 10px;
    cursor: pointer;
}

.box .form p {
    color: #fff;
    font-weight: 300;
    font-size: 15px;
    margin-top: 5px
}

.box .form p a {color:#fff}


.box .form h2 {letter-spacing: 1px;}

.box .form .inputBx input {padding-right: 35px;text-align: right;position:relative;z-index: 2;}

.box .form .inputBx input[type="submit"] {max-width: 150px;}

.box .form .inputBx i {right:10px;z-index: 1;}
.inputBx {
        color: white;
    font-size: 18px;
    /* font-weight: bold; */
}
</style>
