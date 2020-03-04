import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { StaffOriginService } from 'app/entities/staff-origin/staff-origin.service';
import { IStaffOrigin, StaffOrigin } from 'app/shared/model/staff-origin.model';

describe('Service Tests', () => {
  describe('StaffOrigin Service', () => {
    let injector: TestBed;
    let service: StaffOriginService;
    let httpMock: HttpTestingController;
    let elemDefault: IStaffOrigin;
    let expectedResult: IStaffOrigin | IStaffOrigin[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StaffOriginService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new StaffOrigin(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a StaffOrigin', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new StaffOrigin())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StaffOrigin', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            email: 'BBBBBB',
            job: 'BBBBBB',
            advantages: 'BBBBBB',
            defect: 'BBBBBB',
            more: 'BBBBBB',
            status: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of StaffOrigin', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            email: 'BBBBBB',
            job: 'BBBBBB',
            advantages: 'BBBBBB',
            defect: 'BBBBBB',
            more: 'BBBBBB',
            status: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a StaffOrigin', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
