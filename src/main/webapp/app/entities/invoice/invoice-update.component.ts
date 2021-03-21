import { Component, Inject, Vue } from 'vue-property-decorator';

import CardTransactionService from '../card-transaction/card-transaction.service';
import { ICardTransaction } from '@/shared/model/card-transaction.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoice, Invoice, InvoiceStatus } from '@/shared/model/invoice.model';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import InvoiceService from './invoice.service';
import SettingService from '../setting/setting.service';
import pdfMake from 'pdfmake-arabic/build/pdfmake';
import pdfFonts from 'pdfmake-arabic/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const validations: any = {
  invoice: {
    invoiceNo: {},
    invoiceDate: {},
    payDate: {},
    total: {},
    createdBy: {},
    totalInvoicePoints: {},
    invoiceStatus: {},
    hosbital: {},
    notes: {},
  },
};

@Component({
  validations,
})
export default class InvoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  public invoice: IInvoice = new Invoice();

  public cardNo = '';
  public employeeName = '';
  public employeePoints = 0.0;
  public companyName = '';
  public cardPoint = 0;
  public exbireDate = '';
  public cardNumber = '';
  public benefit = '';
  public benefitPoints = 0;
  public oldBenefitPoints = 0;
  public benefitPrice = 0;
  public total = 0;
  public totalIvoicePrice = 0;
  public quantity = 1;
  public cardId = '';
  public hosbitalName = '';
  public invoiceDate = new Date().toISOString().slice(0, 10);
  public rows = [];

  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;

  public cardTransactions: ICardTransaction[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceId) {
        vm.retrieveInvoice(to.params.invoiceId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.invoice.id) {
      this.invoiceService()
        .update(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Invoice is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.invoiceService()
        .create(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Invoice is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public search(): void {
    (document.getElementById('benifit-info') as HTMLStyleElement).style.cssText = 'display:none;';
    document.getElementById('benefit').innerHTML = '';
    document.getElementById('card-error').textContent = '';
    this.invoiceService()
      .search(this.cardNo)
      .then(res => {
        console.log(res);
        if (res == '') {
          document.getElementById('card-error').textContent = 'يجب عليك ادخال رقم بطاقة صحيح';
          return;
        }
        this.employeeName = res.cardInfo[0][0].card.employee.name;
        this.companyName = res.cardInfo[0][0].card.employee.company.nameAr + ' | ' + res.cardInfo[0][0].card.employee.company.nameEn;
        this.cardNumber = res.cardInfo[0][0].card.cardNo;
        this.cardId = res.cardInfo[0][0].card.id;
        this.exbireDate = res.cardInfo[0][0].card.expiryDate;
        var points = 0;
        var pointsPlus = 0;
        var pointsMinus = 0;
        document.getElementById('benifit-info').style.cssText = 'display:block;';

        res.cardInfo[0].forEach(element => {
          console.log(points);

          if (element.action == 'PLUS') {
            pointsPlus = pointsPlus + element.pointsAmount;
            console.log(pointsPlus);
          } else {
            pointsMinus = pointsMinus + element.pointsAmount;
            if (pointsMinus < 0) {
              pointsMinus = pointsMinus * -1;
            }
          }
        });
        points = pointsPlus - pointsMinus;
        if (points < 0) {
          points = points * -1;
        }
        this.hosbitalName = res.benefit[0].hospital.nameAr;
        this.employeePoints = points;
        res.benefit.forEach(element => {
          document.getElementById(
            'benefit'
          ).innerHTML += `<option value="${element.benefit.id}">${element.benefit.nameAr} | ${element.benefit.nameEn}</option>`;
        });
        this.cardPoint = points;
      });
  }

  public getBeneit(event): void {
    (document.getElementById('addBenefit') as HTMLButtonElement).disabled = false;
    this.invoiceService()
      .getBeneit(event.target.value)
      .then(res => {
        console.log(res);
        this.benefitPoints = res.benefit.cost * res.setting[0][0].value;
        this.oldBenefitPoints = res.benefit.cost * res.setting[0][0].value;
        this.benefitPrice = res.benefit.cost;
      });
  }

  public changeBenefit(): void {
    if (this.benefitPoints > this.oldBenefitPoints) {
      this.benefitPoints = this.oldBenefitPoints;
    }
    if (!this.benefitPoints) {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = false;
    }
  }

  public addBenefit(): void {
    (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    if (this.rows != []) {
      (document.getElementById('save-invoice') as HTMLButtonElement).disabled = false;
    }
    var e = document.getElementById('benefit') as HTMLSelectElement;
    var value = e.options[e.selectedIndex].value;
    this.invoiceService()
      .getBeneit(value)
      .then(res => {
        if (this.total + this.benefitPoints * this.quantity < this.employeePoints) {
          var checkBenefit = false;
          this.rows.forEach(element => {
            if (element.id.includes(res.benefit.id) == true) {
              checkBenefit = true;
            }
          });

          if (checkBenefit == false) {
            this.total = this.total + this.benefitPoints * this.quantity;
            this.totalIvoicePrice = this.totalIvoicePrice + this.benefitPrice * this.quantity;
            this.rows.push({
              id: res.benefit.id,
              nameAr: res.benefit.nameAr,
              quantity: this.quantity,
              nameEn: res.benefit.nameEn,
              points: this.benefitPoints,
              totalPoints: this.benefitPoints * this.quantity,
              price: res.benefit.cost,
              totalPrice: this.quantity * res.benefit.cost,
            });
          }
        }
      });
  }

  public removeRow(row, indx) {
    (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    if (this.rows.length == 0) {
      (document.getElementById('save-invoice') as HTMLButtonElement).disabled = false;
    }
    this.total = this.total - row.totalPoints;
    this.totalIvoicePrice = this.totalIvoicePrice - row.totalPrice;
    this.rows.splice(indx, 1);
  }

  public saveInvoice() {
    (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    this.invoice.total = this.totalIvoicePrice;
    // this.invoice.totalInvoicePoints = this.total;
    this.invoice.invoiceStatus = InvoiceStatus.APPROVED;
    this.invoice.invoiceDate = new Date(this.invoiceDate);
    this.invoice.payDate = new Date(this.invoiceDate);
    this.invoice.invoiceNo = 'IN-' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + Math.floor(1000 + Math.random() * 9000);
    var data = {
      invoiceBenefit: this.rows,
      invoice: this.invoice,
      cardTransaction: {
        amount: this.totalIvoicePrice,
        pointsAmount: this.total,
        action: 'MINUS',
        notes: 'خصم من البطاقة بسبب اصدار فاتورة رقم : ' + this.invoice.invoiceNo,
        card: this.cardId,
      },
    };
    this.invoiceService()
      .saveInvoice(data)
      .then(res => {
        var mywindow = window.open('', 'PRINT', 'height=600,width=900');

        mywindow.document.write('<html><head><title> ' + this.hosbitalName + ' : اسم المستشفى  </title>');
        mywindow.document.write('</head><body dir="rtl">');
        mywindow.document.write('<style> th, .tdborder {border-bottom: 1px solid #ddd; }</style>');
        mywindow.document.write("<div class='row' style='margin-top:15px'>");
        mywindow.document.write("<span style='foint-size:16px; '> رقم الفاتورة : " + res.invoiceNo + '</span>');
        mywindow.document.write("<span style='foint-size:16px;margin-right:40px;'>اسم المستشفى : " + this.hosbitalName + '</span>');
        mywindow.document.write('</div>');
        mywindow.document.write("<div class='row' style='margin-top:15px'>");
        mywindow.document.write("<span style='foint-size:16px;'>اسم الموظف : " + this.employeeName + '</span>');
        mywindow.document.write('</div>');
        mywindow.document.write("<div class='row' style='margin-top:15px'>");
        mywindow.document.write("<span style='foint-size:16px;'>رقم البطاقة  : " + this.cardNumber + '</span>');
        mywindow.document.write('</div>');
        mywindow.document.write("<div class='row' style='margin-top:15px'>");
        mywindow.document.write("<span style='foint-size:16px;'>اسم الشركة  : " + this.companyName + '</span>');
        mywindow.document.write('</div>');
        mywindow.document.write("<hr><div class='row' style='margin-top:15px'>");
        mywindow.document.write("<span style='foint-size:16px;'>المنفعات :- </span>");
        mywindow.document.write('<table>');
        mywindow.document.write(`
        <thead>
        <tr>
        <th style="padding-top: 10px; padding-left: 40px;">اسم المنفعة بالعربي</th>
        <th style="padding-top: 10px; padding-left: 40px;">اسم المنفعة بالانجليزي</th>
        <th style="padding-top: 10px; padding-left: 40px;">الكمية</th>
        <th style="padding-top: 10px; padding-left: 40px;">النقاط</th>
        <th style="padding-top: 10px; padding-left: 40px;">اجمالي النقاط</th>
        </tr>
        </thead>
        `);
        mywindow.document.write('<tbody>');
        this.rows.forEach(element => {
          mywindow.document.write(`
          <tr>
          <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.nameAr}</td>
          <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.nameEn}</td>
          <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.quantity}</td>
          <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.points}</td>
          <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.totalPoints}</td>
          </tr>
          `);
        });
        mywindow.document.write(`
        <tr>
        <td style="padding-top: 10px; padding-left: 40px;"></td>
        <td style="padding-top: 10px; padding-left: 40px;"></td>
        <td style="padding-top: 10px; padding-left: 40px;"></td>
        <td style="padding-top: 10px; padding-left: 40px;"></td>
        <td style="padding-top: 10px; padding-left: 40px;">اجمالي النقاط : ${this.total}</td>
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
      });
  }

  public retrieveInvoice(invoiceId): void {
    this.invoiceService()
      .find(invoiceId)
      .then(res => {
        this.invoice = res;
      });
  }

  public changeQuantity(): void {
    if (!this.quantity || this.quantity == 0) {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = false;
    }
    console.log(this.quantity);
  }

  public pdfgenerator(): void {
    window.print();
    // var docDefinition = { content: 'حنين' };
    // pdfMake.createPdf(docDefinition).download();

    // var doc = new jsPDF();
    // doc.text(20, 20, 'الالالالالا');
    // doc.save('Test.pdf');
  }
  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cardTransactionService()
      .retrieve()
      .then(res => {
        this.cardTransactions = res.data;
      });
  }
}
