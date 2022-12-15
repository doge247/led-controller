input.touchD0.onEvent(ButtonEvent.Down, function () {
    if (!(program == "0" || program.includes("c"))) {
        while (true) {
            control.timer1.reset()
            pauseUntil(() => valid_hold_time.indexOf(control.timer1.millis()) != -1)
            if (!(input.touchD0.isPressed())) {
                break;
            } else if (program == "1") {
                LEDfade = 0
                control.runInParallel(function () {
                    for (let index = 0; index < 32; index++) {
                        LEDfade += 32
                        pins.LED.analogWrite(LEDfade)
                        pause(17)
                    }
                })
                pauseUntil(() => !(input.touchD0.isPressed()))
                control.runInParallel(function () {
                    for (let index = 0; index < 32; index++) {
                        LEDfade += -32
                        pins.LED.analogWrite(LEDfade)
                        pause(17)
                    }
                })
                color_change(true, false)
                break;
            }
        }
    } else if (program == "0") {
        LEDfade = 0
        for (let index = 0; index < 32; index++) {
            LEDfade += 32
            pins.LED.analogWrite(LEDfade)
            pause(16)
        }
        pauseUntil(() => !(input.touchD2.isPressed()))
        for (let index = 0; index < 32; index++) {
            LEDfade += -32
            pins.LED.analogWrite(LEDfade)
            pause(17)
        }
        if (item == 0) {
            color_change(false, true)
        } else if (item == 1) {
            patternmode(true)
        } else {
        	
        }
    }
})
function color_change (exitsave: boolean, start: boolean) {
    if (exitsave) {
        program = "0"
        temp.push("colcng:restore=1;")
        pixel.setBrightness(0)
    } else {
        program = "1c"
        if (temp.indexOf("Stripcolor") != -1) {
            temp.removeAt(temp.indexOf("stripcolor"))
            temp.push("stripcolor")
            tempvalues.removeAt(temp.indexOf("stripcolor"))
            tempvalues.push(color2[selector])
        } else {
            temp.push("stripcolor")
            tempvalues.push(color2[selector])
        }
        if (selector == color2.length - 1) {
            selector = 0
        } else {
            if (!(start) || (temp.indexOf("colcng") == -1 || !(temp[temp.indexOf("colcng:")].includes("restore=1")))) {
                selector += 1
            } else {
                temp.removeAt(temp.indexOf("colcng"))
                temp.push("colcng:restore=0;")
            }
        }
        pixel.setBrightness(20)
        colorfade = pixel.hsv(color2[selector - 1], 255, 255)
        while (true) {
            if (input.touchD2.isPressed()) {
                break;
            } else if (input.touchD0.isPressed()) {
                LEDfade = 0
                control.runInParallel(function () {
                    for (let index = 0; index < 32; index++) {
                        LEDfade += 32
                        pins.LED.analogWrite(LEDfade)
                        pause(17)
                    }
                })
                pauseUntil(() => !(input.touchD0.isPressed()))
                control.runInParallel(function () {
                    for (let index = 0; index < 32; index++) {
                        LEDfade += -32
                        pins.LED.analogWrite(LEDfade)
                        pause(17)
                    }
                })
                strip.setAll(color2[selector])
                program = "1"
                break;
            }
        }
    }
}
function patternmode (exitsave: boolean) {
    if (exitsave) {
        program = "0"
        if (temp.indexOf("stripmode") != -1) {
            temp.removeAt(temp.indexOf("stripmode"))
            temp.push("stripmode")
            tempvalues.removeAt(temp.indexOf("stripmode"))
            tempvalues.push(0)
        } else {
            temp.push("stripmode")
            tempvalues.push(0)
        }
    } else {
        program = "2c"
    }
}
input.touchD2.onEvent(ButtonEvent.Down, function () {
    LEDfade = 0
    for (let index = 0; index < 32; index++) {
        LEDfade += 32
        pins.LED.analogWrite(LEDfade)
        pause(16)
    }
    pauseUntil(() => !(input.touchD2.isPressed()))
    for (let index = 0; index < 32; index++) {
    	
    }
    if (program == "0") {
        if (item == 2) {
            item = 0
        } else {
            item += 1
        }
    } else if (program.charAt(0) == "1") {
        color_change(false, false)
    }
})
let colorfade = 0
let LEDfade = 0
let color2: number[] = []
let strip: light.NeoPixelStrip = null
let valid_hold_time: number[] = []
let program = ""
let tempvalues: number[] = []
let temp: string[] = []
let item = 0
let selector = 0
selector = 0
item = 0
temp = []
tempvalues = []
program = "0"
valid_hold_time = [700]
strip = light.createStrip(pins.A0, 120)
color2 = [
pixel.rgb(255, 0, 0),
PixelColors.Orange,
PixelColors.Yellow,
PixelColors.Green,
PixelColors.Blue,
PixelColors.Indigo,
PixelColors.Violet,
PixelColors.Purple,
PixelColors.Pink,
PixelColors.White
]
while (valid_hold_time.length != 40) {
    valid_hold_time.push(valid_hold_time[valid_hold_time.length - 1] + 1)
}
pixel.setBrightness(20)
forever(function () {
    console.log(program.charAt(0))
    if (program == "0") {
        if (item == 0) {
            pixel.setColor(0x00ff00)
        } else if (item == 1) {
            pixel.setColor(0xffff00)
        } else {
            pixel.setColor(0xff0000)
        }
    }
})
