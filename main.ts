let neoStrip = neopixel.createStrip(
BoardID.zero,
ClickID.Zero,
neoPin.P0,
64,
NeoPixelMode.RGBW
)
basic.forever(function () {
    biowearables.drawDoubleBarsMicrobit(biowearables.simulateBreath(5), 30, biowearables.simulateBreath(3), 93)
})
