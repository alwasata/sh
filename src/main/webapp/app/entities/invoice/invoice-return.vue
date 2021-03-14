
<template>

    <div class="row justify-content-center">
        <div class="col-8">
                <h2 id='sahatiApp.invoice.home.createOrEditLabel'>ارجاع الفاتورة</h2>

            <!-- <form action="" v-on:submit.prevent="retrieveInvoice()">
                <div class="form-group">
                <label for="">رقم الفاتورة </label>
                <div class="row">
                    <div class="col col-md-6 col-sm-12 col-xs-12">
                        <input type="text" class="form-control" id="invoiceNo" name="invoiceNo"
                               v-model="invoiceNo" />
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
            </form> -->
            <hr>
            <h4>- بيانات الموظف </h4>
            <br>
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
                    <label for=""> النقاط</label>
                    <input type="text" disabled class="form-control" v-model="cardPoint" name="cardPoint">
                </div>
                <div class="col col-md-4 col-sm-12 col-xs-12">
                    <label for=""> انتهاء صلاحية البطاقة </label>
                    <input type="text" disabled class="form-control" v-model="exbireDate" name="exbireDate">
                </div>
            </div>
            <hr>
            <h4>- بيانات الفانورة رقم : {{ invoiceNo }}</h4>
            <div class="row">
               <table class="table" id="main-table">
                    <thead>
                        <tr>
                            <th scope="col">اسم المنفعةبالعربية</th>
                            <th scope="col">اسم المنفعة بالانجليزية</th>
                            <th scope="col">الكمية</th>
                            <th scope="col">السعر </th>
                            <th scope="col">مجموع السعر </th>
                            <th scope="col">
                                الكمية المرتجعة
                            </th>
                            <th scope="col">ارجاع</th>
                        </tr>
                    </thead>
                    <tbody id="fill-table">
                        <tr v-for="(row,index) in rows">
                            <td>{{row.nameAr}}</td>
                            <td>{{row.nameEn}}</td>
                            <td>{{row.quantity}}</td>
                            <td>{{row.price}}</td>
                            <td>{{row.totalPrice}}</td>
                            <td>
                                <input type="number" v-model="row.returnQuantity">
                                <br>
                                <label  class="text-danger" id="error-quantity"></label>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="returnBenefit(row, index)">
                                    ارجاع
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td> مجموع النقاط : {{total}}</td>
                            <td></td>
                            <td> اجمالي السعر : {{totalIvoicePrice}}</td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr>
            <h4>المنفعات المرتجعة</h4>
            <div class="row">
               <table class="table" id="main-table">
                    <thead>
                        <tr>
                            <th scope="col">اسم المنفعةبالعربية</th>
                            <th scope="col">اسم المنفعة بالانجليزية</th>
                            <th scope="col">الكمية</th>
                            <th scope="col">السعر </th>
                            <th scope="col">مجموع السعر </th>
                            <th scope="col">ارجاع</th>
                        </tr>
                    </thead>
                    <tbody id="fill-table">
                        <tr v-for="(row,index) in returnBenefits">
                            <td>{{row.nameAr}}</td>
                            <td>{{row.nameEn}}</td>
                            <td>{{row.quantity}}</td>
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
                            <td></td>
                            <td> مجموع النقاط : {{ returnTotal}}</td>
                            <td></td>
                            <td> اجمالي السعر : {{ returnTotalIvoicePrice}}</td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col col-md-4 col-sm-12 col-xs-12 form-group">
                    <label for=""> تاريخ الفاتورة</label>
                    <input type="date"  class="form-control" v-model="invoiceDate" name="invoiceDate">
                </div>
            </div>
            <div class="row">
                <button id="save-invoice" class="btn btn-primary" disabled @click="saveInvoice">اصدار الفاتورة</button>
            </div>
            </div>
        <div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" src="./invoice-return.component.ts">
</script>
