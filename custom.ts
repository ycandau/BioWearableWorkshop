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
//% groups=['Input', 'Mappings', 'Output']
namespace BioWearables {

  //% block="Get simulated breath: duration=%duration"
  //% duration.min=5 duration.defl=5
  //% group="Input"
  export function simulateBreath(duration: number) {
      return (0.5 * (1 - Math.cos(Math.PI * input.runningTime() * 0.002 / duration)))
  }

  /**
   * Draw a spiral on a Neopixel LED strip
   * @param length The length of the spiral.
   * @param color The color of the spiral.
   * @param direction The direction of the spiral.
   * @param strip The Neopixel LED strip.
   */
  //% block="$neoStrip|Draw spiral: length = $length|color = $color=neopixel_colors|direction = $direction"
  //% strip.defl=strip
  //% length.min=0 length.max=1 length.defl=0.4
  //% inlineInputMode=inline
  // expandableArgumentMode="toggle"
  //% group="Output"
  export function drawSpiral(length: number, color: number, direction: RotationDir, neoStrip: neopixel.Strip) {
      const dx = (direction === RotationDir.Clockwise)
          ? [1, 8, -1, -8]
          : [8, 1, -8, -1]
      let x = 27
      let sideIndex = 0
      let sideLength = 1
      let count = 0

      // Clamp to 32 bit and truncate to integer
      length = (65 * Math.min(length, 1)) >> 0
      neoStrip.clear()

      while (count < length) {
          sideLength = Math.min(sideLength, length - count)
          for (let i = 0; i < sideLength; i++) {
              neoStrip.setPixelColor(x, color)
              x += dx[sideIndex % 4]
          }
          count += sideLength
          sideLength += sideIndex % 2
          sideIndex += 1
      }
      neoStrip.show()
  }
}
