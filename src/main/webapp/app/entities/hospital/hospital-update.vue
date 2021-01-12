<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sahatiApp.hospital.home.createOrEditLabel" v-text="$t('sahatiApp.hospital.home.createOrEditLabel')">Create or edit a Hospital</h2>
                <div>
                    <div class="form-group" v-if="hospital.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="hospital.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.hospital.nameAr')" for="hospital-nameAr">Name Ar</label>
                        <input type="text" class="form-control" name="nameAr" id="hospital-nameAr"
                            :class="{'valid': !$v.hospital.nameAr.$invalid, 'invalid': $v.hospital.nameAr.$invalid }" v-model="$v.hospital.nameAr.$model"  required/>
                        <div v-if="$v.hospital.nameAr.$anyDirty && $v.hospital.nameAr.$invalid">
                            <small class="form-text text-danger" v-if="!$v.hospital.nameAr.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.hospital.nameEn')" for="hospital-nameEn">Name En</label>
                        <input type="text" class="form-control" name="nameEn" id="hospital-nameEn"
                            :class="{'valid': !$v.hospital.nameEn.$invalid, 'invalid': $v.hospital.nameEn.$invalid }" v-model="$v.hospital.nameEn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.hospital.email')" for="hospital-email">Email</label>
                        <input type="text" class="form-control" name="email" id="hospital-email"
                            :class="{'valid': !$v.hospital.email.$invalid, 'invalid': $v.hospital.email.$invalid }" v-model="$v.hospital.email.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.hospital.phone')" for="hospital-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="hospital-phone"
                            :class="{'valid': !$v.hospital.phone.$invalid, 'invalid': $v.hospital.phone.$invalid }" v-model="$v.hospital.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sahatiApp.hospital.address')" for="hospital-address">Address</label>
                        <input type="text" class="form-control" name="address" id="hospital-address"
                            :class="{'valid': !$v.hospital.address.$invalid, 'invalid': $v.hospital.address.$invalid }" v-model="$v.hospital.address.$model" />
                    </div>
                    <div class="form-group">
                        <label v-text="$t('sahatiApp.hospital.user')" for="hospital-user">User</label>
                        <select class="form-control" id="hospital-user" multiple name="user" v-model="hospital.users">
                            <option v-bind:value="getSelected(hospital.users, userOption)" v-for="userOption in users" :key="userOption.id">{{userOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.hospital.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./hospital-update.component.ts">
</script>
