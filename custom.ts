/**
 * Custom blocks for the BioWearable workshop.
 */

enum RotationDir {
  //% block="Clockwise"
  Clockwise = 1,
  //% block="Counter-clockwise"
  CounterClockwise = -1
}

/**
* Custom blocks
*/

//% weight=110
//% color=#F7931E
//% icon="\uf1b3"
//% groups=['Input', 'Mappings', 'Output', 'Microbit']
namespace biowearables {

    export function scale(x: number, max: number): number {
        return Math.max(0, Math.min(max, x * (max + 1) / 100)) >> 0
    }

  //% block="get simulated breath: duration=%duration"
  //% duration.min=5 duration.defl=5
  //% group="Input"
  export function simulateBreath(duration: number): number {
      return (50 * (1 - Math.cos(Math.PI * input.runningTime() * 0.002 / duration)))
  }

  /**
   * Draw a spiral on a Neopixel LED strip. Make sure to provide an initialized Neopixel variable.
   * @param length The length of the spiral (0 to 100).
   * @param color The color of the spiral (24 bit).
   * @param brightness The brightness of the spiral (0 to 100).
   * @param direction The direction of the spiral.
   * @param neoStrip The Neopixel LED strip.
   */

  //% block="$neoStrip=variables_get(myNeopixel)|draw spiral on Neopixel: length = $length|color = $color|brightness = $brightness|direction = $direction"
  //% length.min=0 length.max=100 length.defl=25
  //% color.shadow=neopixel_colors
  //% brightness.min=0 brightness.max=100 brightness.defl=10
  //% inlineInputMode=inline
  //% group="Output"

  export function drawSpiralNeopixel(
    length: number,
    color: number,
    brightness: number,
    direction: RotationDir,
    neoStrip: neopixel.Strip = null): void {

    if (!neoStrip) return
    
    let x = 36
    const dx = (direction === RotationDir.Clockwise)
        ? [-1, -8, 1, 8]
        : [-8, -1, 8, 1]

    length = biowearables.scale(length, 64)
    neoStrip.clear()
    neoStrip.setBrightness(biowearables.scale(brightness, 255))

    for (let segmentIndex = 0, count = 0; count < length; segmentIndex++) {
        let segmentLength = (segmentIndex >> 1) + 1
        segmentLength = Math.min(segmentLength, length - count)
        for (let i = 0; i < segmentLength; i++) {
            neoStrip.setPixelColor(x, color)
            x += dx[segmentIndex % 4]
        }
        count += segmentLength
    }
    neoStrip.show()
  }

    /**
     * Draw a spiral on the Microbit LED matrix.
     * @param length The length of the spiral (0 to 100).
     * @param brightness The brightness of the spiral (0 to 100).
     * @param direction The direction of the spiral.
     */

    //% block="draw spiral on Microbit: length = $length|brightness = $brightness|direction = $direction"
    //% length.min=0 length.max=100 length.defl=25
    //% brightness.min=0 brightness.max=100 brightness.defl=10
    //% inlineInputMode=inline
    //% group="Microbit"

    export function drawSpiralMicrobit(
        length: number,
        brightness: number,
        direction: RotationDir): void {
    
        let x = 12    // 2 * 5 + 2
        const dx = (direction === RotationDir.Clockwise)
            ? [1, 5, -1, -5]
            : [1, -5, -1, 5]

        length = biowearables.scale(length, 25)
        led.setBrightness(biowearables.scale(brightness, 255))

        for (let segmentIndex = 0, count = 0; segmentIndex < 9; segmentIndex++) {
            for (let i = 0; i < (segmentIndex >> 1) + 1; i++, count++) {
                if (count < length) {
                    led.plot(x % 5, x / 5)
                } else {
                    led.unplot(x % 5, x / 5)
                }
                x += dx[segmentIndex % 4]
            }
        }
    }

    /**
     * Draw a single bar on the Microbit LED matrix.
     * @param length The length of the bar (0 to 100).
     * @param brightness The brightness of the bar (0 to 100).
     */

    //% block="draw bar on Microbit: length = $length|brightness = $brightness"
    //% length.min=0 length.max=100 length.defl=25
    //% brightness.min=0 brightness.max=100 brightness.defl=10
    //% inlineInputMode=inline
    //% group="Microbit"

    export function drawBarMicrobit(
        length: number,
        brightness: number): void {
    
        length = biowearables.scale(length, 5)
        led.setBrightness(biowearables.scale(brightness, 255))

        for (let y = 0; y < 5; y++) {
            led.unplot(0, y)
            led.unplot(4, y)
        }
        for (let y = 0; y < 5 - length; y++) {
            led.unplot(1, y)
            led.unplot(2, y)
            led.unplot(3, y)
        }
        for (let y = 5 - length; y < 5; y++) {
            led.plot(1, y)
            led.plot(2, y)
            led.plot(3, y)
        }
    }

    /**
     * Draw double bars on the Microbit LED matrix.
     * @param length1 The length of the first bar (0 to 100).
     * @param brightness1 The brightness of the first bar (0 to 100).
     * @param $length2 The length of the second bar (0 to 100).
     * @param brightness2 The brightness of the second bar (0 to 100).
     */

    //% block="draw double bars on Microbit: length 1 = $length1|brightness 1 = $brightness1|length 2 = $length2|brightness 2 = $brightness2"
    //% length1.min=0 length1.max=100 length1.defl=25
    //% brightness1.min=0 brightness1.max=100 brightness1.defl=10
    //% length2.min=0 length2.max=100 length2.defl=25
    //% brightness2.min=0 brightness2.max=100 brightness2.defl=10
    //% inlineInputMode=inline
    //% group="Microbit"

    export function drawDoubleBarsMicrobit(
        length1: number,
        brightness1: number,
        length2: number,
        brightness2: number): void {
    
        length1 = biowearables.scale(length1, 5)
        length2 = biowearables.scale(length2, 5)
        brightness1 = biowearables.scale(brightness1, 255)
        brightness2 = biowearables.scale(brightness2, 255)

        for (let y = 0; y < 5 - length1; y++) {
            led.unplot(0, y)
            led.unplot(1, y)
        }
        for (let y = 5 - length1; y < 5; y++) {
            led.plotBrightness(0, y, brightness1)
            led.plotBrightness(1, y, brightness1)
        }
        for (let y = 0; y < 5; y++) {
            led.unplot(2, y)
        }
        for (let y = 0; y < 5 - length2; y++) {
            led.unplot(3, y)
            led.unplot(4, y)
        }
        for (let y = 5 - length2; y < 5; y++) {
            led.plotBrightness(3, y, brightness2)
            led.plotBrightness(4, y, brightness2)
        }
    }

    /**
     * Draw double bars on the Microbit LED matrix.
     * @param value The value to plot (0 to 100).
     * @param frequency The brightness of the first bar (0 to 100).
     */

    //% block="draw double bars on Microbit: length 1 = $length1|brightness 1 = $brightness1|length 2 = $length2|brightness 2 = $brightness2"
    //% value.min=0 value.max=100 value.defl=25
    //% frequency.min=0 frequency.max=100 frequency.defl=10
    //% inlineInputMode=inline
    //% group="Microbit"

    export function drawFill(
        value: number,
        frequency: number): void {
    
        // length1 = biowearables.scale(length1, 5)
        // brightness1 = biowearables.scale(brightness1, 255)


 
    }
}