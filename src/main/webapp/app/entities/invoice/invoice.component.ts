import { IHospital } from './../../shared/model/hospital.model';
import HospitalService from '@/entities/hospital/hospital.service';
import { mixins } from 'vue-class-component';

import { Component, Inject, Vue } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IInvoice, InvoiceStatus } from '@/shared/model/invoice.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import InvoiceService from './invoice.service';
import AccountService from '@/account/account.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Invoice extends mixins(AlertMixin) {
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('hospitalService') private hospitalService: () => HospitalService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public search = '';
  public dateFrom = new Date();
  public dateTo = new Date();
  public hospitals: IHospital[] = [];
  public hospitalid = '';
  public invoiceStatus = '';
  public hospitalName = '';

  public invoices: IInvoice[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllInvoices(this.search);

    this.retrieveHospitals('');
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllInvoices(this.search);
  }
  public searchInput(): void {
    this.page = 1;
    this.retrieveAllInvoices(this.search);
  }

  public retrieveHospitals(search): void {
    search = search == '' ? 'false' : search;
    this.hospitalService()
      .retrieve(search)
      .then(res => {
        this.hospitals = res.data;
        console.log(this.hospitals);
        console.log('RESDATA = ' + res.data);
      });
  }

  public retrieveAllInvoices(search): void {
    search = search == '' ? 'false' : search;
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.invoiceService()
      .retrieve(search, paginationQuery)
      .then(
        res => {
          console.log(res.data);
          this.invoices = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }
  public prepareApprove(instance: IInvoice): void {
    console.log(instance);
    instance.invoiceStatus = InvoiceStatus.APPROVED;
    instance.notes = 'تم تأكيد الفاتورة بتاريخ ' + new Date();
    this.invoiceService()
      .update(instance)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        alert(err);
      });
  }

  public getInvoices(): void {
    if (!this.checkDates()) {
      return alert('تأكد من مدخلات المطالبة');
    }
    console.log('this is in frontend ');
    console.log('Selected hospital id = ' + this.hospitalid);
    this.invoiceService()
      .getInvoices(this.invoiceStatus, this.dateFrom, this.dateTo)
      .then(res => {
        this.invoices = res;
        this.printInvoiceReport();
      });
  }

  public checkDates(): boolean {
    console.log('datefrom: ' + this.dateFrom + 'dateto' + this.dateTo);
    if (this.dateFrom == null || this.dateTo == null || this.invoiceStatus == '') {
      return false;
    }

    if (this.dateFrom > this.dateTo || this.dateFrom.toString() == this.dateTo.toString()) {
      return false;
    }

    return true;
  }

  public getInvoicesAdmin(): void {
    if (!this.checkDates()) {
      return alert('تأكد من مدخلات المطالبة');
    }
    console.log('this is in frontend ' + status);
    console.log('Selected hospital id = ' + this.hospitalid);
    this.invoiceService()
      .getInvoicesAdmin(this.invoiceStatus, this.hospitalid, this.dateFrom, this.dateTo)
      .then(res => {
        this.invoices = res;
        this.hospitalName = this.hospitals.find(o => o.id.toString() == this.hospitalid).nameAr;
        this.printInvoiceReportAdmin();
      });
  }

  public prepareRemove(instance: IInvoice): void {
    console.log(instance);
    this.removeId = instance.id;
    console.log(this.removeId);
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }
  public hasRole(roles: any): boolean {
    if (this.userAuthorities() == null) {
      return false;
    }
    for (const element of roles) {
      if (this.$store.getters.account.authorities.includes(element)) {
        return true;
      }
    }
  }
  public userAuthorities() {
    return this.accountService().getAuthorities();
  }

  public removeInvoice(): void {
    this.invoiceService()
      .delete(this.removeId)
      .then(param => {
        console.log(param);
        if (param.data == 'error') {
          document.getElementById('invoice-error').innerHTML = 'لا يمكن الغاء هذه الفاتورة لقد تم ارجاع جميع اصنافها ';
        } else {
          this.removeId = null;
          this.retrieveAllInvoices(this.search);
          this.closeDialog();
        }
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    // if (this.propOrder !== 'id') {
    //   result.push('id');
    // }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllInvoices(this.search);
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public sortWith(e): void {
    console.log(e);
    this.search = e;
    this.retrieveAllInvoices(this.search);
  }
  public printInvoiceReport(): void {
    var mywindow = window.open('', 'PRINT', 'height=600,width=900');
    //this.$store.getters.account.nameAr
    mywindow.document.write('<html><head><title> ' + this.$store.getters.account.login + ' : اسم المستشفى  </title>');
    mywindow.document.write('</head><body dir="rtl">');
    mywindow.document.write('<style> th, .tdborder {border-bottom: 1px solid #ddd; }</style>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write(
      "<span style='foint-size:16px; '> رقم المطالبة : " +
        'MO-' +
        new Date().getFullYear() +
        '-' +
        new Date().getMonth() +
        '-' +
        Math.floor(1000 + Math.random() * 9000) +
        '</span>'
    );
    mywindow.document.write(
      "<span style='foint-size:16px;margin-right:40px;'>اسم المستشفى : " + this.$store.getters.account.login + '</span>'
    );
    mywindow.document.write('</div>');
    mywindow.document.write("<hr><div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>الفواتير :- </span>");
    mywindow.document.write('<table>');
    mywindow.document.write(`
    <thead>
    <tr>
    <th style="padding-top: 10px; padding-left: 40px;">رقم الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">رقم فاتورة معاملات</th>
    <th style="padding-top: 10px; padding-left: 40px;">حالة الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">تاريخ الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">رقم بطاقة المنتفع</th>
    <th style="padding-top: 10px; padding-left: 40px;">اجمالي الفاتورة</th>
    </tr>
    </thead>
    `);
    mywindow.document.write('<tbody>');
    var sumOfTotals = 0;
    this.invoices.forEach(element => {
      mywindow.document.write(`
      <tr>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceNo}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.moamalatId}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceStatus}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceDate}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.cardTransaction.card.cardNo}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.total}</td>
      </tr>
      `);
      sumOfTotals += element.total;
    });
    mywindow.document.write(`
    <tr>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;">اجمالي السعر : ${sumOfTotals}</td>
    </tr>
    `);
    mywindow.document.write('</tbody>');
    mywindow.document.write('</table>');
    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    location.reload();
  }
  public printInvoiceReportAdmin(): void {
    var mywindow = window.open('', 'PRINT', 'height=600,width=900');
    //this.$store.getters.account.nameAr
    mywindow.document.write('<html><head><title> ' + this.hospitalName + ' : اسم المستشفى  </title>');
    mywindow.document.write('</head><body dir="rtl">');
    mywindow.document.write('<style> th, .tdborder {border-bottom: 1px solid #ddd; }</style>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write(
      "<span style='foint-size:16px; '> رقم المطالبة : " +
        'MO-' +
        new Date().getFullYear() +
        '-' +
        new Date().getMonth() +
        '-' +
        Math.floor(1000 + Math.random() * 9000) +
        '</span>'
    );
    mywindow.document.write("<span style='foint-size:16px;margin-right:40px;'>اسم المستشفى : " + this.hospitalName + '</span>');
    mywindow.document.write('</div>');
    mywindow.document.write("<hr><div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>الفواتير :- </span>");
    mywindow.document.write('<table>');
    mywindow.document.write(`
    <thead>
    <tr>
    <th style="padding-top: 10px; padding-left: 40px;">رقم الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">رقم فاتورة معاملات</th>
    <th style="padding-top: 10px; padding-left: 40px;">حالة الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">تاريخ الفاتورة</th>
    <th style="padding-top: 10px; padding-left: 40px;">رقم بطاقة المنتفع</th>
    <th style="padding-top: 10px; padding-left: 40px;">اجمالي الفاتورة</th>
    </tr>
    </thead>
    `);
    mywindow.document.write('<tbody>');
    var sumOfTotals = 0;
    this.invoices.forEach(element => {
      mywindow.document.write(`
      <tr>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceNo}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.moamalatId}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceStatus}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.invoiceDate}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.cardTransaction.card.cardNo}</td>
      <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.total}</td>
      </tr>
      `);
      sumOfTotals += element.total;
    });
    mywindow.document.write(`
    <tr>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;"></td>
    <td style="padding-top: 10px; padding-left: 40px;">اجمالي السعر : ${sumOfTotals}</td>
    </tr>
    `);
    mywindow.document.write('</tbody>');
    mywindow.document.write('</table>');
    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    location.reload();
  }
}
