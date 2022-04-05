import { state, main } from "../index"


export default function generateCol(component: GroupNode) {
    if (component.name.includes("col-12") && !state.globalStyle.toString().includes("col-12")) {
        state.globalStyle.push(`.col-12 {`)
        state.globalStyle.push(`${main.space(1)}width: 100%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-11") && !state.globalStyle.toString().includes("col-11")) {
        state.globalStyle.push(`.col-11 {`)
        state.globalStyle.push(`${main.space(1)}width: 91.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-10") && !state.globalStyle.toString().includes("col-10")) {
        state.globalStyle.push(`.col-10 {`)
        state.globalStyle.push(`${main.space(1)}width: 83.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-9") && !state.globalStyle.toString().includes("col-9")) {
        state.globalStyle.push(`.col-9 {`)
        state.globalStyle.push(`${main.space(1)}width: 75%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-8") && !state.globalStyle.toString().includes("col-8")) {
        state.globalStyle.push(`.col-8 {`)
        state.globalStyle.push(`${main.space(1)}width: 66.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-7") && !state.globalStyle.toString().includes("col-7")) {
        state.globalStyle.push(`.col-7 {`)
        state.globalStyle.push(`${main.space(1)}width: 58.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-6") && !state.globalStyle.toString().includes("col-6")) {
        state.globalStyle.push(`.col-6 {`)
        state.globalStyle.push(`${main.space(1)}width: 50%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-5") && !state.globalStyle.toString().includes("col-5")) {
        state.globalStyle.push(`.col-5 {`)
        state.globalStyle.push(`${main.space(1)}width: 41.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-4") && !state.globalStyle.toString().includes("col-4")) {
        state.globalStyle.push(`.col-4 {`)
        state.globalStyle.push(`${main.space(1)}width: 33.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-3") && !state.globalStyle.toString().includes("col-3")) {
        state.globalStyle.push(`.col-3 {`)
        state.globalStyle.push(`${main.space(1)}width: 25%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-2") && !state.globalStyle.toString().includes("col-2")) {
        state.globalStyle.push(`.col-2 {`)
        state.globalStyle.push(`${main.space(1)}width: 16.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("col-1") && !state.globalStyle.toString().includes("col-1")) {
        state.globalStyle.push(`.col-1 {`)
        state.globalStyle.push(`${main.space(1)}width: 8.3%;`)
        state.globalStyle.push(`}`)
    }

}



