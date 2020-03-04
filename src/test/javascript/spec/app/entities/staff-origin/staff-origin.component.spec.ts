import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackcvTestModule } from '../../../test.module';
import { StaffOriginComponent } from 'app/entities/staff-origin/staff-origin.component';
import { StaffOriginService } from 'app/entities/staff-origin/staff-origin.service';
import { StaffOrigin } from 'app/shared/model/staff-origin.model';

describe('Component Tests', () => {
  describe('StaffOrigin Management Component', () => {
    let comp: StaffOriginComponent;
    let fixture: ComponentFixture<StaffOriginComponent>;
    let service: StaffOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [StaffOriginComponent],
        providers: []
      })
        .overrideTemplate(StaffOriginComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StaffOriginComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StaffOriginService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StaffOrigin(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.staffOrigins && comp.staffOrigins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
