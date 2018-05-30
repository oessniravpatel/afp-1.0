import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';
import { WelcomeregisterComponent } from './welcomeregister/welcomeregister.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordService } from './services/forgotpassword.service';
import { LoginComponent } from './login/login.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpassService } from './services/resetpass.service';
import { ChangepassComponent } from './changepass/changepass.component';
import { ChangepassService } from './services/changepass.service';
//import { DashbordService } from './services/dashbord.service';

import { HomeService } from './services/home.service';
import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { AssessmentDetailsService } from './services/assessment-details.service';
import { AssessmentComponent } from './assessment/assessment.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { HomeComponent } from './home/home.component';
import { UserAssessmentDetailsComponent } from './user-assessment-details/user-assessment-details.component';

import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { SalesDashboardService } from './services/sales-dashboard.service';
import { UserAssessmentListComponent } from './user-assessment-list/user-assessment-list.component';
import { SalesUserDetailsComponent } from './sales-user-details/sales-user-details.component';
import { ReportComponent } from './report/report.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorClassService } from './http-interceptor-class.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderhomeComponent } from './headerhome/headerhome.component';
import{NgxPaginationModule} from 'ngx-pagination';
import {SelectModule} from 'ng-select';
import { TestAssessmentComponent } from './test-assessment/test-assessment.component';
import { ListUserAssessmentComponent } from './list-user-assessment/list-user-assessment.component';
import { ListUserAssessmentService } from './services/list-user-assessment.service';
import { UserreportComponent } from './userreport/userreport.component';
import { UsercopmanyregisterComponent } from './usercopmanyregister/usercopmanyregister.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    FooterComponent,
    ContactusComponent,
    InvitationComponent,
    RegisterComponent,
    WelcomeregisterComponent,

	ForgotpasswordComponent,
    LoginComponent,
    ResetpassComponent,

    ChangepassComponent,

    ChangepassComponent,

    AssessmentDetailsComponent,

    AssessmentComponent,

    ThankyouComponent,
    HomeComponent,
    UserAssessmentDetailsComponent,
    UserAssessmentDetailsComponent,
    UserAssessmentDetailsComponent,
    SalesDashboardComponent,
    UserAssessmentListComponent,
    SalesUserDetailsComponent,
    ReportComponent,
    HeaderhomeComponent,
    TestAssessmentComponent,
    ListUserAssessmentComponent,
    UserreportComponent,
    UsercopmanyregisterComponent


  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	NgxPaginationModule,
	HttpClientModule,
	SelectModule,
	RouterModule.forRoot([		
		{
			path : '',
			component : HomeComponent,
			canActivate : [AuthGuard]
			
		},	
		{
			path : 'dashboard',
			component : DashbordComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'test-assessment',
			component : TestAssessmentComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'contactus',
			component : ContactusComponent,
			
		},
		{
			path : 'invitation',
			component : InvitationComponent,
			canActivate : [AuthGuard]
		},		
		{
			path : 'register',
			component : RegisterComponent,
			canActivate : [AuthGuard]
			
		},
		{
        path : 'register/edit/:id',
		component : RegisterComponent,
		canActivate : [AuthGuard]
        
		},
		{
			path : 'welcome_register',
			component : WelcomeregisterComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'changepass',
			component : ChangepassComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'resetpass/:id',
			component : ResetpassComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'forgotpassword',
			component : ForgotpasswordComponent,
			canActivate : [AuthGuard]

		},
		{
			path : 'assessment_details',
			component : AssessmentDetailsComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'assessment/:id',
			component : AssessmentComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'thankyou/:id',
			component : ThankyouComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'user-assessment-details/:id',
			component : UserAssessmentDetailsComponent,
			canActivate : [AuthGuard]
		},

		{
			path : 'list-user-assessment/list',
			component : ListUserAssessmentComponent,
			canActivate : [AuthGuard]
		},

		{
			path : 'viewreport',
			component : UserreportComponent,
			canActivate : [AuthGuard]
		},

		{
			path : 'usercompany',
			component : UsercopmanyregisterComponent,
			canActivate : [AuthGuard]
		},

		{
			path : 'sales-admin-dashboard',
			component : SalesDashboardComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'user-assessment-list/:id',
			component :UserAssessmentListComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'sales-user-details/:id',
			component :SalesUserDetailsComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'login',
			component : LoginComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'report/:id',
			component : ReportComponent,
			canActivate : [AuthGuard]
		},
		
		{
			path : '**',
			redirectTo : 'dashboard'
			
		}
		
	])
  ], 
  
  providers: [Globals,InvitationService,RegisterService,AuthService,AuthGuard,ForgotpasswordService,
	ResetpassService,ListUserAssessmentService,ChangepassService,AssessmentDetailsService,HomeService,
	{
		provide: HTTP_INTERCEPTORS,
		  useClass: HttpInterceptorClassService,
		  multi: true
		}],

  bootstrap: [AppComponent]
})
export class AppModule { }
