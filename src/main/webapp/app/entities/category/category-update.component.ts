import { Component, Inject, Vue } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { Category, ICategory } from '@/shared/model/category.model';
import CategoryService from './category.service';

const validations: any = {
  category: {
    nameAr: {
      required,
    },
    nameEn: {},
  },
};

@Component({
  validations,
})
export default class CategoryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('categoryService') private categoryService: () => CategoryService;
  public category: ICategory = new Category();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
      }
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
    if (this.category.id) {
      this.categoryService()
        .update(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Category is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.categoryService()
        .create(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Category is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCategory(categoryId): void {
    this.categoryService()
      .find(categoryId)
      .then(res => {
        this.category = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
