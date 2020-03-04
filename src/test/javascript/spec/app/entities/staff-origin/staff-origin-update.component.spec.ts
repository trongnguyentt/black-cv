import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { StaffOriginUpdateComponent } from 'app/entities/staff-origin/staff-origin-update.component';
import { StaffOriginService } from 'app/entities/staff-origin/staff-origin.service';
import { StaffOrigin } from 'app/shared/model/staff-origin.model';

describe('Component Tests', () => {
  describe('StaffOrigin Management Update Component', () => {
    let comp: StaffOriginUpdateComponent;
    let fixture: ComponentFixture<StaffOriginUpdateComponent>;
    let service: StaffOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [StaffOriginUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StaffOriginUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StaffOriginUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StaffOriginService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StaffOrigin(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new StaffOrigin();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
