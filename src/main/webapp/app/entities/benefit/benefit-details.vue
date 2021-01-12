<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="benefit">
                <h2 class="jh-entity-heading"><span v-text="$t('sahatiApp.benefit.detail.title')">Benefit</span> {{benefit.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.nameAr')">Name Ar</span>
                    </dt>
                    <dd>
                        <span>{{benefit.nameAr}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.nameEn')">Name En</span>
                    </dt>
                    <dd>
                        <span>{{benefit.nameEn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.pointsCost')">Points Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefit.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.cost')">Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefit.cost}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="benefit.categoryId">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefit.categoryId}}">{{benefit.categoryNameAr}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sahatiApp.benefit.hospital')">Hospital</span>
                    </dt>
                    <dd>
                        <div v-if="benefit.hospitalId">
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefit.hospitalId}}">{{benefit.hospitalNameAr}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="benefit.id" :to="{name: 'BenefitEdit', params: {benefitId: benefit.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-details.component.ts">
</script>
