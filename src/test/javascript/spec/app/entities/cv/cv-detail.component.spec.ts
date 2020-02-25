import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlackcvTestModule } from '../../../test.module';
import { CVDetailComponent } from 'app/entities/cv/cv-detail.component';
import { CV } from 'app/shared/model/cv.model';

describe('Component Tests', () => {
  describe('CV Management Detail Component', () => {
    let comp: CVDetailComponent;
    let fixture: ComponentFixture<CVDetailComponent>;
    const route = ({ data: of({ cV: new CV(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlackcvTestModule],
        declarations: [CVDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CVDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CVDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cV on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cV).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
