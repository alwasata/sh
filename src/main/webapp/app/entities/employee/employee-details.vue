<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class='jh-entity-heading'><span>بيانات الموظف</span></h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>الاسم الرباعي</span>
                    </dt>
                    <dd>
                        <span>{{employee.name}}</span>
                    </dd>
                    <dt>
                        <span>رقم الهاتف</span>
                    </dt>
                    <dd>
                        <span>{{employee.phone}}</span>
                    </dd>
                    <dt>
                        <span>رقم الهوية</span>
                    </dt>
                    <dd>
                        <span>{{employee.identityNo}}</span>
                    </dd>
                    <dt>
                        <span>حالة الموظف</span>
                    </dt>
                    <dd>
                        <span>{{ employee.employeeStatus }}</span>
                    </dd>
                    <dt>
                        <span>الملاحظات</span>
                    </dt>
                    <dd>
                        <span>{{employee.notes}}</span>
                    </dd>
                    <dt>
                        <span>شركة</span>
                    </dt>
                    <dd>
                        <div v-if='employee.company'>
                            <router-link :to="{name: 'CompanyView', params: {companyId: employee.company.id}}">
                                {{ employee.company.nameAr }}
                            </router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>الصورة</span>
                    </dt>
                    <dd>
                        <div v-if='attatchment.file' class='clearfix text-success'>
                            <a class='pull-left'
                                v-on:click='openFile(attatchment.fileContentType, attatchment.file)'> اضغط هنا لعرض المرفق</a><br>
                        </div>
                    </dd>
                </dl>
                <button type='submit'
                        v-on:click.prevent='previousState()'
                        class='btn btn-info'>
                    <font-awesome-icon icon='arrow-left'></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
