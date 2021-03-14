<template>
<div class="row justify-content-center">
        <div class="col-8">
        <form action="" v-on:submit.prevent="charge()">
            <h2 id='sahatiApp.card.home.createOrEditLabel'>اضافة او تعديل بطاقة</h2>
            <input type="text" disabled class="form-control" v-model="card.id">
            <div class='form-group'>
                        <label class='form-control-label' for='card-cardNo'>رقم البطاقة</label>
                        <input type="text" class="form-control" name="cardNo" id="card-cardNo" disabled
                            :class="{'valid': !$v.card.cardNo, 'invalid': $v.card.cardNo }" v-model="$v.card.cardNo.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='card-employee'>موظف</label>
                        <select id='card-employee' v-model='card.employee' class='form-control' name='employee' disabled>
                            <option v-bind:value='null'></option>
                            <option v-for='employeeOption in employees' :key='employeeOption.id'
                                    v-bind:value='card.employee && employeeOption.id === card.employee.id ? card.employee : employeeOption'>
                                {{ employeeOption.name }}
                            </option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='card-employee'>المبلغ بالنقاط</label>
                         <input type="number" class="form-control" step="any" required min="1" name="points" id="card-points" v-model="points"/>
                    </div>
                    <div class='form-group'>
                        <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.cardNo'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                    </div>

        </form>
    </div>
</div>
</template>
<script lang="ts" src="./card-charge.component.ts">
</script>
