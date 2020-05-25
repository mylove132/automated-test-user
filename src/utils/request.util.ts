import {Method} from 'axios';

export class RequestUtil {
    getRequestMethodTypeString = (type: number): Method => {
        switch (type) {
            case 0:
                return 'GET';
            case 1:
                return 'POST';
            case 2:
                return 'DELETE';
            case 3:
                return 'PUT';
            default:
                return 'GET';
        }
    }
}
