import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAttatchment, Attatchment } from 'app/shared/model/attatchment.model';
import { AttatchmentService } from './attatchment.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-attatchment-update',
  templateUrl: './attatchment-update.component.html'
})
export class AttatchmentUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    file: [],
    fileContentType: [],
    fileUrl: [],
    employeeId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected attatchmentService: AttatchmentService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attatchment }) => {
      this.updateForm(attatchment);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(attatchment: IAttatchment): void {
    this.editForm.patchValue({
      id: attatchment.id,
      name: attatchment.name,
      file: attatchment.file,
      fileContentType: attatchment.fileContentType,
      fileUrl: attatchment.fileUrl,
      employeeId: attatchment.employeeId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('sahatiApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attatchment = this.createFromForm();
    if (attatchment.id !== undefined) {
      this.subscribeToSaveResponse(this.attatchmentService.update(attatchment));
    } else {
      this.subscribeToSaveResponse(this.attatchmentService.create(attatchment));
    }
  }

  private createFromForm(): IAttatchment {
    return {
      ...new Attatchment(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      fileContentType: this.editForm.get(['fileContentType'])!.value,
      file: this.editForm.get(['file'])!.value,
      fileUrl: this.editForm.get(['fileUrl'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttatchment>>): void {
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
