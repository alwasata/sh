<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form class="form-class"  name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.card.home.createOrEditLabel'>اضافة او تعديل بطاقة</h2>
                <div class="alert alert-danger" id="alert-danger" role="alert" hidden>
                    {{ error }}
                </div>
                <div>
                    <div class="form-group" v-if="card.id">
                        <input type="hidden" class="form-control" id="id" name="id"
                               v-model="card.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='card-cardNo'>رقم البطاقة</label>
                        <input type="text" class="form-control" name="cardNo" id="card-cardNo"
                            :class="{'valid': !$v.card.cardNo.$invalid, 'invalid': $v.card.cardNo.$invalid }" v-model="$v.card.cardNo.$model" />
                    </div>
                    <div class="form-group" v-if="!isUpdate">
                        <label class='form-control-label' for='card-expiryDateType'> اختر تاريخ الانتهاء :</label>
                         <br/>
                         <label for="id30">30 شهرا (سنتان و نصف)</label>
                        <input class="form-radio"  id="id30" type="radio" name="expiryDateType" value="30" v-model="expiryDateType" >
                       <label for="id36">3 سنوات</label>
                        <input class="form-radio" id="id36"  type="radio" name="expiryDateType" value="36" v-model="expiryDateType" >
                        
                        <!-- <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="card-expiryDate"
                                    v-model="$v.card.expiryDate.$model"
                                    name="expiryDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="card-expiryDate" type="text" class="form-control" name="expiryDate"  :class="{'valid': !$v.card.expiryDate.$invalid, 'invalid': $v.card.expiryDate.$invalid }"
                            v-model="$v.card.expiryDate.$model"  />
                        </b-input-group> -->
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='card-isActive'>مفعل</label>
                        <input type="checkbox" class="form-check" name="isActive" id="card-isActive"
                            :class="{'valid': !$v.card.isActive.$invalid, 'invalid': $v.card.isActive.$invalid }" v-model="$v.card.isActive.$model" />
                    </div>

                    <div class='form-group' v-if="isUpdate == true">
                        <label class='form-control-label' for='card.employee'>موظف</label>
                        <select id='card.employee'  class='form-control' name='employee'>
                            <option v-bind:value='card.employee.id'>{{card.employee.name}}</option>
                        </select>
                    </div>
                    <div v-else>
                    <div class='form-group' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <label class="typo__label">موظف</label>
                        <multiselect id='card-employee' v-model='card.employee' name='employee' :options="employees"  placeholder="Select one" label="name" track-by="id"></multiselect>
                        <pre class="language-json"><code></code></pre>
                    </div>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.card.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./card-update.component.ts">
</script>
