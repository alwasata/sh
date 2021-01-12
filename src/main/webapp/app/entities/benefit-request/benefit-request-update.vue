<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.benefitRequest.home.createOrEditLabel" v-text="$t('sahatiApp.benefitRequest.home.createOrEditLabel')">Create or edit a BenefitRequest</h2>
                <div>
                    <div class="form-group" v-if="benefitRequest.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="benefitRequest.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.nameAr')" for="benefit-request-nameAr">Name Ar</label>
                        <input type="text" class="form-control" name="nameAr" id="benefit-request-nameAr"
                            :class="{'valid': !$v.benefitRequest.nameAr.$invalid, 'invalid': $v.benefitRequest.nameAr.$invalid }" v-model="$v.benefitRequest.nameAr.$model"  required/>
                        <div v-if="$v.benefitRequest.nameAr.$anyDirty && $v.benefitRequest.nameAr.$invalid">
                            <small class="form-text text-danger" v-if="!$v.benefitRequest.nameAr.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.nameEn')" for="benefit-request-nameEn">Name En</label>
                        <input type="text" class="form-control" name="nameEn" id="benefit-request-nameEn"
                            :class="{'valid': !$v.benefitRequest.nameEn.$invalid, 'invalid': $v.benefitRequest.nameEn.$invalid }" v-model="$v.benefitRequest.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.pointsCost')" for="benefit-request-pointsCost">Points Cost</label>
                        <input type="number" class="form-control" name="pointsCost" id="benefit-request-pointsCost"
                            :class="{'valid': !$v.benefitRequest.pointsCost.$invalid, 'invalid': $v.benefitRequest.pointsCost.$invalid }" v-model.number="$v.benefitRequest.pointsCost.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.cost')" for="benefit-request-cost">Cost</label>
                        <input type="number" class="form-control" name="cost" id="benefit-request-cost"
                            :class="{'valid': !$v.benefitRequest.cost.$invalid, 'invalid': $v.benefitRequest.cost.$invalid }" v-model.number="$v.benefitRequest.cost.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.benefitStatus')" for="benefit-request-benefitStatus">Benefit Status</label>
                        <select class="form-control" name="benefitStatus" :class="{'valid': !$v.benefitRequest.benefitStatus.$invalid, 'invalid': $v.benefitRequest.benefitStatus.$invalid }" v-model="$v.benefitRequest.benefitStatus.$model" id="benefit-request-benefitStatus" >
                            <option value="PENDING" v-bind:label="$t('sahatiApp.BenefitStatus.PENDING')">PENDING</option>
                            <option value="APPROVED" v-bind:label="$t('sahatiApp.BenefitStatus.APPROVED')">APPROVED</option>
                            <option value="REFUSED" v-bind:label="$t('sahatiApp.BenefitStatus.REFUSED')">REFUSED</option>
                            <option value="CANCELLED" v-bind:label="$t('sahatiApp.BenefitStatus.CANCELLED')">CANCELLED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.notes')" for="benefit-request-notes">Notes</label>
                        <input type="text" class="form-control" name="notes" id="benefit-request-notes"
                            :class="{'valid': !$v.benefitRequest.notes.$invalid, 'invalid': $v.benefitRequest.notes.$invalid }" v-model="$v.benefitRequest.notes.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.category')" for="benefit-request-category">Category</label>
                        <select class="form-control" id="benefit-request-category" name="category" v-model="benefitRequest.categoryId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="categoryOption.id" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.nameAr}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.hospital')" for="benefit-request-hospital">Hospital</label>
                        <select class="form-control" id="benefit-request-hospital" name="hospital" v-model="benefitRequest.hospitalId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="hospitalOption.id" v-for="hospitalOption in hospitals" :key="hospitalOption.id">{{hospitalOption.nameAr}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefitRequest.benefit')" for="benefit-request-benefit">Benefit</label>
                        <select class="form-control" id="benefit-request-benefit" name="benefit" v-model="benefitRequest.benefitId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="benefitOption.id" v-for="benefitOption in benefits" :key="benefitOption.id">{{benefitOption.nameAr}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.benefitRequest.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./benefit-request-update.component.ts">
</script>
