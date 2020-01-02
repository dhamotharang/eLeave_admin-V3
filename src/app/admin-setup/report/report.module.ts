import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerModule } from 'src/library/spinner/spinner.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';
import { ReportComponent } from './report.component';


const routes: Routes = [
    {
        path: '',
        component: ReportComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatSelectModule,
        MatFormFieldModule,
        SpinnerModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    entryComponents: [],
    declarations: [ReportComponent]
})
export class ReportModule { }
