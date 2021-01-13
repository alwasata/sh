<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="hospital">
                <h2 class='jh-entity-heading'><span>Hospital</span> {{ hospital.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name Ar</span>
                    </dt>
                    <dd>
                        <span>{{hospital.nameAr}}</span>
                    </dd>
                    <dt>
                        <span>Name En</span>
                    </dt>
                    <dd>
                        <span>{{hospital.nameEn}}</span>
                    </dd>
                    <dt>
                        <span>Email</span>
                    </dt>
                    <dd>
                        <span>{{hospital.email}}</span>
                    </dd>
                    <dt>
                        <span>Phone</span>
                    </dt>
                    <dd>
                        <span>{{hospital.phone}}</span>
                    </dd>
                    <dt>
                        <span>Address</span>
                    </dt>
                    <dd>
                        <span>{{hospital.address}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        <span v-for="(user, i) in hospital.users" :key="user.id">{{i > 0 ? ', ' : ''}}
                            {{user.id}}
                        </span>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='hospital.id' :to="{name: 'HospitalEdit', params: {hospitalId: hospital.id}}"
                             tag='button' class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./hospital-details.component.ts">
</script>
