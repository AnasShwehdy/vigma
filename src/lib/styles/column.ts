import { state, main } from "../index"


export default function generateCol(component: GroupNode) {
    if (component.name.includes("cols-12") && !state.globalStyle.toString().includes("cols-12")) {
        state.globalStyle.push(`.cols-12 {`)
        state.globalStyle.push(`${main.space(1)}width: 100%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-11") && !state.globalStyle.toString().includes("cols-11")) {
        state.globalStyle.push(`.cols-11 {`)
        state.globalStyle.push(`${main.space(1)}width: 91.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-10") && !state.globalStyle.toString().includes("cols-10")) {
        state.globalStyle.push(`.cols-10 {`)
        state.globalStyle.push(`${main.space(1)}width: 83.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-9") && !state.globalStyle.toString().includes("cols-9")) {
        state.globalStyle.push(`.cols-9 {`)
        state.globalStyle.push(`${main.space(1)}width: 75%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-8") && !state.globalStyle.toString().includes("cols-8")) {
        state.globalStyle.push(`.cols-8 {`)
        state.globalStyle.push(`${main.space(1)}width: 66.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-7") && !state.globalStyle.toString().includes("cols-7")) {
        state.globalStyle.push(`.cols-7 {`)
        state.globalStyle.push(`${main.space(1)}width: 58.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-6") && !state.globalStyle.toString().includes("cols-6")) {
        state.globalStyle.push(`.cols-6 {`)
        state.globalStyle.push(`${main.space(1)}width: 50%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-5") && !state.globalStyle.toString().includes("cols-5")) {
        state.globalStyle.push(`.cols-5 {`)
        state.globalStyle.push(`${main.space(1)}width: 41.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-4") && !state.globalStyle.toString().includes("cols-4")) {
        state.globalStyle.push(`.cols-4 {`)
        state.globalStyle.push(`${main.space(1)}width: 33.3%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-3") && !state.globalStyle.toString().includes("cols-3")) {
        state.globalStyle.push(`.cols-3 {`)
        state.globalStyle.push(`${main.space(1)}width: 25%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-2") && !state.globalStyle.toString().includes("cols-2")) {
        state.globalStyle.push(`.cols-2 {`)
        state.globalStyle.push(`${main.space(1)}width: 16.6%;`)
        state.globalStyle.push(`}`)
    }
    if (component.name.includes("cols-1") && !state.globalStyle.toString().includes("cols-1")) {
        state.globalStyle.push(`.cols-1 {`)
        state.globalStyle.push(`${main.space(1)}width: 8.3%;`)
        state.globalStyle.push(`}`)
    }

}



