import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICard, Card } from 'app/shared/model/card.model';
import { CardService } from './card.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-card-update',
  templateUrl: './card-update.component.html'
})
export class CardUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];
  expiryDateDp: any;

  editForm = this.fb.group({
    id: [],
    cardNo: [],
    expiryDate: [],
    isActive: [],
    employeeId: []
  });

  constructor(
    protected cardService: CardService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ card }) => {
      this.updateForm(card);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(card: ICard): void {
    this.editForm.patchValue({
      id: card.id,
      cardNo: card.cardNo,
      expiryDate: card.expiryDate,
      isActive: card.isActive,
      employeeId: card.employeeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const card = this.createFromForm();
    if (card.id !== undefined) {
      this.subscribeToSaveResponse(this.cardService.update(card));
    } else {
      this.subscribeToSaveResponse(this.cardService.create(card));
    }
  }

  private createFromForm(): ICard {
    return {
      ...new Card(),
      id: this.editForm.get(['id'])!.value,
      cardNo: this.editForm.get(['cardNo'])!.value,
      expiryDate: this.editForm.get(['expiryDate'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICard>>): void {
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

  trackById(index: number, item: IEmployee): any {
    return item.id;
  }
}
