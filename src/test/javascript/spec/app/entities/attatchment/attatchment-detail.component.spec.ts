import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SahatiTestModule } from '../../../test.module';
import { AttatchmentDetailComponent } from 'app/entities/attatchment/attatchment-detail.component';
import { Attatchment } from 'app/shared/model/attatchment.model';

describe('Component Tests', () => {
  describe('Attatchment Management Detail Component', () => {
    let comp: AttatchmentDetailComponent;
    let fixture: ComponentFixture<AttatchmentDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ attatchment: new Attatchment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [AttatchmentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttatchmentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttatchmentDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load attatchment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attatchment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
