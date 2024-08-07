const { lightningChart, renderToPNG } = require('@lightningchart/lcjs-headless')
const { PNG } = require('pngjs')
const { ColorHEX } = require('@lightningchart/lcjs')
const { makeCustomTheme } = require('@lightningchart/lcjs-themes')
const fs = require('fs')

const flatDarkTheme = makeCustomTheme({
    backgroundColor: ColorHEX('141619'),
    textColor: ColorHEX('c5ced7'),
    dataColors: [ColorHEX('e24d42')],
    axisColor: ColorHEX('00000000'),
    gridLineColor: ColorHEX('2c3235'),
    uiBackgroundColor: ColorHEX('141619'),
    uiBorderColor: ColorHEX('ffffff'),
    fontFamily: 'Verdana',
})

const chart = lightningChart({ warnings: false }).ChartXY({
    interactable: false,
    theme: flatDarkTheme,
})
chart.addLineSeries().addArrayY(new Array(100).fill(0).map((_) => Math.random()))
chart.addLegendBox().add(chart)

let renderFramePng = renderToPNG(chart, 1000, 800)
const outputBuff = PNG.sync.write(renderFramePng)
fs.writeFileSync(`./output.png`, outputBuff, () => {})
