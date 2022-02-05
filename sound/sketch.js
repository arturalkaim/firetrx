let osc1, osc2, osc3, envelope, envelope2, fft;
// const _ = require('lodash');

let scaleArray = [45, 60, 62, 64, 65, 67, 69, 71, 72];
let scaleArray2 = [22, 44, 55, 33, 45];
let note1 = 0;
let note2 = 1;
let note3 = 1;

function setup() {
  createCanvas(710, 400);
  osc1 = new p5.SinOsc();
  osc2 = new p5.SinOsc();
  osc3 = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();
  envelope2 = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.01, 0.1, 0.1, 0.4);
  // envelope2.setADSR(0.01, 0.01, 0.1, 0.4);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  // osc1.start();
  osc2.start();
  // osc3.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);

  if (frameCount % 60 === 0 || frameCount === 1) {
    let midiValue = scaleArray[note1];
    let freqValue = midiToFreq(midiValue);
    let pan = Math.random() * 2 - 1
    osc1.freq(freqValue);

    envelope.play(osc1, 0, 0.1);
    note1 = (note1 + 1) % scaleArray.length;

    midiValue = _.sample(scaleArray);
    freqValue = midiToFreq(midiValue);
    osc2.freq(freqValue);

    envelope.play(osc2, 0, 0.1);

    // note2 = (note2 + 3) % scaleArray.length;

    // midiValue = _.sample(scaleArray2);
    // freqValue = midiToFreq(midiValue);
    // osc3.freq(freqValue);
    // osc3.pan(Math.random() * 2 - 1);

    // envelope.play(osc3, 0, 0.1);
    // // note3 = (note3 + 2) % scaleArray.length;
  }

  if (frameCount % 30 === 0 || frameCount === 1) {

    // envelope.play(osc1, 0, 0.1);
    // note1 = (note1 + 1) % scaleArray.length;

    // midiValue = _.sample(scaleArray);
    // freqValue = midiToFreq(midiValue);
    // osc2.freq(freqValue);
    // osc2.pan(Math.random() * 2 - 1);

    // envelope.play(osc2, 0, 0.1);

    let midiValue = _.sample(scaleArray2) + 30;
    let freqValue = midiToFreq(midiValue);
    osc3.freq(freqValue);

    // envelope2.play(osc1, 0, 0.1);
    // note3 = (note3 + 2) % scaleArray.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i] / 20, spectrum[i] / 1, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);
  }
}
