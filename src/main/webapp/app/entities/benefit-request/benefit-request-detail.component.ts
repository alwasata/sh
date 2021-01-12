import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBenefitRequest } from 'app/shared/model/benefit-request.model';

@Component({
  selector: 'jhi-benefit-request-detail',
  templateUrl: './benefit-request-detail.component.html'
})
export class BenefitRequestDetailComponent implements OnInit {
  benefitRequest: IBenefitRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ benefitRequest }) => (this.benefitRequest = benefitRequest));
  }

  previousState(): void {
    window.history.back();
  }
}
