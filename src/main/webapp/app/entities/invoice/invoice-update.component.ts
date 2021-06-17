import { required, helpers } from 'vuelidate/lib/validators';
import { Component, Inject, Vue } from 'vue-property-decorator';

import CardTransactionService from '../card-transaction/card-transaction.service';
import { ICardTransaction } from '@/shared/model/card-transaction.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoice, Invoice, InvoiceStatus } from '@/shared/model/invoice.model';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import { IBenefit, Benefit } from '@/shared/model/benefit.model';
import InvoiceService from './invoice.service';
import SettingService from '../setting/setting.service';
import pdfMake from 'pdfmake-arabic/build/pdfmake';
import pdfFonts from 'pdfmake-arabic/build/vfs_fonts';
import HospitalService from '../hospital/hospital.service';
import AccountService from '@/account/account.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const isPhoneNo = helpers.regex('alpha', /^[0-9]{4,6}$/im);

const validations: any = {
  invoice: {
    invoiceNo: {},
    invoiceDate: {},
    payDate: {},
    total: {},
    createdBy: {},
    totalPoints: {},
    invoiceStatus: {},
    hosbital: {},
    notes: {},
    moamalatId: {
      required,
      isPhoneNo,
    },
  },
};

@Component({
  validations,
})
export default class InvoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  public invoice: IInvoice = new Invoice();
  public benefits = [];
  public cardAmount;
  public cardNo = '';
  public hospitalEmail = '';
  public employeeName = '';
  public employeePrices = 0.0;
  public companyName = '';
  public cardPrice = 0;
  public exbireDate = '';
  public cardNumber = '';
  public benefit = '';
  // public benefitPoints = 0;
  public oldBenefitPrice = 0;
  public benefitPrice = 0;
  public total = 0;
  public totalIvoicePrice = 0;
  public quantity = 1;
  public cardId = '';
  public hosbitalName = '';
  public invoiceDate = new Date().toISOString().slice(0, 10);
  public rows = [];
  public moamalatId = '';

  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;
  @Inject('hospitalService') private hospitalService: () => HospitalService;
  @Inject('accountService') private accountService: () => AccountService;
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
      if (this.moamalatId != '') {
        // this.invoice.invoiceStatus = InvoiceStatus.PENDING;
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
  }

  public search(): void {
    (document.getElementById('benifit-info') as HTMLStyleElement).style.cssText = 'display:none;';
    document.getElementById('benefit').innerHTML = '';
    document.getElementById('card-error').textContent = '';
    this.invoiceService()
      .search(this.cardNo)
      .then(res => {
        console.log(JSON.stringify(res.cardInfo) + "cardRewuest Respone");
        if (res.cardInfo[1] == 0) {
          document.getElementById('card-error').textContent = 'خطاء في رقم البطاقة ! يجب عليك ادخال رقم بطاقة صحيح';
          return;
        }
        if (res.cardInfo[0].length == 0) {
          document.getElementById('card-error').textContent = 'البطاقة لا يوجد بها رصيد';
          return;
        }
        if (!res.cardInfo[0][0].card.isActive) {
          document.getElementById('card-error').textContent = 'البطاقة غير مفعلة';
          return;
        }
        if (res.cardInfo[0][0].card.expiryDate < new Date()) {
          document.getElementById('card-error').textContent = 'تاريخ البطاقة منتهي';
          return;
        }
        this.employeeName = res.cardInfo[0][0].card.employee.name;
        this.companyName = res.cardInfo[0][0].card.employee.company.nameAr + ' | ' + res.cardInfo[0][0].card.employee.company.nameEn;
        this.cardNumber = res.cardInfo[0][0].card.cardNo;
        this.cardId = res.cardInfo[0][0].card.id;
        this.exbireDate = res.cardInfo[0][0].card.expiryDate;

        var prices = 0;
        var pricesPlus = 0;
        var pricesMinus = 0;
        document.getElementById('benifit-info').style.cssText = 'display:block;';

        res.cardInfo[0].forEach(element => {
          console.log('ekemint =' + element.amount);
          if (element.action == 'PLUS') {
            pricesPlus = pricesPlus + element.amount;
          } else {
            pricesMinus = pricesMinus + element.amount;
            if (pricesMinus < 0) {
              pricesMinus = pricesMinus * -1;
            }
          }
        });
        prices = pricesPlus - pricesMinus;
        if (prices < 0) {
          prices = prices * -1;
        }
        this.hospitalService()
          .find(this.$store.getters.account.id)
          .then(res => {
            this.hosbitalName = res.nameAr;
          });

        this.employeePrices = prices;
        this.benefits = res.benefit;
        console.log('Prices =' + res.benefit[0]);
        this.cardPrice = prices;
      });
  }

  public checkMoamalat(e): void {
    this.moamalatId = e;

    console.log('This is moamalat id =' + e + 'This row = ' + this.rows.length);
    if (this.moamalatId == '' || this.moamalatId.length < 5 || this.rows.length == 0 || this.moamalatId.match(/^[0-9]+$/) == null) {
      (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById('save-invoice') as HTMLButtonElement).disabled = false;
    }
  }
  public getBeneit(event): void {
    this.oldBenefitPrice = event.benefit.cost;
    this.benefitPrice = event.benefit.cost;
    (document.getElementById('addBenefit') as HTMLButtonElement).disabled = false;
  }

  public changeBenefit(): void {
    if (this.benefitPrice > this.oldBenefitPrice) {
      this.benefitPrice = this.oldBenefitPrice;
    }
    if (!this.benefitPrice) {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById('addBenefit') as HTMLButtonElement).disabled = false;
    }
  }

  public addBenefit(): void {
    (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    console.log(this.moamalatId);
    this.checkMoamalat(this.moamalatId);

    if (this.total + this.benefitPrice * this.quantity < this.employeePrices) {
      var checkBenefit = false;
      this.rows.forEach(element => {
        if (element.id.includes(this.benefit['benefit']['id']) == true) {
          checkBenefit = true;
        }
      });

      if (checkBenefit == false) {
        this.total = this.total + this.benefitPrice * this.quantity;
        this.totalIvoicePrice = this.totalIvoicePrice + this.benefitPrice * this.quantity;
        this.rows.push({
          id: this.benefit['benefit']['id'],
          nameAr: this.benefit['benefit']['nameAr'],
          quantity: this.quantity,
          nameEn: this.benefit['benefit']['nameEn'],
          price: this.benefit['benefit']['cost'],
          totalPrice: this.quantity * this.benefit['benefit']['cost'],
        });
      }
    }
  }

  public removeRow(row, indx) {
    this.checkMoamalat(this.moamalatId);

    this.total = this.total - row.totalPrice;
    this.totalIvoicePrice = this.totalIvoicePrice - row.totalPrice;
    this.rows.splice(indx, 1);
  }

  public saveInvoice() {
    this.checkMoamalat(this.moamalatId);
    if (!(this.moamalatId.length >= 5 && this.rows.length > 0)) {
      console.log('This row = ' + this.rows + 'moamalat id = ' + this.moamalatId);
      alert('الرجاء اختيار المنافع وتغبئة خانة فاتورة معاملات');
      return null;
    }
    (document.getElementById('save-invoice') as HTMLButtonElement).disabled = true;
    this.invoice.total = this.totalIvoicePrice;
    // this.invoice.totalInvoicePoints = this.total;
    // this.invoice.invoiceStatus = InvoiceStatus.PENDING;
    this.invoice.invoiceDate = this.invoiceDate;
    this.invoice.payDate = this.invoiceDate;
    this.invoice.invoiceNo = 'IN' + new Date().getFullYear() + '' + new Date().getMonth() + '' + Math.floor(1000 + Math.random() * 9000);
    this.invoice.notes = `فاتورة صادرة رقم الفاتورة : ${this.invoice.invoiceNo}`;

    this.invoice.moamalatId = this.moamalatId;

    var data = {
      invoiceBenefit: this.rows,
      invoice: this.invoice,
      cardTransaction: {
        amount: this.totalIvoicePrice,
        action: 'MINUS',
        notes: 'خصم من البطاقة بسبب اصدار فاتورة رقم : ' + this.invoice.invoiceNo,
        card: this.cardId,
      },
    };
    this.invoiceService()
      .saveInvoice(data)
      .then(res => {
        this.hosbitalName = this.$store.getters.account.firstName;
        this.hospitalEmail = this.$store.getters.account.email;
        var mywindow = window.open('', 'PRINT', 'height=600,width=900');
         
        mywindow.document.write('<html><head><meta charset="utf-8" /><title> ' + this.hosbitalName + ' : اسم المستشفى  </title>');
        mywindow.document.write(`<style>
        
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
  
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
  
        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td:nth-child(2) {
          text-align: center;
        }
        .top-div{
          display:flex;
          justify-content:space-between;
        }
        .invoiceNumber{
          font-weight:bolder;
        }
        </style>`);
        mywindow.document.write(' <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script></head><body>');
        mywindow.document.write(`
        <div class="invoice-box rtl">
        <table cellpadding="0" cellspacing="0">
          <div class="top-div">
                  <img src="https://alwasata.ly/images/sahati/sahati-logo.png" style="width: 100%; max-width: 33%"  />
                  <img align="center" src="https://alwasata.ly/images/sahati/${this.$store.getters.account.login}.jpg" style="width: 100%; max-width: 33%"  alt="Image Error" />
                  <div id="canvas"></div>
            </div> `);
        mywindow.document.write(`
            <tr class="heading" >
              <td>  شركة الوساطة العالمية  </td>`);
        mywindow.document.write(`

        <td> ${this.hosbitalName} 
        </td>
        </tr>
        <br /> `
                      );
          mywindow.document.write(`<tr class="title"><td class="invoiceNumber"> ` + res.invoiceNo + `</td><td></td></tr>`);

        mywindow.document.write(`<tr class="heading">
        <td>رقم بطاقة بطاقة صحتي </td>

        <td> تاريخ الصلاحية</td>
      </tr>
      <tr class="details">
					<td>${this.cardNumber}</td>

					<td>${this.exbireDate}</td>
				</tr>
      <tr class="heading"> <td>  اسم حامل البطاقة  </td> 
      <td>
      اسم الشركة 
      </td>
      </tr>
      <tr class="details">
					<td>${this.employeeName}</td>

					<td>${this.companyName}</td>
				</tr>
        
        </table>
      `);
        mywindow.document.write(`
        <table>
        
        <tr class="heading">
					<td>اسم المنفعة </td>

					<td class="qa" >الكمية</td>
          <td>السعر</td>
          <td>اجمالي السعر</td>
				</tr>
       
        `);
        this.rows.forEach(element => {
          
          mywindow.document.write(`
          <tr class="item">
					<td>${element.nameAr}</td>

					<td class="qa" >${element.quantity}</td>
          <td>${element.price}</td>
          <td>${element.totalPrice}</td>
				</tr>
          `);
        });
        mywindow.document.write(`
        
        <tr class="total">
					<td></td>

					<td>اجمالي السعر :  ${this.total}</td>
				</tr>
			</table>
		</div>
    <script type="text/javascript">
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: "INVOICE NO : ${this.invoice.invoiceNo}, INVOICE TOTAL : ${this.total}, HOSPITAL Email : ${this.hospitalEmail}, SAHATY Support: Support@SCARD.LY",
      image: "https://i.imgur.com/2GTE6Ar.png",
      dotsOptions: {
          color: "#4267b2",
          type: "rounded"
      },
      backgroundOptions: {
          color: "#e9ebee",
      },
      imageOptions: {
          crossOrigin: "anonymous", 
      }
  });
    qrCode.append(document.getElementById("canvas"));
   
  
    </script>
	</body>
 
</html>  
        `);


         mywindow.document.close(); // necessary for IE >= 10
        // mywindow.focus(); // necessary for IE >= 10*/
        location.reload();
        
      })
      .catch(err => {
        alert('خطأ ! رقم واصل معاملات موجود مسبقاً , الرجاء التواصل مع ادارة الشركة .' + err);
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
