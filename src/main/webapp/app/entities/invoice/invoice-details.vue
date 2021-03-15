
<template>

    <div class="row justify-content-center">
        <div class="col-8">
                <h2 id='sahatiApp.invoice.home.createOrEditLabel'></h2>
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
                        </tr>
                    </thead>
                    <tbody id="fill-table">
                        <tr v-for="(row,index) in rows">
                            <td>{{row.nameAr}}</td>
                            <td>{{row.nameEn}}</td>
                            <td>{{row.quantity}}</td>
                            <td>{{row.price}}</td>
                            <td>{{row.totalPrice}}</td>
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
            <div class="row">
                <div class="col col-md-4 col-sm-12 col-xs-12 form-group">
                    <label for=""> تاريخ الفاتورة</label>
                    <input type="date"  class="form-control" v-model="invoiceDate" name="invoiceDate">
                </div>
            </div>
                <div class="col col-md-4 col-sm-12 col-xs-12 form-group">
                    <button @click="printInvoice()" class="btn btn-primary"> طباعة</button>
                </div>
            </div>
        <div>
        </div>
        </div>
</template>
<script lang="ts" src="./invoice-details.component.ts">
</script>
