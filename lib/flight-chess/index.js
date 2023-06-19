import FlightChess from './FlightChess.vue'

FlightChess.install = function (app) {
    app.component(FlightChess.name, FlightChess)
}

export default FlightChess
