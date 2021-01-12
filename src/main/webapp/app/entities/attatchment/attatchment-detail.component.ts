import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAttatchment } from 'app/shared/model/attatchment.model';

@Component({
  selector: 'jhi-attatchment-detail',
  templateUrl: './attatchment-detail.component.html'
})
export class AttatchmentDetailComponent implements OnInit {
  attatchment: IAttatchment | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attatchment }) => (this.attatchment = attatchment));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
