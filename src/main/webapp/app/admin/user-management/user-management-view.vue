<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="user">
                <h2 class='jh-entity-heading'>
                    <span>User</span> [<b>{{ user.login }}</b>]
                </h2>
                <dl class="row jh-entity-details">
                    <dt><span>Login</span></dt>
                    <dd>
                        <span>{{ user.login }}</span>
                        <b-badge v-if='user.activated' variant='success'>Activated</b-badge>
                        <b-badge v-if='!user.activated' variant='danger'>Deactivated</b-badge>
                    </dd>
                    <dt><span>الاسم الاول</span></dt>
                    <dd>{{ user.firstName }}</dd>
                    <dt><span>اللقب</span></dt>
                    <dd>{{ user.lastName }}</dd>
                    <dt><span>البريد الالكتروني</span></dt>
                    <dd>{{ user.email }}</dd>
                    <dt><span>Created By</span></dt>
                    <dd>{{ user.createdBy }}</dd>
                    <dt><span>Created Date</span></dt>
                    <dd> {{ user.createdDate | formatDate }}
                    </dd>
                    <dt><span>Last Modified By</span></dt>
                    <dd>{{ user.lastModifiedBy }}</dd>
                    <dt><span>Last Modified Date</span></dt>
                    <dd> {{ user.lastModifiedDate | formatDate }}
                    </dd>
                    <dt><span>Profiles</span></dt>
                    <dd>
                        <ul class='list-unstyled'>
                            <li v-for='authority of user.authorities' :key='authority'>
                                <b-badge variant='info'>{{ authority }}</b-badge>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <router-link tag='button' type='submit'
                             :to="{name: 'JhiUser'}"
                             class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./user-management-view.component.ts">
</script>
