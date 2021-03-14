import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import axios from 'axios';
import InvoiceService from '../../entities/invoice/invoice.service';
import { count } from 'console';
@Component
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;

  // Vue.component(VueChart.name, VueChart);
  public authenticationError = null;
  public login = null;
  public password = null;
  public rememberMe: boolean = null;
  public returnInvoice = 0;
  public cancleInvoice = 0;
  public activebenefits = 0;
  public deactivebenefits = 0;
  public countInvoice = 0;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public hasRole(roles: any): boolean {
    if (this.userAuthorities() == null) {
      return false;
    }
    for (const element of roles) {
      if (this.userAuthorities().authorities.includes(element)) {
        return true;
      }
    }
  }
  public mounted(): void {
    console.log('hi');
    this.invoices();
  }
  public invoices() {
    this.invoiceService()
      .getInvoicesByStatus('APPROVED')
      .then(result => {
        return (this.countInvoice = result);
      });
    this.invoiceService()
      .getInvoicesByStatus('RETURNED')
      .then(result => {
        return (this.returnInvoice = result);
      });
    this.invoiceService()
      .getInvoicesByStatus('CANCELLED')
      .then(result => {
        return (this.cancleInvoice = result);
      });
  }

  public userAuthorities() {
    return this.accountService().getAuthorities();
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }

  public doLogin(): void {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        this.$root.$emit('bv::hide::modal', 'login-page');
        this.accountService().retrieveAccount();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
