
const fireworks = [];
let trxs = [];
let newTrx = 0;

let gravity;

function updateTrxs() {
  const myHeaders = new Headers();

  const myRequest = new Request("https://api.polygonscan.com/api?module=account&action=txlist&address=0x72a53cdbbcc1b9efa39c834a540550e23463aacb&startblock=1455210&page=1&offset=10&sort=desc&apikey=UCVPHN24FPM5AJ236VMMDZNBHCS3ME1VVZ", {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  });
  fetch(myRequest)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(myBlob => {
    const thenew = _.difference(myBlob.result.map(trx => trx.hash), trxs).length;
    console.log(newTrx, thenew);
    newTrx += _.difference(myBlob.result.map(trx => trx.hash), trxs).length;
    console.log(newTrx, thenew);
    trxs = _.uniq([...trxs, ...myBlob.result.map(trx => trx.hash)])
  })

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.1);
  stroke(255);
  strokeWeight(4);
  background(0);

}

let yyy = 2;
function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (frameCount % 30 === 0) {
    // console.log(frameCount);
    if (newTrx > 0) {
      console.log(newTrx);
      newTrx--;
      fireworks.push(new Firework());
    }
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  if (frameCount % 100 === 0 && yyy > 0) {
    yyy--;
    this.updateTrxs()
    console.log(trxs);
  }
}