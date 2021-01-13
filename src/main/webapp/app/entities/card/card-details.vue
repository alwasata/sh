<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="card">
                <h2 class='jh-entity-heading'><span>Card</span> {{ card.id }}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Card No</span>
                    </dt>
                    <dd>
                        <span>{{card.cardNo}}</span>
                    </dd>
                    <dt>
                        <span>Expiry Date</span>
                    </dt>
                    <dd>
                        <span>{{card.expiryDate}}</span>
                    </dd>
                    <dt>
                        <span>Is Active</span>
                    </dt>
                    <dd>
                        <span>{{card.isActive}}</span>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if='card.employee'>
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: card.employee.id}}">
                                {{ card.employee.name }}
                            </router-link>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if='card.id' :to="{name: 'CardEdit', params: {cardId: card.id}}" tag='button'
                             class='btn btn-primary'>
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card-details.component.ts">
</script>
