import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { ReasonDetailComponent } from 'app/entities/reason/reason-detail.component';
import { Reason } from 'app/shared/model/reason.model';

describe('Component Tests', () => {
  describe('Reason Management Detail Component', () => {
    let comp: ReasonDetailComponent;
    let fixture: ComponentFixture<ReasonDetailComponent>;
    const route = ({ data: of({ reason: new Reason(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [ReasonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReasonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReasonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reason on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reason).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
