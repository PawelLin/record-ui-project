import DandelionClock from './DandelionClock'

DandelionClock.install = function (app) {
    app.component(DandelionClock.name, DandelionClock)
}

export default DandelionClock
