import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICompany } from '@/shared/model/company.model';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import CompanyService from './company.service';
import EmployeeService from '../employee/employee.service';

@Component
export default class CompanyDetails extends Vue {
  @Inject('companyService') private companyService: () => CompanyService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  public company: ICompany = {};
  public employee: IEmployee = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.companyId) {
        vm.retrieveCompany(to.params.companyId);
      }
    });
  }

  public retrieveCompany(companyId) {
    this.companyService()
      .find(companyId)
      .then(res => {
        this.company = res;
        this.employeeService()
          .getByCompanyId(companyId)
          .then(res => {
            this.employee = res.data;
          });
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
