//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 48;
const CCSLIDER2 = 49;
const CCSLIDER3 = 50;
const CCSLIDER4 = 51;
const CCSLIDER5 = 52;
const CCSLIDER6 = 53;
const CCSLIDER7 = 54;
const CCSLIDER8 = 55;
const CCSLIDER9 = 56;

// array to store slider data
const SLIDERDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// const colours = ["#E6E6FA", "#FFF0F5", "#808000", "#778899", "#F08080", "#E6E6FA", "#FA8072", "#6B8E23", "#FFE4E1"]
let myController;
let colours;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
    colours = ["rgba(255, 0, 0, 0.2)", "rgba(0, 255, 0, 0.2)", "rgba(0, 0, 255, 0.2)"]
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}
// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        console.log("No device detected.");
    } else {
        WebMidi.inputs.forEach((device, index) => {
            console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("noteon", noteOn);
    myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
    // for APC Mini
    // console.log(e.note.name, e.note.accidental || null, e.note.octave);
    // calculate the postion of the note in the grid of notes
    let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
    // calculate the x y pixel equivalent 
    // add offset values to position in the middle of an notional 8 x8 grid cell
    // width / 16 = half of cell size
    let hSpace = width / 16;
    let vSpace = height / 16;
    let x = pos.x * width + hSpace;
    let y = pos.y * height + vSpace
    // TODO - use these values to draw something at the note position?
    // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
    // console.log(e.controller.number);
    // calculate slider data as a value from 0 to 1
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
        SLIDERDATA[0] = ratio;
            break;
        case CCSLIDER2: 
        SLIDERDATA[1] = ratio;
            break;
        case CCSLIDER3: 
        SLIDERDATA[2] = ratio;
            break;
        case CCSLIDER4: 
        SLIDERDATA[3] = ratio;
            break;
        case CCSLIDER5: 
        SLIDERDATA[4] = ratio;
            break;
        case CCSLIDER6: 
        SLIDERDATA[5] = ratio;
            break;
        case CCSLIDER7:
        SLIDERDATA[6] = ratio; 
            break;
        case CCSLIDER8: 
        SLIDERDATA[7] = ratio;
            break;
        case CCSLIDER9:
        SLIDERDATA[8] = ratio;
            break;
    }
}

function draw() {
    background(0, 10);

    // let rectHeight = height/SLIDERDATA.length
    // for(let i = 0; i < SLIDERDATA.length; i++){
    //     for(let j = 0; j < SLIDERDATA.length; j++){
    //         stroke(colours[i])
    //         noFill()
    //         // (x, y, width, height)
    //         xPosition = SLIDERDATA.length * i
    //         yPosition = SLIDERDATA.length * i
    //         rect(xPosition, yPosition, i * rectHeight, width/2 * SLIDERDATA[i], rectHeight)
    //     }
    // }

    let rectHeight = height / SLIDERDATA.length
    for(let i = 0; i < SLIDERDATA.length; i++){
        let baseNoise = 250
        let noiseShift = random(-baseNoise * SLIDERDATA[i], baseNoise * SLIDERDATA[i])
        // noStroke()
        fill(random(colours))
        beginShape();
        // top left vertex
        vertex(width / 4 + noiseShift, i * rectHeight + noiseShift);
        // top right vertex
        noiseShift = random(-baseNoise * SLIDERDATA[i], baseNoise * SLIDERDATA[i])
        vertex(width * 0.75 + noiseShift, i * rectHeight + noiseShift)
        // bottom right vertex
        noiseShift = random(-baseNoise * SLIDERDATA[i], baseNoise * SLIDERDATA[i])
        vertex(width * 0.75 + noiseShift, i * rectHeight + rectHeight + noiseShift)
        // bottom left vertex
        noiseShift = random(-baseNoise * SLIDERDATA[i], baseNoise * SLIDERDATA[i])
        vertex(width / 4 + noiseShift, i * rectHeight + rectHeight + noiseShift)
        // join last vertex to first vertex
        endShape(CLOSE)
    }

}
