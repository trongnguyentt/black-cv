import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Account } from 'app/core/user/account.model';
import { CompanyService } from 'app/entities/company/company.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ICompany } from 'app/shared/model/company.model';
import { DetailService } from 'app/entities/company/detail.service';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [state('up', style({ height: 0 })), state('down', style({ height: '*' })), transition('up <=> down', animate(200))])
  ]
})
export class SidebarComponent implements OnInit {
  account!: Account;
  vi = 'vi';
  en = 'en';
  menus: any;
  status?: boolean;
  swaggerEnabled?: boolean;
  inProduction?: boolean;
  companies?: ICompany[];

  constructor(
    protected detailService: DetailService,
    protected companyService: CompanyService,
    private translateService: TranslateService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    public sidebarService: SidebarService
  ) {
    this.status = true;
    this.menus = [
      {
        title: '',
        type: 'header'
      },
      {
        title: 'Dashboard',
        icon: 'fa fa-tachometer-alt',
        active: false,
        type: 'dropdown',
        badge: {
          text: 'New ',
          class: 'badge-success'
        },
        submenus: [
          {
            title: 'Curriculum Vitae',
            badge: {
              text: 'Pro ',
              class: 'badge-success'
            }
          },
          {
            title: 'Company'
          },
          {
            title: 'Reason'
          },
          {
            title: 'Staff Origin'
          }
        ]
      }
    ];
  }

  ngOnInit() {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe(() => this.updateTitle());
  }

  protected paginateCompany(data: ICompany[]) {
    this.companies = data;
    let author = this.account.authorities;
    console.log('author:' + author);
    if (this.account.authorities.includes('ROLE_ADMIN')) {
      this.router.navigate(['/company']);
    } else {
      if (this.companies == undefined || this.companies!.length == 0) {
        this.router.navigate(['/company/new']);
      } else {
        this.detailService.changeMessage(this.companies!);
        this.router.navigate(['/company/view']);
      }
    }
  }

  getFormValues() {
    const res = {};
    const login = this.account.login;
    const author = this.account.authorities;

    if (login) {
      res['login'] = login;
    }

    if (author) {
      res['author'] = author;
    }

    return res;
  }

  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  getState(currentMenu: any) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  logout(): void {
    // this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  hasBackgroundImage() {
    return this.sidebarService.hasBackgroundImage;
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }

  check() {
    this.companyService.query({}).subscribe((res: HttpResponse<ICompany[]>) => this.paginateCompany(res.body!));
  }
}
