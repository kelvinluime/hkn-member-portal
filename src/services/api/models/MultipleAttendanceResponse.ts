/* tslint:disable */
/* eslint-disable */
/**
 * HKN API 
 * HKN API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AttendanceResponse,
    AttendanceResponseFromJSON,
    AttendanceResponseFromJSONTyped,
    AttendanceResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface MultipleAttendanceResponse
 */
export interface MultipleAttendanceResponse {
    /**
     * 
     * @type {Array<AttendanceResponse>}
     * @memberof MultipleAttendanceResponse
     */
    attendances: Array<AttendanceResponse>;
}

export function MultipleAttendanceResponseFromJSON(json: any): MultipleAttendanceResponse {
    return MultipleAttendanceResponseFromJSONTyped(json, false);
}

export function MultipleAttendanceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultipleAttendanceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'attendances': ((json['attendances'] as Array<any>).map(AttendanceResponseFromJSON)),
    };
}

export function MultipleAttendanceResponseToJSON(value?: MultipleAttendanceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'attendances': ((value.attendances as Array<any>).map(AttendanceResponseToJSON)),
    };
}


