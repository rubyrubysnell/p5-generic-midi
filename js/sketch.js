//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 0;
const CCSLIDER2 = 0;
const CCSLIDER3 = 0;
const CCSLIDER4 = 0;
const CCSLIDER5 = 0;
const CCSLIDER6 = 0;
const CCSLIDER7 = 0;
const CCSLIDER8 = 0;
const CCSLIDER9 = 0;
let myController;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
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
    console.log(e.controller.number, e.data);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
            break;
        case CCSLIDER2: 
            break;
        case CCSLIDER3: 
            break;
        case CCSLIDER4: 
            break;
        case CCSLIDER5: 
            break;
        case CCSLIDER6: 
            break;
        case CCSLIDER7: 
            break;
        case CCSLIDER8: 
            break;
        case CCSLIDER9:
            break;
    }
}
function draw() {

}
