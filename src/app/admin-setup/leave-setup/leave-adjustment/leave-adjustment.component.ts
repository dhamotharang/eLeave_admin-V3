import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LeaveApiService } from "../leave-api.service";
import { APIService } from "src/services/shared-service/api.service";
import { SnackbarNotificationComponent } from "../snackbar-notification/snackbar-notification.component";
/**
 * leave adjusment page
 * @export
 * @class LeaveAdjustmentComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-leave-adjustment',
    templateUrl: './leave-adjustment.component.html',
    styleUrls: ['./leave-adjustment.component.scss'],
})
export class LeaveAdjustmentComponent implements OnInit {

    /**
     * validation group 
     * @type {*}
     * @memberof LeaveAdjustmentComponent
     */
    public adjustmentForm: any;

    /**
     * company list from API
     * @type {*}
     * @memberof LeaveAdjustmentComponent
     */
    public company: any;

    /**
     * department list from API
     * @type {*}
     * @memberof LeaveAdjustmentComponent
     */
    public department: any;

    /**
     * leavetype list from API
     * @type {*}
     * @memberof LeaveAdjustmentComponent
     */
    public leavetypeList: any;

    /**
     * filter users from selected company and department
     * @type {any[]}
     * @memberof LeaveAdjustmentComponent
     */
    public filteredUserItems: any[] = [];


    /**
     * enable/disable submit button according required item
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public disableSubmitButton: boolean = true;

    /**
     * value of main checkbox
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public mainCheckBox: boolean;

    /**
     * value of indeterminate in main checkbox
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public indeterminate: boolean;

    /**
     * hover value of show/hide checkbox
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public showCheckbox: boolean[] = [];

    /**
     * show/hide spinner when submit button is clicked
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public showSmallSpinner: boolean = false;

    /**
     * show/hide spinner when company & department selection is clicked
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public showSpinner: boolean = false;

    /**
     * show no result when user list is empty
     * @type {boolean}
     * @memberof LeaveAdjustmentComponent
     */
    public showNoResult: boolean = false;

    /**
     * selected company guid
     * @private
     * @type {string}
     * @memberof LeaveAdjustmentComponent
     */
    private _companyGUID: string;

    /**
     * user list from API
     * @private
     * @type {*}
     * @memberof LeaveAdjustmentComponent
     */
    private _userItems: any;

    /**
     * selected user details from user list
     * @private
     * @type {any[]}
     * @memberof LeaveAdjustmentComponent
     */
    private _selectedUser: any[] = [];

    /**
     * value of days with symbol add or minus
     * @private
     * @type {number}
     * @memberof LeaveAdjustmentComponent
     */
    private _numberOfDays: number;

    /**
     *Creates an instance of LeaveAdjustmentComponent.
     * @param {LeaveApiService} leaveSetupAPI
     * @param {APIService} apiService
     * @param {MatSnackBar} snackBar
     * @memberof LeaveAdjustmentComponent
     */
    constructor(private leaveSetupAPI: LeaveApiService, private apiService: APIService) {
        this.adjustmentForm = new FormGroup({
            company: new FormControl('', Validators.required),
            department: new FormControl('', Validators.required),
            leavetype: new FormControl('', Validators.required),
            reason: new FormControl('', Validators.required),
            noOfDay: new FormControl('', Validators.required),
            symbol: new FormControl('add', Validators.required)
        })
    }

    ngOnInit() {
        this.leaveSetupAPI.get_company_list().subscribe(list => this.company = list);
        this.leaveSetupAPI.get_admin_leavetype().subscribe(list => this.leavetypeList = list);
    }

    /**
     * select company & pass company guid to get department list
     * @param {*} guid
     * @memberof LeaveAdjustmentComponent
     */
    companySelected(guid) {
        // this.showSpinner = true;
        this._companyGUID = guid;
        this.leaveSetupAPI.get_company_details(guid).subscribe(list => {
            // this.showSpinner = false;
            this.department = list.departmentList;
        })
    }

    /**
     * get user list from API
     * @param {*} name
     * @memberof LeaveAdjustmentComponent
     */
    departmentSelected(name) {
        this.filteredUserItems = [];
        // this.showSpinner = true;
        this.apiService.get_user_profile_list().subscribe(list => {
            this._userItems = list;
            // this.showSpinner = false;
            this.filterUserList(this._userItems, name);
        })
    }

    /**
     * get entitled leave balance from requested userID 
     * @param {*} leavetypeGUID
     * @memberof LeaveAdjustmentComponent
     */
    getLeaveEntitlement(leavetypeGUID) {
        for (let i = 0; i < this.filteredUserItems.length; i++) {
            this.leaveSetupAPI.get_entilement_details(this.filteredUserItems[i].userId).subscribe(data => {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].LEAVE_TYPE_GUID === leavetypeGUID)
                        this.filteredUserItems[i].entitlement = data[j].ENTITLED_DAYS;
                }
            })
        }
    }

    /**
     * get user list to filter from selected compant & department
     * @param {*} userList
     * @param {string} name
     * @memberof LeaveAdjustmentComponent
     */
    filterUserList(userList: any, name: string) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].department === name && userList[i].companyId === this._companyGUID) {
                this.filteredUserItems.push(userList[i]);
                this.showCheckbox.push(false);
                this.filteredUserItems[this.filteredUserItems.length - 1].isChecked = false;
            }
        }
        if (this.filteredUserItems.length > 0) {
            this.showNoResult = false;
        } else {
            this.showNoResult = true;
        }
    }

    /**
     * checking to enable/disable submit button
     * @memberof LeaveAdjustmentComponent
     */
    enableDisableSubmitButton() {
        if (this.adjustmentForm.valid && (this.mainCheckBox || this.indeterminate)) {
            this.disableSubmitButton = false;
        } else {
            this.disableSubmitButton = true;
        }
    }

    /**
     * mouse hover to show/hide checkbox
     * @param {number} i
     * @param {boolean} mouseIn
     * @param {boolean} isChecked
     * @memberof LeaveAdjustmentComponent
     */
    hoverEvent(i: number, mouseIn: boolean, isChecked: boolean) {
        if (isChecked && (this.mainCheckBox || this.indeterminate)) {
            this.showCheckbox = [];
            this.filteredUserItems.map(value => { this.showCheckbox.push(true); });
        } else if (!isChecked && (this.mainCheckBox || this.indeterminate)) {
            this.showCheckbox.splice(0, this.showCheckbox.length);
            this.filteredUserItems.map(item => { this.showCheckbox.push(true); });
        } else if (mouseIn && !isChecked && !this.indeterminate && !this.mainCheckBox) {
            this.showCheckbox.splice(i, 1, true);
        } else {
            this.showCheckbox.splice(0, this.showCheckbox.length);
            this.filteredUserItems.map(item => { this.showCheckbox.push(false); });
        }
    }

    /**
     * check main checkbox to check all sub checkbox
     * @memberof LeaveAdjustmentComponent
     */
    mainCheckboxEvent() {
        this.showCheckbox.splice(0, this.showCheckbox.length);
        setTimeout(() => {
            this.filteredUserItems.forEach(item => {
                item.isChecked = this.mainCheckBox;
                if (item.isChecked) {
                    this.showCheckbox.push(true);
                } else {
                    this.showCheckbox.push(false);
                }
                this.enableDisableSubmitButton();
            });
        })
    }

    /**
     * check sub checkbox to make changing in main checkbox (interminate/mainCheckBox)
     * @memberof LeaveAdjustmentComponent
     */
    subEvent() {
        const totalLength = this.filteredUserItems.length;
        let ischecked = 0;
        this.filteredUserItems.map(item => {
            if (item.isChecked) {
                ischecked++;
                this.showCheckbox.push(true);
            }
        });
        if (ischecked > 0 && ischecked < totalLength) {
            this.indeterminate = true;
            this.mainCheckBox = false;
        } else if (ischecked == totalLength) {
            this.mainCheckBox = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = false;
            this.mainCheckBox = false;
        }
        this.enableDisableSubmitButton();
    }

    /**
     * get selected user from list
     * @memberof LeaveAdjustmentComponent
     */
    getCheckedUser() {
        if (this.adjustmentForm.controls.symbol.value === 'remove') {
            this._numberOfDays = -this.adjustmentForm.controls.noOfDay.value;
        } else {
            this._numberOfDays = this.adjustmentForm.controls.noOfDay.value;
        }
        this.filteredUserItems.forEach((element, i) => {
            if (element.isChecked) {
                this._selectedUser.push(this.filteredUserItems[i].userId);
            }
        });
    }

    /**
     * patch the leave adjustment day to API
     * @memberof LeaveAdjustmentComponent
     */
    patchLeaveNumber() {
        this.getCheckedUser();
        const data = {
            "leaveTypeId": this.adjustmentForm.controls.leavetype.value,
            "noOfDays": this._numberOfDays,
            "userId": this._selectedUser,
            "reason": this.adjustmentForm.controls.reason.value
        };
        this.leaveSetupAPI.patch_leave_adjustment(data).subscribe(response => {
            this.openNotification('You have submitted successfully', true);
            this.showSmallSpinner = false;
            this.filteredUserItems = [];
            this._selectedUser = [];
            this.filteredUserItems.forEach(element => {
                element.isChecked = false;
            });
        });
    }

    /**
     * show pop up snackbar
     * @param {string} statement
     * @memberof LeaveAdjustmentComponent
     */
    openNotification(statement: string, val: boolean) {
        this.leaveSetupAPI.snackBar.openFromComponent(SnackbarNotificationComponent, {
            duration: 2000,
            verticalPosition: "top",
            data: { message: statement, response: val }
        });
    }



}