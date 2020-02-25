import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { ReasonListUpdateComponent } from 'app/entities/reason-list/reason-list-update.component';
import { ReasonListService } from 'app/entities/reason-list/reason-list.service';
import { ReasonList } from 'app/shared/model/reason-list.model';

describe('Component Tests', () => {
  describe('ReasonList Management Update Component', () => {
    let comp: ReasonListUpdateComponent;
    let fixture: ComponentFixture<ReasonListUpdateComponent>;
    let service: ReasonListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [ReasonListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReasonListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReasonListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReasonListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReasonList(123);
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
        const entity = new ReasonList();
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
