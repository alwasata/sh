import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBenefitRequest, BenefitRequest } from 'app/shared/model/benefit-request.model';
import { BenefitRequestService } from './benefit-request.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IHospital } from 'app/shared/model/hospital.model';
import { HospitalService } from 'app/entities/hospital/hospital.service';
import { IBenefit } from 'app/shared/model/benefit.model';
import { BenefitService } from 'app/entities/benefit/benefit.service';

type SelectableEntity = ICategory | IHospital | IBenefit;

@Component({
  selector: 'jhi-benefit-request-update',
  templateUrl: './benefit-request-update.component.html'
})
export class BenefitRequestUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategory[] = [];
  hospitals: IHospital[] = [];
  benefits: IBenefit[] = [];

  editForm = this.fb.group({
    id: [],
    nameAr: [null, [Validators.required]],
    nameEn: [],
    pointsCost: [],
    cost: [],
    benefitStatus: [],
    notes: [],
    categoryId: [],
    hospitalId: [],
    benefitId: []
  });

  constructor(
    protected benefitRequestService: BenefitRequestService,
    protected categoryService: CategoryService,
    protected hospitalService: HospitalService,
    protected benefitService: BenefitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ benefitRequest }) => {
      this.updateForm(benefitRequest);

      this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));

      this.hospitalService.query().subscribe((res: HttpResponse<IHospital[]>) => (this.hospitals = res.body || []));

      this.benefitService.query().subscribe((res: HttpResponse<IBenefit[]>) => (this.benefits = res.body || []));
    });
  }

  updateForm(benefitRequest: IBenefitRequest): void {
    this.editForm.patchValue({
      id: benefitRequest.id,
      nameAr: benefitRequest.nameAr,
      nameEn: benefitRequest.nameEn,
      pointsCost: benefitRequest.pointsCost,
      cost: benefitRequest.cost,
      benefitStatus: benefitRequest.benefitStatus,
      notes: benefitRequest.notes,
      categoryId: benefitRequest.categoryId,
      hospitalId: benefitRequest.hospitalId,
      benefitId: benefitRequest.benefitId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const benefitRequest = this.createFromForm();
    if (benefitRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.benefitRequestService.update(benefitRequest));
    } else {
      this.subscribeToSaveResponse(this.benefitRequestService.create(benefitRequest));
    }
  }

  private createFromForm(): IBenefitRequest {
    return {
      ...new BenefitRequest(),
      id: this.editForm.get(['id'])!.value,
      nameAr: this.editForm.get(['nameAr'])!.value,
      nameEn: this.editForm.get(['nameEn'])!.value,
      pointsCost: this.editForm.get(['pointsCost'])!.value,
      cost: this.editForm.get(['cost'])!.value,
      benefitStatus: this.editForm.get(['benefitStatus'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      categoryId: this.editForm.get(['categoryId'])!.value,
      hospitalId: this.editForm.get(['hospitalId'])!.value,
      benefitId: this.editForm.get(['benefitId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBenefitRequest>>): void {
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
