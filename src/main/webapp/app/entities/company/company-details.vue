<template>
<div>
    <div class="row">
        <div class="col-10">
        </div>
        <div class="col-2">
            <button type='submit'
                v-on:click.prevent='previousState()'
                class='btn btn-info'>
                <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
            </button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="company">
                <h2 class='jh-entity-heading'><span>بيانات الشركة</span></h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>الاسم بالعربية</span>
                    </dt>
                    <dd>
                        <span>{{company.nameAr}}</span>
                    </dd>
                    <dt>
                        <span>الاسم بالانجليزية</span>
                    </dt>
                    <dd>
                        <span>{{company.nameEn}}</span>
                    </dd>
                    <dt>
                        <span>البريد الالكتروني</span>
                    </dt>
                    <dd>
                        <span>{{company.email}}</span>
                    </dd>
                    <dt>
                        <span>رقم الهاتف</span>
                    </dt>
                    <dd>
                        <span>{{company.phone}}</span>
                    </dd>
                    <dt>
                        <span>العنوان</span>
                    </dt>
                    <dd>
                        <span>{{company.address}}</span>
                    </dd>
                    <!-- <dt>
                        <span>Discount</span>
                    </dt>
                    <dd>
                        <span>{{company.discount}}</span>
                    </dd>
                    <dt>
                        <span>Fixed Discount</span>
                    </dt>
                    <dd>
                        <span>{{company.fixedDiscount}}</span>
                    </dd> -->
                    <dt>
                        <span>عدد الموظفين</span>
                    </dt>
                    <dd>
                        {{ employee.length}}
                    </dd>
                    <dt>
                        <span>الموظفين</span>
                    </dt>
                    <dd>
                        <span v-for="(user, i) in employee" :key="user.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: user.id}}">{{user.name}} | </router-link>
                        </span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" src="./company-details.component.ts">
</script>
