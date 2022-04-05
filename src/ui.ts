import './ui.css'
// import { copyToClipboardAsync } from 'figx'



document.getElementById('create').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'create' } }, '*')
}

// document.getElementById('copy').onclick = () => {
//     const promise = copyToClipboardAsync("text");}

onmessage = (event) => {
    if (event.data.pluginMessage.type === "created-app") {
        let page = document.createElement("details")
        let summary = document.createElement("summary")

        summary.innerText = "global.css"


        let pre = document.createElement("pre")
        let code = document.createElement("code")
        pre.innerText = "// global.css"

        let tempCode = document.createElement("p")
        let templateContent = event.data.pluginMessage.data.globalStyle.toString().replace(RegExp(",", "g"), "\n")
        tempCode.innerText = templateContent

        code.appendChild(tempCode)


        pre.appendChild(code)
        page.appendChild(summary)
        page.appendChild(pre)
        let brakLine = document.createElement("br")
        document.body.appendChild(page)
        document.body.appendChild(brakLine)

        let pages = event.data.pluginMessage.data.pages
        for (let i = 0; i < pages.length; i++) {

            let page = document.createElement("details")
            let summary = document.createElement("summary")

            summary.innerText = pages[i].name


            let pre = document.createElement("pre")
            let code = document.createElement("code")
            pre.innerText = "// index.vue"

            let tempCode = document.createElement("p")
            let templateContent = pages[i].template.toString().replace(RegExp(",", "g"), "\n")
            tempCode.innerText = templateContent

            code.appendChild(tempCode)

            let styleCode = document.createElement("p")
            let styleContent = pages[i].style.toString().replace(RegExp(",", "g"), "\n")
            styleCode.innerText = styleContent

            code.appendChild(styleCode)

            pre.appendChild(code)
            page.appendChild(summary)
            page.appendChild(pre)
            let brakLine = document.createElement("br")
            document.body.appendChild(page)
            document.body.appendChild(brakLine)

        }



    }

    console.log(event.data.pluginMessage)
}