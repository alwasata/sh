
<template>

    <div class="row justify-content-center">
        <div class="col-8">
                <h2 id='sahatiApp.invoice.home.createOrEditLabel'>اضافة او تعديل Invoice</h2>
                <!-- <button @click="pdfgenerator()">generate pdf</button>
                 <table class="table" id="pptable">
                    <thead>
                        <tr>
                            <th scope="col">اسم المنفعةبالعربية</th>
                            <th scope="col">اسم المنفعة بالانجليزية</th>
                            <th scope="col">الكمية</th>
                            <th scope="col">نقاط المنفعة</th>
                            <th scope="col"> مجموع النقاط </th>
                            <th scope="col">السعر </th>
                            <th scope="col">مجموع السعر </th>
                            <th scope="col">حذف</th>
                        </tr>
                    </thead>
                 </table> -->
            <form action=""  v-on:submit.prevent="search()" >
                <div class="form-group" v-if="!invoice.id">
                <label for="">رقم البطاقة </label>
                <div class="row">
                    <div class="col col-md-6 col-sm-12 col-xs-12">
                        <input type="text" class="form-control" id="cardNo" name="cardNo"
                               v-model="cardNo" />
                    </div>
                    <div class="col col-md-6 col-sm-12 col-xs-12">
                        <input type="submit" class='btn btn-primary' value="بحث" name="search">
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="form-group col col-md-6 col-sm-12 col-xs-12">
                        <span id="card-error" class="text-danger"></span>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col col-md-6 col-sm-12 col-xs-12 form-group">
                    <label for=""> اسم الموظف</label>
                    <input type="text" disabled class="form-control" v-model="employeeName" name="employeeName">
                </div>
                <div class="col col-md-6 col-sm-12 col-xs-12">
                    <label for=""> اسم الشركة</label>
                    <input type="text" disabled class="form-control" v-model="companyName" name="companyName">
                </div>
            </div>
            <div class="row">
                <div class="col col-md-4 col-sm-12 col-xs-12 form-group">
                    <label for=""> رقم البطاقة</label>
                    <input type="text" disabled class="form-control" v-model="cardNumber" name="cardNo">
                </div>
                <div class="col col-md-4 col-sm-12 col-xs-12">
                    <label for=""> المحفظة</label>
                    <input type="text" disabled class="form-control" v-model="cardPrice" name="cardPrice">
                </div>
                <div class="col col-md-4 col-sm-12 col-xs-12">
                    <label for=""> انتهاء صلاحية البطاقة </label>
                    <input type="text" disabled class="form-control" v-model="exbireDate" name="exbireDate">
                </div>
            </div>
            <div id="benifit-info" style="display:none;">
            <div class="row">
                <div class="col col-md-4 col-sm-12 col-xs-12 form-group">
                    <label for=""> تاريخ الفاتورة</label>
                    <input type="date"  class="form-control" v-model="invoiceDate" name="invoiceDate">
                </div>
            </div>
            <div class="row">
                <div class="col col-md-4 col-sm-12 col-xs-12 col-sm-12 form-group">
                    <label for=""> اختر المنفعة</label>
                    <select id="benefit" class="form-control"  @change="getBeneit($event)" v-model="benefit" name="benefit"></select>
                </div>
                <!-- <div class="col col-md-2 col-sm-12 col-xs-12 col-sm-12 form-group">
                    <label for=""> نقاط المنفعة</label>
                    <input type="number" step="any" min="1" class="form-control" v-model="benefitPrice" v-on:input="changeBenefit()"  name="benefitPoints">
                </div> -->
                <div class="col col-md-2 col-sm-12 col-xs-12 col-sm-12 form-group">
                    <label for="">  السعر</label>
                    <input type="text" disabled class="form-control" v-model="benefitPrice"  name="benefitPrice">
                </div>
                <div class="col col-md-2 col-sm-12 col-xs-12 col-sm-12 form-group">
                    <label for=""> الكمية</label>
                    <input type="number" v-on:input="changeQuantity()"  class="form-control" id="quantity" v-model="quantity" min="1" step="1" required name="quantity">
                </div>
                <div class="col col-md-2 col-sm-12 col-xs-12 col-sm-12 form-group" style="margin-top:30px">
                    <label for=""> </label>
                    <button class="btn btn-success" id="addBenefit" disabled @click="addBenefit" > اضافة </button>
                </div>
            </div>
                <table class="table" id="main-table">
                    <thead>
                        <tr>
                            <th scope="col">اسم المنفعةبالعربية</th>
                            <th scope="col">اسم المنفعة بالانجليزية</th>
                            <th scope="col">الكمية</th>
                            <!-- <th scope="col">نقاط المنفعة</th>
                            <th scope="col"> مجموع النقاط </th> -->
                            <th scope="col">السعر </th>
                            <th scope="col">مجموع السعر </th>
                            <th scope="col">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="fill-table">
                        <tr v-for="(row,index) in rows">
                            <td>{{row.nameAr}}</td>
                            <td>{{row.nameEn}}</td>
                            <td>{{row.quantity}}</td>
                            <!-- <td>{{row.points}}</td>
                            <td>{{row.totalPoints}}</td> -->
                            <td>{{row.price}}</td>
                            <td>{{row.totalPrice}}</td>
                            <td>
                                <button class="btn btn-danger" @click="removeRow(row,index)">
                                    <font-awesome-icon icon="trash" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td></td>
                            <td></td> -->
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> اجمالي السعر : {{totalIvoicePrice}}</td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <div class="row">
                <button id="save-invoice" class="btn btn-primary" disabled @click="saveInvoice">اصدار الفاتورة</button>
            </div>
            </div>
        <div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" src="./invoice-update.component.ts">
</script>
