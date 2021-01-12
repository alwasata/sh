import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHospital, Hospital } from 'app/shared/model/hospital.model';
import { HospitalService } from './hospital.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-hospital-update',
  templateUrl: './hospital-update.component.html'
})
export class HospitalUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nameAr: [null, [Validators.required]],
    nameEn: [],
    email: [],
    phone: [],
    address: [],
    users: []
  });

  constructor(
    protected hospitalService: HospitalService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hospital }) => {
      this.updateForm(hospital);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(hospital: IHospital): void {
    this.editForm.patchValue({
      id: hospital.id,
      nameAr: hospital.nameAr,
      nameEn: hospital.nameEn,
      email: hospital.email,
      phone: hospital.phone,
      address: hospital.address,
      users: hospital.users
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hospital = this.createFromForm();
    if (hospital.id !== undefined) {
      this.subscribeToSaveResponse(this.hospitalService.update(hospital));
    } else {
      this.subscribeToSaveResponse(this.hospitalService.create(hospital));
    }
  }

  private createFromForm(): IHospital {
    return {
      ...new Hospital(),
      id: this.editForm.get(['id'])!.value,
      nameAr: this.editForm.get(['nameAr'])!.value,
      nameEn: this.editForm.get(['nameEn'])!.value,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      address: this.editForm.get(['address'])!.value,
      users: this.editForm.get(['users'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHospital>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }

  getSelected(selectedVals: IUser[], option: IUser): IUser {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
