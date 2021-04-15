<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id='sahatiApp.employee.home.createOrEditLabel'>اضافة او تعديل موظف</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for='id'>ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-name'>الاسم</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-phone'>رقم الهاتف</label>
                        <input type="number" class="form-control" name="phone" id="employee-phone"
                            :class="{'valid': !$v.employee.phone.$invalid, 'invalid': $v.employee.phone.$invalid }" v-model="$v.employee.phone.$model" />
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-identityNo'>رقم الهوية</label>
                        <input type="text" class="form-control" name="identityNo" id="employee-identityNo"
                            :class="{'valid': !$v.employee.identityNo.$invalid, 'invalid': $v.employee.identityNo.$invalid }" v-model="$v.employee.identityNo.$model" />
                    </div>
                    <div class="form-group">
                      <div v-if="employee.employeeStatus">
                        <label class='form-control-label' for='employee-employeeStatus'>حالة الموظف</label>
                        <select class='form-control' name='employeeStatus'
                                :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }"
                                 v-model='$v.employee.employeeStatus.$model' id='employee-employeeStatus'>
                            <option value='PENDING'>PENDING</option>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                      </div>
                      <div v-else>
                        <select class='form-control' name='employeeStatus'
                                :class="{'valid': !$v.employee.employeeStatus.$invalid, 'invalid': $v.employee.employeeStatus.$invalid }"
                                hidden id='employee-employeeStatus'>
                            <option selected value='PENDING'>PENDING</option>
                            <option value='APPROVED'>APPROVED</option>
                            <option value='REFUSED'>REFUSED</option>
                            <option value='CANCELLED'>CANCELLED</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='employee-notes'>الملاحظات</label>
                        <input type="text" class="form-control" name="notes" id="employee-notes"
                            :class="{'valid': !$v.employee.notes.$invalid, 'invalid': $v.employee.notes.$invalid }" v-model="$v.employee.notes.$model" />
                    </div>
                    <div class='form-group' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <label class='form-control-label' for='employee-company'>شركة</label>
                        <select id='employee-company' v-model='employee.company' class='form-control' name='company'>
                            <option v-bind:value='null'></option>
                            <option v-for='companyOption in companies' :key='companyOption.id'
                                    v-bind:value='employee.company && companyOption.id === employee.company.id ? employee.company : companyOption'>
                                {{ companyOption.nameAr }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class='form-control-label' for='attatchment-file'>File</label>
                        <div>
                            <div id="img-file"  class='form-text text-danger clearfix'>
                                
                                <!-- <img :src="`data:image/png;base64,aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQXRnQUFBRzZDQVlBQUFBeUJ6SEpBQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFBQmwwUlZoMFUyOW1kSGRoY21VQVoyNXZiV1V0YzJOeVpXVnVjMmh2ZE84RHZ6NEFBQ0FBU1VSQlZIaWM3TjNYYjV4M251Zjc5L004bFZpc0tpWWxTc3hKcENJbEsxczUwR0Y2ZGdibnpPenNvdmRtTHhaN2NmNkp2ZGkvWW5Hd3dQVEJZakZBOSs3TWp0dFJiY25La1FyTWlpUkZTWlNZeWNyMWhITkJrVzExMjIxYktvbEY2Zk1DYUFLR0lUNGwwZFNIUDM1KzM2OEJlSWlJaUlpSXlHdjUxYTkreFgvOXIvOFZjNmtmUkVSRVJFVGtYYUtBTFNJaUlpS1NSd3JZSWlJaUlpSjVwSUF0SWlJaUlwSkhDdGdpSWlJaUlubWtnQzBpSWlJaWtrY0syQ0lpSWlJaWVhU0FMU0lpSWlLU1J3cllJaUlpSWlKNXBJQXRJaUlpSXBKSEN0Z2lJaUlpSW5ta2dDMGlJaUlpa2tjSzJDSWlJaUlpZWFTQUxTSWlJaUtTUndyWUlpSWlJaUo1cElBdElpSWlJcEpIQ3RnaUlpSWlJbm1rZ0MwaUlpSWlra2NLMkNJaUlpSWllYVNBTFNJaUlpS1NSd3JZSWlJaUlpSjVwSUF0SWlJaUlwSkhDdGdpSWlJaUlubVF5K1VBQld3UkVSRVJrYnd3REFOUXdCWVJFUkVSeVF1Znp3Y29ZSXVJaUlpSTVKVUN0b2lJaUloSUhpbGdpNGlJaUlqa2tRSzJpSWlJaUVnZUtXQ0xpSWlJaU9TUkFyYUlpSWlJU0I0cFlJdUlpSWlJNUpFQ3RvaUlpSWhJSGlsZ2k0aUlpSWpra1FLMmlJaUlpRWdlS1dDTGlJaUlpT1NSQXJhSWlJaUlTQjRwWUl1SWlJaUk1SkVDdG9pSWlJaElIaWxnaTRpSWlJamtrUUsyaUlpSWlFZ2VLV0NMaUlpSWlPU1JBcmFJaUlpSVNCNHBZSXVJaUlpSTVKRUN0b2lJaUloSUhpbGdpNGlJaUlqa2tRSzJpSWlJaUVnZUtXQ0xpSWlJaU9TUkFyYUlpSWlJU0I0cFlJdUlpSWlJNUpFQ3RvaUlpSWhJSGlsZ2k0aUlpSWprZ2VkNWdBSzJpSWlJaUVoZTJMWU5LR0NMaUlpSWlPU0ZZUmlBQXJhSWlJaUlTRjc0ZkQ1QUFWdEVSRVJFSks4VXNFVkVSRVJFOGtnQlcwUkVSRVFranhTd1JVUkVSRVR5U0FGYlJFUkVSQ1NQRkxCRlJFUkVSUEpJQVZ0RVJFUkVKSThVc0VWRVJFUkU4a2dCVzBSRVJFUWtqeFN3UlVSRVJFVHlTQUZiUkVSRVJDU1BGTEJGUkVSRVJQSklBVnRFUkVSRUpJOFVzRVVrYnl6THdqQ01wWDRNRVJHUkplVmI2Z2NRa1hkSFdWa1pudWVSU0NUSVpyTzRycnZVanlRaUl2TFdLV0NMU042c1hyMmFMVnUyTURRMHhMMTc5NWlhbWlLWHl5MzFZNG1JaUx4VkN0Z2lrbGYvOEEvL1FDYVQ0YnZ2dnVQMDZkT01qSXlRU0NSd0hHZXBIMDFFUk9TdFVNQVdrYndxS1NuaHd3OC9aT2ZPbld6ZXZKbHZ2LzJXNjlldk16bzZTanFkVm0xRVJFVGVlUXJZSXN1QWFVREFOSEU5ajV6cjRTMzFBLzBNZGJWMS9PZi8vSi9adVhNbjMzenpEU2RQbnFTM3Q1ZUppUWx5dVJ5ZXR4eGVoWWlJeUMrbmdDMnlEQlJaSmh0aVlXelA0MUV5eTB6T0p1Y1dka0JOcHBLNHJzdldyVnRwYTJ0ajY5YXRmUFBOTjV3NmRZcWhvU0ZtWjJkVkd4RVJrWGVTQXJiSU1sRHNzL2kwc293MUlUK1hKK0pjbkp6amNTcEx5blp4Q3ZRa2VIeDhuSHYzN2xGVFU4T2FOV3ZvNk9oZzgrYk5iTm15aFQvODRROWN1blNKcDArZmtrcWxWQnNSRVpGM2lnWDhsNlYrQ0JINXk0cDlGbis3dG95L1hWdE9heXhFek8vRE5DRHRlbVJkRjVmQ3FJMnNXcldLVHovOWxKcWFHcDQrZmNwLy8rLy9uWnMzYitJNERzWGhZbGF1WE1rSEgzeEFjM016RlJVVk9JNURLcFVpazhrb1pJdUl5TExYMHRMQzBhTkhkWUl0c3B3WUJyUkVpMWhiRkdCN2FUSGZQcC9od3ZnY2R4SnBwaks1Z3V0bkR3d01jT0hDQlM1ZHVzU0pFeWM0ZXZRb3JhMnR0TFcxMGRiV1JudDdPOTk4OHczZmZ2c3Q5Ky9mWjJabUJ0dTJsL3F4UlVSRVhvc0N0c2d5RlBGWjdLMkkwRkFjWkZ0cE1hZkdaamsvUHNlalpJYTQ3UlJjYmVUU3BVdjA5dlp5NjlZdGpoMDd4cEVqUjZpcHFlSFFvVU5zM0xoeHNUWnk3dHc1bmp4NVFpS1IwSW0yaUlnc1c2cUlpQ3dEeFQ2TG82dEthSTBWNFRmL3VJbzg0ck5vam9ab0tnNVJIdlJobVFacHh5WGplamdlYi8wMCsvc1ZrWW1KQ1Q3Ly9ITWVQWHFFNjdwa01oa0dCZ2JvNit0Ym5DUlNYRnhNUlVVRjdlM3R0TFMwc0dyVktqelBJNWxNa3Nsa2RBbFNSRVNXbFlXS2lBSzJ5REx3WXdGN1FWbkFSMXMwVEVOeGtLamZoNHRIeHZYSXVoN3VXenpOL2tzQmU4SE16QXlkblozY3YzK2Z5Y2xKTE1zaUhBNVRWVlhGbmoxN3FLbXBJUmFMa2Nsa1NLZlRaTE5aamZRVEVaRmxRUjFza1hkTXlETFlYbFpNYlRoSWUybVkwODluT1Q4eHgyQWl6VXpXd1M2d2tIcnIxaTM2Ky91NWVmTW14NDRkNDlpeFl6UTBOTEI3OSs3RnNYNG5UNTdrM0xsekRBOFBNemMzcHhOdEVSRXBhQXNIU2pyQkZsa0dmdW9FKy92Q1BwT0c0aEJOa1JDclF3SDhwa1hTY2NtK2hkckl6em5CL2o3SGNYajQ4Q0hkM2QwOGUvYU1kRHBOTkJxbHRMU1VUWnMyMGRyYXlwbzFhd0JJSkJKa3Mxa2N4OUdKdG9pSUZLU0doZ1pPbkRpaGdDMnlIUHlTZ0wyZ3hPK2pOVnBFWXlSRXpHOWhHQVpwOTBVLyt3M0Y3Rjhhc0Jja0VnbTZ1N3U1YytjTzQrUGplSjVIY1hFeGxaV1Y3Tml4ZzdxNk9rcExTN0Z0bTFRcVJUYWIxU1ZJRVJFcE9DMHRMUncvZmx3VkVaRjNtYzgwMkJncm9pb1VZRnRKTWFmR1pqZy9FZWQrUE1WVXR2QzJRUTRNREhEMzdsMXVkTjdnMlBINTJzajY5ZXZadG0zYlMyUDl6cDQ5eThPSEQ1bVptVkZ0UkVSRUNvWmxXZlB2MFFtMlNNRjdsUlBzN3d0WkpyWEZRWm9qSWFxS0FnUXNrNFRqa25IZHZOWkdYdlVFKy9zOHorUFJ5Q051Mzc3TjA2ZFBTU2FUbEpTVUVJMUcyYkJoQXhzMmJHRHQycldZcGtrOEhsZHRSRVJFQ29hbWlJZ3NJNjhic0JkRS9SYnJYOVJHU3Z3V1BzTjRzUTNTdy9GZWYwbE5QZ0wyZ25RNnpjREFBUDM5L1l5TmpTMk85VnU5ZWpYYnQyK25vYUdCRlN0VzRMcnVZbTFFcDlraUlyS1VGTEJGbHBGOEJld0ZGUy9HK3RVWEI0bjRMVnp2ZTJ2WFh5Tmw1ek5nTDVpZW5xYXpzNU1IRHg0d1BUMjlPTmF2dHJhV25UdDNVbFZWUlhGeE1ibGNqblE2VFM2WFV6OWJSRVNXaE1iMGliem5pbjBtdThvajFDMXNnM3crdy9tSk9ZWVNHZUs1d2h2cmQvUG1UZTdldmN2Tm16YzVjdVRJNGxpL1E0Y08wZGJXeG80ZE8vanl5eSs1ZVBFaUl5TWp4T054QlcwUkVWa1NPc0VXV1FieWZZTDlwNzkyVXlSRVl5VEVpcEFmdjJtU2NsOXRHK1NiT01IK3Zsd3V4NE1IRCtqcDZWa2M2eGVMeFZpeFlnVmJ0MjZsc2JHUnRXdlg0cnJ1NGxnLzEzWFZ6eFlSa2JkQ0o5Z2k4cEw2NGlEclFuNjJ4c0o4T3hiaS9FU2MzcGtrNDVrY0djZDk2MnZYLzVMUjBWSCs1Ly84bjl5NGNZT3VyaTZPSERuQzl1M2JhV3hzcExXMWxZMGJOeTVPRytudDdXVnFhb3BjTHFlZ0xTSWliNFVDdG9nc0NsZ21XMHZEVkljWHh2ck5iNE44RUU4em5iT3hDMnlzWDM5L1B3OGVQS0N6czVQang0OXo5T2hSV2xwYTJMTm5EK3ZYcjMrcE5qSTRPTWpzN0t3dVFvcUl5QnVuaW9qSU12QW1LeUkvcE1neXFTc08waFFKc2ZiRldMK2ZzdzN5VFZkRWZvampPRHg2OUlpZW5oNmVQSGxDTXBHa3BMU0Vzckl5Tm03Y1NITnpNOVhWMVhpZVJ6d2VKNWZMYWF5ZmlJaThFYXFJaU1oUHFnNEhXRmRVem9ab0VhM1JJczZQejlFMWsrUjVPa3ZtTlNlTzVOdjQrRGovL00vL3pLMWJ0K2pwN2VIUW9VUHMyYjJIcXFvcW1wdWJhVzF0NWVUSms1dzVjNGJidDI4ek9UbEpOcHRWMEJZUmtielRDYmJJTXZDMlQ3Qy96ekJnWmRCUFc3U0l1aGRqL1p3ZkdldTNGQ2ZZZjJwNmVwb2JOMjRzYm5vMFRaTndPRXhqWXlQdDdlM1UxTlFRQ29VVzE2NXJySitJaU9TTFRyQkY1QmVKK2kzMlZVU3BYeHpyTjh1NThWbEdVbG5pT1FlbmdFNkNYZGVsczdPVCsvZnYwOW5aeWRHalJ6`" /> -->
                                <!-- <img :src="qrImg"> -->
                            </div>
                            <!-- <div v-if='attatchment.file' class='form-text text-danger clearfix'>
                                <a class='pull-left'
                                   v-on:click='openFile(attatchment.fileContentType, attatchment.file)'>open</a><br>
                                <span
                                    class='pull-left'>{{ attatchment.fileContentType }}, {{ byteSize(attatchment.file) }}</span>
                                <button type='button'
                                        v-on:click='attatchment.file=null;attatchment.fileContentType=null;'
                                        class='btn btn-secondary btn-xs pull-right'>
                                    <font-awesome-icon icon='times'></font-awesome-icon>
                                </button>
                            </div> -->
                            <input id='file_file' ref='file_file' type='file'
                                   v-on:change="setFileData($event, attatchment, 'file', false)" />
                        </div>
                        <input type="hidden" class="form-control" name="file" id="attatchment-file"
                            :class="{'valid': !$v.attatchment.file.$invalid, 'invalid': $v.attatchment.file.$invalid }" v-model="$v.attatchment.file.$model" />
                        <input type="hidden" class="form-control" name="fileContentType" id="attatchment-fileContentType"
                            v-model="attatchment.fileContentType" />
                    </div>
                </div>
                <div>
                    <button type='button' id='cancel-save' class='btn btn-secondary' v-on:click='previousState()'>
                        <font-awesome-icon icon='ban'></font-awesome-icon>&nbsp;<span>الغاء</span>
                    </button>
                    <button type='submit' id='save-entity' :disabled='$v.employee.$invalid || isSaving'
                            class='btn btn-primary'>
                        <font-awesome-icon icon='save'></font-awesome-icon>&nbsp;<span>حفظ</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
