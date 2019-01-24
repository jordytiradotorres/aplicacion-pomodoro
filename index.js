const POMODORO_STATES = {
    WORK: 'work',
    REST: 'rest'
}

const STATES = {
    STARTED: 'started',
    STOPPED: 'stopped',
    PAUSED: 'paused'
}

const WORKING_TIME_LENGTH_IN_MINUTES = 1;
const RESTING_TIME_LENGTH_IN_MINUTES = 5;

let app = new Vue({
    el: '#app',
    data: {
        state: STATES.STOPPED,
        minute: WORKING_TIME_LENGTH_IN_MINUTES,
        second: 0,
        pomodoroState: POMODORO_STATES.WORK,
        timestamp: 0
    },
    computed: {
        title () {
            return this.pomodoroState === POMODORO_STATES.WORK ? 'TRABAJANDO!' : 'DESCANSANDO!'
        },
        min () {
            if (this.minute < 10) {
                return '0' + this.minute
            }
            return this.minute
        },
        sec () {
            if (this.second < 10) {
                return '0' + this.second
            }
            return this.second
        }
    },
    methods: {
        start () {
            this.state = STATES.STARTED
            this._tick(),
            this.interval = setInterval(this._tick, 1000)
        },
        _tick () {
            // Actualizar el timestamp que se utiliza en la imagen src
            if (this.second % 10 === 0) {
                // .getTime(), devuelve el valor numérico correspondiente a la hora para la fecha especificada según la hora universal.
                this.timestamp = new Date().getTime()
            }

            // si el segundo no es 0, decrementar en uno
            if (this.second !== 0) {
                this.second--
                return
            }
            // si segundo es 0 y minuto no es 0
            // decrementar el minuto y poner segundo a 59
            if (this.minute !== 0) {
                this.minute--
                this.second = 59
                return
            }
            // si minuto es 0 y segundo es 0
            // alternar intervalos de trabajo/descanso
            this.pomodoroState = (this.pomodoroState === POMODORO_STATES.WORK) ? POMODORO_STATES.REST : POMODORO_STATES.WORK

            if (this.pomodoroState === POMODORO_STATES.WORK) {
                this.minute = WORKING_TIME_LENGTH_IN_MINUTES
            } else {
                this.minute = RESTING_TIME_LENGTH_IN_MINUTES
            }
        },
        paused () {
            this.state = STATES.PAUSED
            clearInterval(this.interval)
        },
        stop () {
            this.state = STATES.STOPPED
            clearInterval(this.interval)
            this.pomodoroState = POMODORO_STATES.WORK
            this.minute = WORKING_TIME_LENGTH_IN_MINUTES
            this.second = 0
        }
    }
})