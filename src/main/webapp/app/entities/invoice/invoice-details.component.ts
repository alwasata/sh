import { Component, Inject, Vue } from 'vue-property-decorator';

import CardTransactionService from '../card-transaction/card-transaction.service';
import { ICardTransaction } from '@/shared/model/card-transaction.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoice, Invoice, InvoiceStatus } from '@/shared/model/invoice.model';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import InvoiceService from './invoice.service';
import { IInvoiceBenefits, InvoiceBenefits } from '@/shared/model/invoice-benefits.model';
import InvoiceBenefitsService from './invoice-benefits.service';

const validations: any = {
  invoice: {
    invoiceNo: {},
    invoiceDate: {},
    payDate: {},
    total: {},
    invoiceStatus: {},
    totalPoints: {},
    notes: {},
    createdBy: {},
    hospital: {},
    mainInvoice: {},
    moamalatId: {},
  },
  invoiceBenefits: {
    pointsCost: {},
    cost: {},
    quantity: {},
    total: {},
  },
};

@Component({
  validations,
})
export default class InvoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  @Inject('invoiceBenefitsService') private invoiceBenefitsService: () => InvoiceBenefitsService;
  public invoice: IInvoice = new Invoice();
  public invoiceBenefit: IInvoiceBenefits = new InvoiceBenefits();

  public cardNo = '';
  public employeeName = '';
  public companyName = '';
  public cardCost = 0;
  public exbireDate = new Date();
  public cardNumber = '';
  public benefit = '';
  public benefitcosts = 0;
  public oldBenefitcosts = 0;
  public benefitPrice = 0;
  public total = 0;
  public totalIvoicePrice = 0;
  public quantity = 1;
  public cardId = 0;
  public hosbitalName = '';
  public invoiceNo = '';
  public returnTotal = 0;
  public returnTotalIvoicePrice = 0;
  public invoiceId = 0;
  public invoiceDate = new Date().toISOString().slice(0, 10);
  public rows = [];
  public checkQuantity = true;
  public returnBenefits = [];
  public moamalatId = '';

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
  public retrieveInvoice(invoiceId): void {
    this.invoiceId = invoiceId;
    console.log(invoiceId);
    this.invoiceService()
      .find(invoiceId)
      .then(res => {
        this.employeeName = res.cardTransaction.card.employee.name;
        this.companyName = res.cardTransaction.card.employee.company.nameAr + ' | ' + res.cardTransaction.card.employee.company.nameEn;
        this.cardNumber = res.cardTransaction.card.cardNo;
        this.cardNo = res.cardTransaction.card.cardNo;
        this.cardId = res.cardTransaction.card.id;
        this.exbireDate = res.cardTransaction.card.expiryDate;
        this.total = res.totalPoints;
        this.totalIvoicePrice = res.total;
        this.invoiceNo = res.invoiceNo;
        this.moamalatId = res.moamalatId;

        this.invoiceBenefitsService()
          .find(res.id)
          .then(res => {
            res[0].forEach(element => {
              this.rows.push({
                id: element.benefit.id,
                nameAr: element.benefit.nameAr,
                quantity: element.quantity,
                nameEn: element.benefit.nameEn,
                price: element.cost,
                returnQuantity: element.quantity,
                totalPrice: element.total,
              });
            });
          });

        this.invoiceService()
          .search(res.cardTransaction.card.cardNo)
          .then(res => {
            var costs = 0;
            res.cardInfo[0].forEach(element => {
              if (element.action == 'PLUS') {
                costs = costs + element.amount;
              } else {
                costs = costs - element.amount;
              }
            });
            this.hosbitalName = res.benefit[0].hospital.nameAr;
            this.cardCost = costs;
          });
      });
  }

  public printInvoice() {
    var mywindow = window.open('', 'PRINT', 'height=600,width=900');

    mywindow.document.write('<html><head><title> ' + this.hosbitalName + ' : ?????? ????????????????  </title>');
    mywindow.document.write('</head><body dir="rtl">');
    mywindow.document.write('<style> th, .tdborder {border-bottom: 1px solid #ddd; }</style>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px; '> ?????? ???????????????? : " + this.invoiceNo + '</span>');
    mywindow.document.write("<span style='foint-size:16px;margin-right:40px;'>?????? ???????????????? : " + this.hosbitalName + '</span>');
    mywindow.document.write('</div>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>?????? ???????????? : " + this.employeeName + '</span>');
    mywindow.document.write('</div>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>?????? ??????????????  : " + this.cardNumber + '</span>');
    mywindow.document.write('</div>');
    mywindow.document.write("<div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>?????? ????????????  : " + this.companyName + '</span>');
    mywindow.document.write('</div>');
    mywindow.document.write("<hr><div class='row' style='margin-top:15px'>");
    mywindow.document.write("<span style='foint-size:16px;'>?????????????? :- </span>");
    mywindow.document.write('<table>');
    mywindow.document.write(`
      <thead>
      <tr>
      <th style="padding-top: 10px; padding-left: 40px;">?????? ?????????????? ??????????????</th>
      <th style="padding-top: 10px; padding-left: 40px;">?????? ?????????????? ????????????????????</th>
      <th style="padding-top: 10px; padding-left: 40px;">????????????</th>
      <th style="padding-top: 10px; padding-left: 40px;">??????????</th>
      <th style="padding-top: 10px; padding-left: 40px;">???????????? ??????????</th>
      </tr>
      </thead>
      `);
    mywindow.document.write('<tbody>');
    this.rows.forEach(element => {
      mywindow.document.write(`
        <tr>
        <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.nameAr}</td>
        <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.nameEn}</td>
        <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.returnQuantity}</td>
        <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.price}</td>
        <td class="tdborder" style="padding-top: 10px; padding-left: 40px;">${element.totalPrice}</td>
        </tr>
        `);
    });
    mywindow.document.write(`
      <tr>
      <td style="padding-top: 10px; padding-left: 40px;"></td>
      <td style="padding-top: 10px; padding-left: 40px;"></td>
      <td style="padding-top: 10px; padding-left: 40px;"></td>
      <td style="padding-top: 10px; padding-left: 40px;"></td>
      <td style="padding-top: 10px; padding-left: 40px;">???????????? ?????????? : ${this.totalIvoicePrice}</td>
      </tr>
      `);
    mywindow.document.write('</tbody>');
    mywindow.document.write('</table>');
    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
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
