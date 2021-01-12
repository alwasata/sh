<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.benefit.home.createOrEditLabel" v-text="$t('sahatiApp.benefit.home.createOrEditLabel')">Create or edit a Benefit</h2>
                <div>
                    <div class="form-group" v-if="benefit.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="benefit.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.nameAr')" for="benefit-nameAr">Name Ar</label>
                        <input type="text" class="form-control" name="nameAr" id="benefit-nameAr"
                            :class="{'valid': !$v.benefit.nameAr.$invalid, 'invalid': $v.benefit.nameAr.$invalid }" v-model="$v.benefit.nameAr.$model"  required/>
                        <div v-if="$v.benefit.nameAr.$anyDirty && $v.benefit.nameAr.$invalid">
                            <small class="form-text text-danger" v-if="!$v.benefit.nameAr.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.nameEn')" for="benefit-nameEn">Name En</label>
                        <input type="text" class="form-control" name="nameEn" id="benefit-nameEn"
                            :class="{'valid': !$v.benefit.nameEn.$invalid, 'invalid': $v.benefit.nameEn.$invalid }" v-model="$v.benefit.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.pointsCost')" for="benefit-pointsCost">Points Cost</label>
                        <input type="number" class="form-control" name="pointsCost" id="benefit-pointsCost"
                            :class="{'valid': !$v.benefit.pointsCost.$invalid, 'invalid': $v.benefit.pointsCost.$invalid }" v-model.number="$v.benefit.pointsCost.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.cost')" for="benefit-cost">Cost</label>
                        <input type="number" class="form-control" name="cost" id="benefit-cost"
                            :class="{'valid': !$v.benefit.cost.$invalid, 'invalid': $v.benefit.cost.$invalid }" v-model.number="$v.benefit.cost.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.category')" for="benefit-category">Category</label>
                        <select class="form-control" id="benefit-category" name="category" v-model="benefit.categoryId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="categoryOption.id" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.nameAr}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.benefit.hospital')" for="benefit-hospital">Hospital</label>
                        <select class="form-control" id="benefit-hospital" name="hospital" v-model="benefit.hospitalId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="hospitalOption.id" v-for="hospitalOption in hospitals" :key="hospitalOption.id">{{hospitalOption.nameAr}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.benefit.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./benefit-update.component.ts">
</script>
