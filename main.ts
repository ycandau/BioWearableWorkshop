let neoStrip = neopixel.createStrip(
BoardID.zero,
ClickID.Zero,
neoPin.P0,
64,
NeoPixelMode.RGBW
)
basic.forever(function () {
    biowearables.drawDiskMicrobit(100, 100)
})
