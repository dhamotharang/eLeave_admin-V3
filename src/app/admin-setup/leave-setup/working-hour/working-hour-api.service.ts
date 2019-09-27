import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { APIService } from "src/services/shared-service/api.service";
import { MatSnackBar } from "@angular/material";
import { SnackbarNotificationPage } from "../snackbar-notification/snackbar-notification";

/**
 * Working hour profile API
 * @export
 * @class WorkingHourAPIService
 */
@Injectable({
    providedIn: 'root'
})
export class WorkingHourAPIService {

    /**
     *Creates an instance of WorkingHourAPIService.
     * @param {Http} http
     * @param {APIService} apiService
     * @param {MatSnackBar} snackBar
     * @memberof WorkingHourAPIService
     */
    constructor(public http: Http, private apiService: APIService, public snackBar: MatSnackBar) {
    }

    /**
     * get all list of working hour profile
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    get_working_hours_profile_list(): Observable<any> {
        return this.apiService.getApi('/api/admin/working-hours/working-hours-profile');
    }

    /**
     * get details from requested working hour profile id
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    get_working_hours_details(id: string): Observable<any> {
        return this.apiService.getApiWithId('/api/admin/working-hours/', id);
    }

    /** 
     * post data to create new working hour profile
     * @param {*} body
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    post_working_hours(body: any): Observable<any> {
        return this.apiService.postApi(body, '/api/admin/working-hours/working-hours-profile');
    }

    /**
     * udpate details of selected working profile
     * @param {*} data
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    patch_working_hours(data: any): Observable<any> {
        return this.apiService.patchApi(data, '/api/admin/working-hours/working-hours-profile');
    }

    /**
     * delete selected working hour profile
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    delete_working_hours_profile(id: string): Observable<any> {
        return this.apiService.deleteApi(id, '/api/admin/working-hours/working-hours-profile/');
    }

    /**
     * assign working hour profile to user
     * @param {*} data
     * @returns {Observable<any>}
     * @memberof WorkingHourAPIService
     */
    patch_user_working_hours(data: any): Observable<any> {
        return this.apiService.deleteApi(data, '/api/admin/working-hours/user-working-hours');
    }

    /**
     * show pop up snackbar
     * @param {string} txt
     * @memberof WorkingHourAPIService
     */
    showPopUp(txt: string) {
        this.snackBar.openFromComponent(SnackbarNotificationPage, {
            duration: 5000,
            data: txt
        });
    }


}