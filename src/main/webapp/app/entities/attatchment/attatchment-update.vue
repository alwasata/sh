<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.attatchment.home.createOrEditLabel'>اضافة او تعديل Attatchment</h2>
                <div>
                    <div class="form-group" v-if="attatchment.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="attatchment.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='attatchment-name'>الاسم</label>
                        <input type="text" class="form-control" name="name" id="attatchment-name"
                            :class="{'valid': !$v.attatchment.name.$invalid, 'invalid': $v.attatchment.name.$invalid }" v-model="$v.attatchment.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='attatchment-file'>File</label>
                        <div>
                            <div v-if='attatchment.file' class='form-text text-danger clearfix'>
                                <a class='pull-left'
                                   v-on:click='openFile(attatchment.fileContentType, attatchment.file)'>open</a><br>
                                <span
                                    class='pull-left'>{{ attatchment.fileContentType }}, {{ byteSize(attatchment.file) }}</span>
                                <button type='button'
                                        v-on:click='attatchment.file=null;attatchment.fileContentType=null;'
                                        class='btn btn-secondary btn-xs pull-right'>
                                    <font-awesome-icon icon='times'></font-awesome-icon>
                                </button>
                            </div>
                            <input id='file_file' ref='file_file' type='file'
                                   v-on:change="setFileData($event, attatchment, 'file', false)" />
                        </div>
                        <input type="hidden" class="form-control" name="file" id="attatchment-file"
                            :class="{'valid': !$v.attatchment.file.$invalid, 'invalid': $v.attatchment.file.$invalid }" v-model="$v.attatchment.file.$model" />
                        <input type="hidden" class="form-control" name="fileContentType" id="attatchment-fileContentType"
                            v-model="attatchment.fileContentType" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='attatchment-fileUrl'>File Url</label>
                        <input type="text" class="form-control" name="fileUrl" id="attatchment-fileUrl"
                            :class="{'valid': !$v.attatchment.fileUrl.$invalid, 'invalid': $v.attatchment.fileUrl.$invalid }" v-model="$v.attatchment.fileUrl.$model" />
                    </div>
                    <div class='form-group'>
                        <label class='form-control-label' for='attatchment-employee'>موظف</label>
                        <select id='attatchment-employee' v-model='attatchment.employee' class='form-control'
                                name='employee'>
                            <option v-bind:value='null'></option>
                            <option v-for='employeeOption in employees' :key='employeeOption.id'
                                    v-bind:value='attatchment.employee && employeeOption.id === attatchment.employee.id ? attatchment.employee : employeeOption'>
                                {{ employeeOption.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.attatchment.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./attatchment-update.component.ts">
</script>
