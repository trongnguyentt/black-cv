import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { ReasonListDetailComponent } from 'app/entities/reason-list/reason-list-detail.component';
import { ReasonList } from 'app/shared/model/reason-list.model';

describe('Component Tests', () => {
  describe('ReasonList Management Detail Component', () => {
    let comp: ReasonListDetailComponent;
    let fixture: ComponentFixture<ReasonListDetailComponent>;
    const route = ({ data: of({ reasonList: new ReasonList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [ReasonListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReasonListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReasonListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reasonList on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reasonList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
