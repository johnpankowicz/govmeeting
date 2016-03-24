﻿/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

/**
 * <summary>
 *  A single meeting.
 * </summary>
**/
module SingleMeeting {

    /**
     * <summary>
     *  AngularJS controller for displaying the meeting header.
     * </summary>
    **/
    export class headingCtrl {

        meetingInfo: { name: string; date: string};
        _backEnd: IBackEndWithCtrl;

        static $inject = ["BackEndSrvWithCtrl"];

        /**
         * <summary>
         *  Constructor.
         * </summary>
         * <param name="backEnd">   The back end service. </param>
        **/
        constructor(backEnd: IBackEndWithCtrl) {
            this._backEnd = backEnd;
            this._backEnd.getMeetingInfo(this);
        }
    }
}
