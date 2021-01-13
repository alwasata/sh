<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="company">
                <h2 class='jh-entity-heading'><span>Company</span> {{ company.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name Ar</span>
                    </dt>
                    <dd>
                        <span>{{company.nameAr}}</span>
                    </dd>
                    <dt>
                        <span>Name En</span>
                    </dt>
                    <dd>
                        <span>{{company.nameEn}}</span>
                    </dd>
                    <dt>
                        <span>Email</span>
                    </dt>
                    <dd>
                        <span>{{company.email}}</span>
                    </dd>
                    <dt>
                        <span>Phone</span>
                    </dt>
                    <dd>
                        <span>{{company.phone}}</span>
                    </dd>
                    <dt>
                        <span>Address</span>
                    </dt>
                    <dd>
                        <span>{{company.address}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        <span v-for="(user, i) in company.users" :key="user.id">{{i > 0 ? ', ' : ''}}
                            {{user.id}}
                        </span>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='company.id' :to="{name: 'CompanyEdit', params: {companyId: company.id}}" tag='button'
                             class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./company-details.component.ts">
</script>
