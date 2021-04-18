// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import AuditsService from './admin/audits/audits.service';

import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';

import LoginService from './account/login.service';
import AccountService from './account/account.service';

import '../content/scss/vendor.scss';
import AlertService from '@/shared/alert/alert.service';
import ConfigurationService from '@/admin/configuration/configuration.service';

/* tslint:disable */
import AttatchmentService from '@/entities/attatchment/attatchment.service';
import BenefitService from '@/entities/benefit/benefit.service';
import BenefitRequestService from '@/entities/benefit-request/benefit-request.service';
import CardService from '@/entities/card/card.service';
import CardTransactionService from '@/entities/card-transaction/card-transaction.service';
import CategoryService from '@/entities/category/category.service';
import SettingService from '@/entities/setting/setting.service';
import CompanyService from '@/entities/company/company.service';
import EmployeeService from '@/entities/employee/employee.service';
import HospitalService from '@/entities/hospital/hospital.service';
import InvoiceService from '@/entities/invoice/invoice.service';
import InvoiceBenefitsService from '@/entities/invoice-benefits/invoice-benefits.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

import moment from 'moment';

Vue.filter('formatDateOnly', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});

Vue.filter('formatTimeOnly', function (value) {
  if (value) {
    return moment(String(value)).format('HH:mm');
  }
});

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);

const store = config.initVueXStore(Vue);

const alertService = new AlertService(store);
const loginService = new LoginService();
const accountService = new AccountService(store, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),

    auditsService: () => new AuditsService(),

    healthService: () => new HealthService(),

    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),
    alertService: () => alertService,
    attatchmentService: () => new AttatchmentService(),
    benefitService: () => new BenefitService(),
    benefitRequestService: () => new BenefitRequestService(),
    cardService: () => new CardService(),
    cardTransactionService: () => new CardTransactionService(),
    categoryService: () => new CategoryService(),
    settingService: () => new SettingService(),
    companyService: () => new CompanyService(),
    employeeService: () => new EmployeeService(),
    hospitalService: () => new HospitalService(),
    invoiceService: () => new InvoiceService(),
    invoiceBenefitsService: () => new InvoiceBenefitsService(),
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
  },
  store,
});
