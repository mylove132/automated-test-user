import { AxiosRequestConfig } from 'axios';
import { of, Observable } from 'rxjs';
import { HttpService } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';


export class CurlUtil {

    constructor(
		private httpService: HttpService
    ) { }
    
    makeRequest(config: AxiosRequestConfig): Observable<any> {
		return this.httpService.request(config).pipe(
			map(res => {
				return this.verifyMiddleWare(res) ? { result: true, data: res.data } : { result: false, data: res.data };
			}),
			catchError(error => of(`status：${error.response['status']} statusText：${error.response['statusText']}`)),
		);
    };
    
    private verifyMiddleWare(res: any): boolean {
		if (+res.status === 200) {
			return true;
		} else {
			return false;
		}
	};
}