import { OnInit, Component } from "@angular/core";
import { WorkingHourAPIService } from "../working-hour-api.service";
import { MatDialog } from "@angular/material";
import { DialogDeleteConfirmationPage } from "../../../role-management/dialog-delete-confirmation/dialog-delete-confirmation.page";

/**
 * working hour profile list page
 * @export
 * @class WorkingHourListPage
 * @implements {OnInit}
 */
@Component({
    selector: 'app-working-hour-list',
    templateUrl: './working-hour-list.page.html',
    styleUrls: ['./working-hour-list.page.scss'],
})
export class WorkingHourListPage implements OnInit {

    /**
     * get profile list from endpoint
     * @type {*}
     * @memberof WorkingHourListPage
     */
    public list: any;

    /**
     * show/hide details page
     * @type {boolean}
     * @memberof WorkingHourListPage
     */
    public showDetailPage: boolean = false;

    /**
     *Creates an instance of WorkingHourListPage.
     * @param {WorkingHourAPIService} workingHrAPI
     * @param {MatDialog} dialog
     * @memberof WorkingHourListPage
     */
    constructor(private workingHrAPI: WorkingHourAPIService, public dialog: MatDialog) {
    }

    async ngOnInit() {
        this.list = await this.workingHrAPI.get_working_hours_profile_list().toPromise();
        for (let i = 0; i < this.list.length; i++) {
            let details = await this.workingHrAPI.get_working_hours_details(this.list[i].working_hours_guid).toPromise();
            this.list[i].strtime = details.property.fullday.start_time;
            this.list[i].endtime = details.property.fullday.end_time;
        }
    }

    /**
     * show/hide details page (value from child component)
     * @param {*} value
     * @memberof WorkingHourListPage
     */
    valueChanged(value) {
        this.showDetailPage = value;
        this.ngOnInit();
    }

    /**
     * delete working hour profile
     * @param {string} working_hour_guid
     * @param {string} name
     * @memberof WorkingHourListPage
     */
    deleteWorkingHrProfile(working_hour_guid: string, name: string) {
        const dialogRef = this.dialog.open(DialogDeleteConfirmationPage, {
            data: { value: working_hour_guid, name: name }
        });
        dialogRef.afterClosed().subscribe(val => {
            if (val === working_hour_guid) {
                this.workingHrAPI.delete_working_hours_profile(working_hour_guid).subscribe(response => {
                    this.ngOnInit();
                    this.workingHrAPI.showPopUp('deleted successfully ');
                })
            }
        });
    }
}