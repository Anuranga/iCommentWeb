/**
 * Created by Ashain on 2018.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class Filters {

    constructor() {

    }

    static get or() {
        return 'or';
    }

    static get and() {
        return 'and';
    }

    static get equal() {
        return {name: 'equal', filterName: 'equal', operator: 1}
    }

    static get notEqual() {
        return {name: 'notEqual', filterName: 'notEqual', operator: 7}
    }

    static get contains() {
        return {name: 'Contains', filterName: 'contains', operator: 2}
    }

    static get beginWith() {
        return {name: 'Begin With', filterName: 'beginWith', operator: 3}
    }

    static get endWith() {
        return {name: 'End With', filterName: 'endWith', operator: 4}
    }

    /*static get greaterThan() {
     return {name: 'Greater Than', filterName: 'greaterThan', operator: 4}
     }

     static get greaterThanOrEqualTo() {
     return {name: 'Greater Than Or EqualTo', filterName: 'greaterThanOrEqualTo', operator: 5}
     }



     static get lessThan() {
     return {name: 'Less Than', filterName: 'lessThan', operator: 7}
     }

     static get lessThanOrEqualTo() {
     return {name: 'Less Than Or Equal To', filterName: 'lessThanOrEqualTo', operator: 8}
     }

     static get isNotNull() {
     return {name: 'Is Not Null', filterName: 'isNotNull', operator: 9}
     }

     static get isNull() {
     return {name: 'Is Null', filterName: 'isNull', operator: 10}
     }*/

    static get between() {
        return {name: 'Between', filterName: 'between', operator: 5}
    }

    static get in() {
        return {name: 'In', filterName: 'in', operator: 6}
    }

    /*static get notIn() {
     return {name: 'Not In', filterName: 'notIn', operator: 13}
     }*/

    /**
     * Get List of supported filters (Usful when creating other widgets base on these filters)
     * @returns {{contains: {name: string, filterName: string, operator: number}, beginWith: {name: string, filterName: string, operator: number}, endWith: {name: string, filterName: string, operator: number}, equal: {name: string, filterName: string, operator: number}, between: {name: string, filterName: string, operator: number}, in: {name: string, filterName: string, operator: number}}}
     */
    static get supportedFilters() {
        return {
            contains: {name: 'Contains', filterName: 'contains', operator: 2},
            beginWith: {name: 'Begin With', filterName: 'beginWith', operator: 3},
            endWith: {name: 'End With', filterName: 'endWith', operator: 4},
            // greaterThan: {name: 'Greater Than', filterName: 'greaterThan', operator: 4},
            // greaterThanOrEqualTo: {name: 'Greater Than Or EqualTo', filterName: 'greaterThanOrEqualTo', operator: 5},
            equal: {name: 'equal', filterName: 'equal', operator: 1},
            notEqual: {name: 'Not Equal', filterName: 'notEqual', operator: 7},
            // lessThan: {name: 'Less Than', filterName: 'lessThan', operator: 7},
            // lessThanOrEqualTo: {name: 'Less Than Or Equal To', filterName: 'lessThanOrEqualTo', operator: 8},
            // isNotNull: {name: 'Is Not Null', filterName: 'isNotNull', operator: 9},
            // isNull: {name: 'Is Null', filterName: 'isNull', operator: 10},
            between: {name: 'Between', filterName: 'between', operator: 5},
            in: {name: 'In', filterName: 'in', operator: 6},
            // notIn: {name: 'Not In', filterName: 'notIn', operator: 13}
        }
    }

    /**
     *
     * @param filter
     * @param options
     * @returns {{field, value, filter: *}}
     */
    static filter(filter, options) {
        return {field: options.field, value: options.value, filter: filter}
    }


    /**
     * Convert filter options to request/url friendly format so they can be used in requests
     * @param filters
     * @returns {Array}
     */
    static prepareFilters(filters) {
        let preparedFilters = [];
        for (let filter of filters) {
            //filters with single value
            if ([1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13].indexOf(filter.operator.operator) > -1) {

                //if filter dose not contain any value just remove it
                if (filter.value == undefined || filter.value === null || filter.value === '') {
                    continue;
                }

                let flt = {
                    field: filter.field,
                    value: filter.value,
                    operator: filter.operator.operator
                };

                //If filter contains a BOOLEAN the set it
                // if (filter.boolean != undefined) {
                //     flt.boolean = filter.boolean;
                // }

                preparedFilters.push(flt);
                continue;
            }

            //no value type filters (eg:- isNot, isNull)
            if ([9, 10].indexOf(filter.filter.operator) > -1) {
                let flt = {field: filter.field, operator: filter.operator.operator};
                preparedFilters.push(flt);
            }
        }
        return preparedFilters;
    }


}

