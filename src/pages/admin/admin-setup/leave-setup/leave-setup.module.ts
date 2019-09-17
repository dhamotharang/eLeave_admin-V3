import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { InlineSVGModule } from 'ng-inline-svg';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar
import { ManageHolidayPage } from './manage-holiday/manage-holiday.page';
import { SpinnerModule } from 'src/library/spinner/spinner.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignCalendarPage } from './assign-calendar/assign-calendar.page';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarNotificationPage } from './snackbar-notification/snackbar-notification';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ClickOutsideModule } from 'ng-click-outside';
import { EmployeeListDatabase } from './assign-calendar/assign-calendar-treeview.service';
import { ApplyOnBehalfPage } from './apply-on-behalf/apply-on-behalf.page';
import { MatRadioModule, MatDialogModule } from '@angular/material';
import { LeaveSetup } from './leave-setup';
import { ApprovalOverridePage } from './approval-override/approval-override.page';
import { LeaveAdjustmentPage } from './leave-adjustment/leave-adjustment.page';
import { LeaveSetupTabPage } from './leave-setup-tab/leave-setup-tab.page';
import { LeaveEntitlementByBatchPage } from './leave-entitlement-by-batch/leave-entitlement-by-batch.page';
import { DeleteCalendarConfirmationPage } from './delete-calendar-confirmation/delete-calendar-confirmation.page';
import { WorkingHourPage } from './working-hour/working-hour.page';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { WorkingHourListPage } from './working-hour/working-hour-list/working-hour-list.page';


const routes: Routes = [
    {
        path: '',
        component: LeaveSetup
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatPaginatorModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatTabsModule,
        InlineSVGModule,
        FullCalendarModule,
        SpinnerModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTreeModule,
        MatCheckboxModule,
        MatButtonModule,
        ClickOutsideModule,
        MatRadioModule,
        MatDialogModule,
        NgxMaterialTimepickerModule,
        RouterModule.forChild(routes)
    ],
    providers: [EmployeeListDatabase],
    entryComponents: [SnackbarNotificationPage, DeleteCalendarConfirmationPage],
    declarations: [ManageHolidayPage, LeaveSetup, AssignCalendarPage, SnackbarNotificationPage, DeleteCalendarConfirmationPage,
        LeaveSetupTabPage, ApplyOnBehalfPage, ApprovalOverridePage, LeaveAdjustmentPage, LeaveEntitlementByBatchPage, WorkingHourPage,
        WorkingHourListPage]
})
export class LeaveSetupModule { }
