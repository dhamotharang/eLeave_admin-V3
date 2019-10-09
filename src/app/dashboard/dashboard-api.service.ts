import { Injectable } from '@angular/core';
import { APIService } from 'src/services/shared-service/api.service';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

/**
 * ALl API for dashboard page
 * @export
 * @class DashboardApiService
 */
@Injectable({
    providedIn: 'root'
})
export class DashboardApiService {

    /**
     *Creates an instance of DashboardApiService.
     * @param {APIService} apiService
     * @param {Http} http
     * @memberof DashboardApiService
     */
    constructor(private apiService: APIService, public http: Http) {
    }

    /**
     * get all announcement created from admin
     * @returns
     * @memberof DashboardApiService
     */
    get_announcement_list() {
        return this.apiService.getApi('/api/admin/announcement');
    }

    /**
     * get upcoming holidays from today date
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_upcoming_holidays(): Observable<any> {
        return this.apiService.getApi('/api/employee/upcoming-holiday');
    }

    /**
     * get long leave (>5 days) details
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_long_leave_reminder(): Observable<any> {
        return this.apiService.getApi('/api/employee/long-leave');
    }

    /**
     * get dashboard task to be done
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    get_task_list(): Observable<any> {
        return this.apiService.getApi('/api/employee/dashboard-my-task');
    }

    /**
     * admin approve task leave from dashboard
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    post_approve_list(leaveTransactionGUID): Observable<any> {
        return this.http.post(this.apiService.baseUrl + '/api/leave/approved', leaveTransactionGUID, { headers: this.apiService.headers })
            .pipe(map((res: Response) => res.text()))
    }

    /**
     * admin reject task leave from dashboard
     * @returns {Observable<any>}
     * @memberof DashboardApiService
     */
    post_reject_list(GUID): Observable<any> {
        return this.http.post(this.apiService.baseUrl + '/api/leave/rejected', GUID, { headers: this.apiService.headers })
            .pipe(map((res: Response) => res.text()))
    }


}