<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.benefit.home.createOrEditLabel'>Create or edit a Benefit</h2>
                <div>
                    <div class="form-group" v-if="benefit.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="benefit.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-nameAr'>Name Ar</label>
                        <input type="text" class="form-control" name="nameAr" id="benefit-nameAr"
                            :class="{'valid': !$v.benefit.nameAr.$invalid, 'invalid': $v.benefit.nameAr.$invalid }" v-model="$v.benefit.nameAr.$model"  required/>
                        <div v-if="$v.benefit.nameAr.$anyDirty && $v.benefit.nameAr.$invalid">
                            <small v-if='!$v.benefit.nameAr.required' class='form-text text-danger'>
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-nameEn'>Name En</label>
                        <input type="text" class="form-control" name="nameEn" id="benefit-nameEn"
                            :class="{'valid': !$v.benefit.nameEn.$invalid, 'invalid': $v.benefit.nameEn.$invalid }" v-model="$v.benefit.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-pointsCost'>Points Cost</label>
                        <input type="number" class="form-control" name="pointsCost" id="benefit-pointsCost"
                            :class="{'valid': !$v.benefit.pointsCost.$invalid, 'invalid': $v.benefit.pointsCost.$invalid }" v-model.number="$v.benefit.pointsCost.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='benefit-cost'>Cost</label>
                        <input type="number" class="form-control" name="cost" id="benefit-cost"
                            :class="{'valid': !$v.benefit.cost.$invalid, 'invalid': $v.benefit.cost.$invalid }" v-model.number="$v.benefit.cost.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='benefit-category'>Category</label>
                        <select id='benefit-category' v-model='benefit.category' class='form-control' name='category'>
                            <option v-bind:value='null'></option>
                            <option v-for='categoryOption in categories' :key='categoryOption.id'
                                    v-bind:value='benefit.category && categoryOption.id === benefit.category.id ? benefit.category : categoryOption'>
                                {{ categoryOption.nameAr }}
                            </option>
                        </select>
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='benefit-hospital'>Hospital</label>
                        <select id='benefit-hospital' v-model='benefit.hospital' class='form-control' name='hospital'>
                            <option v-bind:value='null'></option>
                            <option v-for='hospitalOption in hospitals' :key='hospitalOption.id'
                                    v-bind:value='benefit.hospital && hospitalOption.id === benefit.hospital.id ? benefit.hospital : hospitalOption'>
                                {{ hospitalOption.nameAr }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.benefit.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./benefit-update.component.ts">
</script>
