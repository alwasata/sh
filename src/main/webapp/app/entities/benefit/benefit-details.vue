<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="benefit">
                <h2 class='jh-entity-heading'><span>Benefit</span> {{ benefit.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name Ar</span>
                    </dt>
                    <dd>
                        <span>{{benefit.nameAr}}</span>
                    </dd>
                    <dt>
                        <span>Name En</span>
                    </dt>
                    <dd>
                        <span>{{benefit.nameEn}}</span>
                    </dd>
                    <dt>
                        <span>Points Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefit.pointsCost}}</span>
                    </dd>
                    <dt>
                        <span>Cost</span>
                    </dt>
                    <dd>
                        <span>{{benefit.cost}}</span>
                    </dd>
                    <dt>
                        <span>Category</span>
                    </dt>
                    <dd>
                        <div v-if='benefit.category'>
                            <router-link :to="{name: 'CategoryView', params: {categoryId: benefit.category.id}}">
                                {{ benefit.category.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Hospital</span>
                    </dt>
                    <dd>
                        <div v-if='benefit.hospital'>
                            <router-link :to="{name: 'HospitalView', params: {hospitalId: benefit.hospital.id}}">
                                {{ benefit.hospital.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='benefit.id' :to="{name: 'BenefitEdit', params: {benefitId: benefit.id}}" tag='button'
                             class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./benefit-details.component.ts">
</script>
