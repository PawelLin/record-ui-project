import CalcNumber from './CalcNumber.vue'

CalcNumber.install = function (app) {
    app.component(CalcNumber.name, CalcNumber)
}

export default CalcNumber
