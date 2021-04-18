import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEmployee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';
import JhiDataUtils from '@/shared/data/data-utils.service';
import AttatchmentService from '../attatchment/attatchment.service';
import { Attatchment, IAttatchment } from '@/shared/model/attatchment.model';

import { mixins } from 'vue-class-component';

@Component
export default class EmployeeDetails extends mixins(JhiDataUtils) {
  @Inject('employeeService') private employeeService: () => EmployeeService;
  @Inject('attatchmentService') private attatchmentService: () => AttatchmentService;

  public employee: IEmployee = {};
  public attatchment: IAttatchment = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
    });
  }

  public retrieveEmployee(employeeId) {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
        this.attatchmentService()
          .findByEmployee(this.employee.id)
          .then(res => {
            this.attatchment = res;
          });
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
