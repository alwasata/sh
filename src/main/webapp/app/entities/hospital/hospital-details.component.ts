import { Component, Vue, Inject } from 'vue-property-decorator';

import { IHospital } from '@/shared/model/hospital.model';
import HospitalService from './hospital.service';

@Component
export default class HospitalDetails extends Vue {
  @Inject('hospitalService') private hospitalService: () => HospitalService;
  public hospital: IHospital = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.hospitalId) {
        vm.retrieveHospital(to.params.hospitalId);
      }
    });
  }

  public retrieveHospital(hospitalId) {
    this.hospitalService()
      .find(hospitalId)
      .then(res => {
        this.hospital = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
