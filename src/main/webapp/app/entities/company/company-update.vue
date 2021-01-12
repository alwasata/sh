<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.company.home.createOrEditLabel" v-text="$t('sahatiApp.company.home.createOrEditLabel')">Create or edit a Company</h2>
                <div>
                    <div class="form-group" v-if="company.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="company.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.company.nameAr')" for="company-nameAr">Name Ar</label>
                        <input type="text" class="form-control" name="nameAr" id="company-nameAr"
                            :class="{'valid': !$v.company.nameAr.$invalid, 'invalid': $v.company.nameAr.$invalid }" v-model="$v.company.nameAr.$model"  required/>
                        <div v-if="$v.company.nameAr.$anyDirty && $v.company.nameAr.$invalid">
                            <small class="form-text text-danger" v-if="!$v.company.nameAr.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.company.nameEn')" for="company-nameEn">Name En</label>
                        <input type="text" class="form-control" name="nameEn" id="company-nameEn"
                            :class="{'valid': !$v.company.nameEn.$invalid, 'invalid': $v.company.nameEn.$invalid }" v-model="$v.company.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.company.email')" for="company-email">Email</label>
                        <input type="text" class="form-control" name="email" id="company-email"
                            :class="{'valid': !$v.company.email.$invalid, 'invalid': $v.company.email.$invalid }" v-model="$v.company.email.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.company.phone')" for="company-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="company-phone"
                            :class="{'valid': !$v.company.phone.$invalid, 'invalid': $v.company.phone.$invalid }" v-model="$v.company.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.company.address')" for="company-address">Address</label>
                        <input type="text" class="form-control" name="address" id="company-address"
                            :class="{'valid': !$v.company.address.$invalid, 'invalid': $v.company.address.$invalid }" v-model="$v.company.address.$model" />
                    </div>
                    <div class="form-group">
                        <label v-text="$t('sahatiApp.company.user')" for="company-user">User</label>
                        <select class="form-control" id="company-user" multiple name="user" v-model="company.users">
                            <option v-bind:value="getSelected(company.users, userOption)" v-for="userOption in users" :key="userOption.id">{{userOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.company.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./company-update.component.ts">
</script>
