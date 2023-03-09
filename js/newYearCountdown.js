"use strict;"

/** General Info For This JavaScript file *************************************
 *
 * Project      : newYearCountdownOOPVersion
 * File Type    : JavaScript
 * File Editor  : File was last edited using: VSCodium
 * Description  :
 * ****************************************************************************
 * Author   : Toni Calfim (751127@gmail.com)
 * ****************************************************************************
 * Version  : v1.0.0.3
 * Created  : Jan, 2023
 * Modified : Jan, 2023
 * Lincence : MIT
 * ****************************************************************************
 * History: v1.0.0.3: > The getters were created. > Calculation of delta time
 * and the update of the countdown elements are now in diferent methods. > The
 * displays elements are updated independently according to their timers.
** ************************************************************************ **/

class newYearCountdown {

    /** Once-only access to DOM */
    /** *********************** */
    #daysEl = document.getElementById("digits-days");
    #hoursEl = document.getElementById("digits-hours");
    #minutesEl = document.getElementById("digits-minutes");
    #secondsEl = document.getElementById("digits-seconds");
    #milisecondsEl = document.getElementById("digits-miliseconds");

    #newYearTime = new Date("Jan 1, 2024 00:00:01").getTime();

    #milisecond = 1;
    #secondInMs = 1000 * this.#milisecond;
    #minuteInMs = 60 * this.#secondInMs;
    #hourInMs = 60 * this.#minuteInMs;
    #dayInMs = 24 * this.#hourInMs;

    /** Used by #updateDeltas and #updateCountdown */
    #deltas = [];

    constructor() {

        this.#startCountdown();

    };

    /** Define Setters and Getters */
    /** ************************** */
    get daysLeft() {

        return this.#daysEl.innerText;

    };

    get hoursLeft() {

        return this.#hoursEl.innerText;

    };

    get minutesLeft() {

        return this.#minutesEl.innerText;

    };

    get secondsLeft() {

        return this.#secondsEl.innerText;

    };

    get milisecondsLeft() {

        return this.#milisecondsEl.innerText;

    };

    /** Define methods */
    /** ************** */
    #startCountdown() {

        /** Anonymous function first update of everything */
        (() => {

            this.#deltas = this.#updateDeltas();

            this.#updateCountdown(this.#deltas[0], this.#deltas[1], this.#deltas[2], this.#deltas[3], this.#deltas[4]);

        })();

        this.#updateDaysEl();

        this.#updateHoursEl();

        this.#updateMinutesEl();

        this.#updateSecondsEl();

        this.#updateMilisecondsEl();

    };

    #updateDeltas() {

        const now = new Date().getTime();
        const deltaT = this.#newYearTime - now;

        const deltaDay = Math.floor(deltaT / this.#dayInMs);
        const deltaHour = Math.floor(deltaDay * 24);
        const deltaMinute = Math.floor((deltaT / this.#dayInMs) * 60 * 60);
        const deltaSecond = Math.floor((deltaT / this.#dayInMs) * 24 * 60 * 60);
        const deltaMilisecond = Math.floor((deltaT / this.#dayInMs) * 24 * 60 * 60 * 1000);

        return [deltaDay, deltaHour, deltaMinute, deltaSecond, deltaMilisecond];

    };

    #updateCountdown(day, hour, minute, second, milisecond) {

        this.#daysEl.innerText = day.toLocaleString("pt-br");
        this.#hoursEl.innerText = hour.toLocaleString("pt-br");
        this.#minutesEl.innerText = minute.toLocaleString("pt-br");
        this.#secondsEl.innerText = second.toLocaleString("pt-br");
        this.#milisecondsEl.innerText = milisecond.toLocaleString("pt-br");

    };

    #updateDaysEl() {

        setInterval(() => {

            this.#deltas = this.#updateDeltas();

            let day = this.#deltas[0];

            this.#daysEl.innerText = day.toLocaleString("pt-br");

        }, this.#dayInMs);

    };

    #updateHoursEl() {

        setInterval(() => {

            this.#deltas = this.#updateDeltas();

            let hour = this.#deltas[1];

            this.#hoursEl.innerText = hour.toLocaleString("pt-br");

        }, this.#hourInMs);

    };

    #updateMinutesEl() {

        setInterval(() => {

            this.#deltas = this.#updateDeltas();

            let minute = this.#deltas[2];

            this.#minutesEl.innerText = minute.toLocaleString("pt-br");

        }, this.#minuteInMs);

    };

    #updateSecondsEl() {

        setInterval(() => {

            this.#deltas = this.#updateDeltas();

            let second = this.#deltas[3];

            this.#secondsEl.innerText = second.toLocaleString("pt-br");

        }, this.#secondInMs);

    };

    #updateMilisecondsEl() {

        setInterval(() => {

            this.#deltas = this.#updateDeltas();

            let milisecond = this.#deltas[4];

            /** Method slice because seconds and miliseconds are almost the same value */
            this.#milisecondsEl.innerText = milisecond.toString().slice(-3);

        }, 75);

    };

};