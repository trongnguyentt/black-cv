import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { CVUpdateComponent } from 'app/entities/cv/cv-update.component';
import { CVService } from 'app/entities/cv/cv.service';
import { CV } from 'app/shared/model/cv.model';

describe('Component Tests', () => {
  describe('CV Management Update Component', () => {
    let comp: CVUpdateComponent;
    let fixture: ComponentFixture<CVUpdateComponent>;
    let service: CVService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [CVUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CVUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CVUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CVService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CV(123);
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
        const entity = new CV();
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
