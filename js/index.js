const colorPicker = document.getElementById("color-picker")
const colorScheme = document.getElementById("color-scheme")
const getColorBtn = document.getElementById("get-color-scheme-btn")
const colorBlocks = document.getElementById("color-blocks")
const colorNames = document.getElementById("color-names")

getColorBtn.addEventListener("click", getColors)
colorBlocks.addEventListener("click", copyHex)
colorNames.addEventListener("click", copyHex)

function getColors() {
    const hexNum = (colorPicker.value).slice(1)
    const modeName = colorScheme.value
    const url = `https://www.thecolorapi.com/scheme?hex=${hexNum}&mode=${modeName}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const hexArr = (data.colors).map(item => {
                const {value} = item.hex
                return value
            })
            renderColorScheme(hexArr)
        })
}

function renderColorScheme(dataArr) {
    const stringToRender = dataArr.map(value => {
        return `<div style="background-color: ${value};" aria-label=${value}></div>`
    })

    const hexToRender = dataArr.map(value => {
        return `<p>${value}</p>`
    })

    colorBlocks.innerHTML = stringToRender.join("")
    colorNames.innerHTML = hexToRender.join("")
}

function copyHex(event) {
    const {ariaLabel, innerHTML} = event.target
    const toClipboard = innerHTML ? innerHTML : ariaLabel

    navigator.clipboard.writeText(toClipboard)
        .then(() => alert(`${toClipboard} copied`))
        .catch(err => console.log(err))
}