import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBenefit, Benefit } from 'app/shared/model/benefit.model';
import { BenefitService } from './benefit.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IHospital } from 'app/shared/model/hospital.model';
import { HospitalService } from 'app/entities/hospital/hospital.service';

type SelectableEntity = ICategory | IHospital;

@Component({
  selector: 'jhi-benefit-update',
  templateUrl: './benefit-update.component.html'
})
export class BenefitUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategory[] = [];
  hospitals: IHospital[] = [];

  editForm = this.fb.group({
    id: [],
    nameAr: [null, [Validators.required]],
    nameEn: [],
    pointsCost: [],
    cost: [],
    categoryId: [],
    hospitalId: []
  });

  constructor(
    protected benefitService: BenefitService,
    protected categoryService: CategoryService,
    protected hospitalService: HospitalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ benefit }) => {
      this.updateForm(benefit);

      this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));

      this.hospitalService.query().subscribe((res: HttpResponse<IHospital[]>) => (this.hospitals = res.body || []));
    });
  }

  updateForm(benefit: IBenefit): void {
    this.editForm.patchValue({
      id: benefit.id,
      nameAr: benefit.nameAr,
      nameEn: benefit.nameEn,
      pointsCost: benefit.pointsCost,
      cost: benefit.cost,
      categoryId: benefit.categoryId,
      hospitalId: benefit.hospitalId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const benefit = this.createFromForm();
    if (benefit.id !== undefined) {
      this.subscribeToSaveResponse(this.benefitService.update(benefit));
    } else {
      this.subscribeToSaveResponse(this.benefitService.create(benefit));
    }
  }

  private createFromForm(): IBenefit {
    return {
      ...new Benefit(),
      id: this.editForm.get(['id'])!.value,
      nameAr: this.editForm.get(['nameAr'])!.value,
      nameEn: this.editForm.get(['nameEn'])!.value,
      pointsCost: this.editForm.get(['pointsCost'])!.value,
      cost: this.editForm.get(['cost'])!.value,
      categoryId: this.editForm.get(['categoryId'])!.value,
      hospitalId: this.editForm.get(['hospitalId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBenefit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
