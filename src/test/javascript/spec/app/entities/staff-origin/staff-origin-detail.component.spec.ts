import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { StaffOriginDetailComponent } from 'app/entities/staff-origin/staff-origin-detail.component';
import { StaffOrigin } from 'app/shared/model/staff-origin.model';

describe('Component Tests', () => {
  describe('StaffOrigin Management Detail Component', () => {
    let comp: StaffOriginDetailComponent;
    let fixture: ComponentFixture<StaffOriginDetailComponent>;
    const route = ({ data: of({ staffOrigin: new StaffOrigin(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [StaffOriginDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StaffOriginDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StaffOriginDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load staffOrigin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.staffOrigin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
