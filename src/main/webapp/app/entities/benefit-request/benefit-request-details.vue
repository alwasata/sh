<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="benefitRequest">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.benefitRequest.detail.title')">BenefitRequest</span> {{benefitRequest.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.nameAr')">Name Ar</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.nameAr}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.nameEn')">Name En</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.nameEn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.pointsCost')">Points Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.cost')">Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.cost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.benefitStatus')">Benefit Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('sahatiApp.BenefitStatus.' + benefitRequest.benefitStatus)">{{benefitRequest.benefitStatus}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.notes')">Notes</span>
                    </dt>
                    <dd>
                        <span>{{benefitRequest.notes}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="benefitRequest.categoryId">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefitRequest.categoryId}}">{{benefitRequest.categoryNameAr}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.hospital')">Hospital</span>
                    </dt>
                    <dd>
                        <div v-if="benefitRequest.hospitalId">
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefitRequest.hospitalId}}">{{benefitRequest.hospitalNameAr}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefitRequest.benefit')">Benefit</span>
                    </dt>
                    <dd>
                        <div v-if="benefitRequest.benefitId">
                            <router-link :to="{name: 'BenefitView', params: {benefitId: benefitRequest.benefitId}}">{{benefitRequest.benefitNameAr}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="benefitRequest.id" :to="{name: 'BenefitRequestEdit', params: {benefitRequestId: benefitRequest.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-request-details.component.ts">
</script>
