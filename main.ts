let leftMotor = bBoard_Motor.createMotor(BoardID.zero, ClickID.Zero, bBoard_Motor.motorDriver.right)
let neoStrip = neopixel.createStrip(
BoardID.zero,
ClickID.Zero,
neoPin.P0,
64,
NeoPixelMode.RGBW
)
neoStrip.setBrightness(5)
basic.forever(function () {
    BioWearables.drawSpiral(BioWearables.simulateBreath(5), neopixel.colors(NeoPixelColors.Indigo), RotationDir.CounterClockwise, neoStrip)
    leftMotor.motorEnable(bBoard_Motor.motorState.enabled)
    leftMotor.motorDutyDirection(50, bBoard_Motor.motorDirection.forward)
})
