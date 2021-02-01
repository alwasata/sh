<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="benefitRequest">
                <h2 class='jh-entity-heading'><span>طلب منفعة</span> {{ benefitRequest.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>الاسم بالعربية</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.nameAr}}</span>
                    </dd>
                    <dt>
                        <span>الاسم بالانجليزية</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.nameEn}}</span>
                    </dd>
                    <dt>
                        <span>النقاط</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span>القيمة المالية</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.cost}}</span>
                    </dd>
                    <dt>
                        <span>حالة المنفعة</span>
                    </dt>
                    <dd>
                        <span>{{ benefitRequest.benefitStatus }}</span>
                    </dd>
                    <dt>
                        <span>الملاحظات</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.notes}}</span>
                    </dd>
                    <dt>
                        <span>الفئة</span>
                    </dt>
                    <dd>
                        <div v-if='benefitRequest.category'>
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefitRequest.category.id}}">
                                {{ benefitRequest.category.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>المستشفى</span>
                    </dt>
                    <dd>
                        <div v-if='benefitRequest.hospital'>
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefitRequest.hospital.id}}">
                                {{ benefitRequest.hospital.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>المنفعة</span>
                    </dt>
                    <dd>
                        <div v-if='benefitRequest.benefit'>
                            <router-link :to="{name: 'BenefitView', params: {benefitId: benefitRequest.benefit.id}}">
                                {{ benefitRequest.benefit.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='benefitRequest.id && benefitRequest.benefitStatus == "PENDING"'
                             :to="{name: 'BenefitRequestEdit', params: {benefitRequestId: benefitRequest.id}}"
                             tag='button' class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> تعديل</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-request-details.component.ts">
</script>
