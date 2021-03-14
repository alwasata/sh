<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="card">
                <h2 class='jh-entity-heading'><span>بيانات البطاقة</span> </h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>رقم البطاقة</span>
                    </dt>
                    <dd>
                        <span>{{card.cardNo}}</span>
                    </dd>
                    <dt>
                        <span>تاريخ الانتهاء</span>
                    </dt>
                    <dd>
                        <span>{{card.expiryDate}}</span>
                    </dd>
                    <dt>
                        <span>البطاقة</span>
                    </dt>
                    <dd>
                        <span v-if="card.isActive == true">
                            <span class="text-success">مفعلة</span>
                        </span>
                        <span v-if="card.isActive == false">
                           <span class="text-danger">معطلة</span>
                        </span>
                    </dd>
                    <dt>
                        <span>النقاط</span>
                    </dt>
                    <dd>
                        <span>{{ points }} نقطة</span>
                    </dd>
                    <dt>
                        <span>موظف</span>
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
                    <font-awesome-icon icon='pencil-alt'></font-awesome-icon>&nbsp;<span> تعديل</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card-details.component.ts">
</script>
