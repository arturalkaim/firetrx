
const fireworks = [];
let trxs = [];
let newTrx = 0;

let gravity;

function updateTrxs() {
  const myHeaders = new Headers();
  const account = '0x9F705Ff1dA72eD334f0E80f90aAe5644f5CD7784'; // 0x72a53cdbbcc1b9efa39c834a540550e23463aacb
  // const account = '0xE1777f260fcfd84ea47cc1e0665263FD00f05a34'; // 0x72a53cdbbcc1b9efa39c834a540550e23463aacb
  const myRequest = new Request(`https://api.polygonscan.com/api?module=account&action=txlist&address=${account}&startblock=1455210&page=1&offset=10&sort=desc&apikey=UCVPHN24FPM5AJ236VMMDZNBHCS3ME1VVZ`, {
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
  gravity = createVector(0, 0.06);
  stroke(255);
  strokeWeight(4);
  background(0);

}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (frameCount % 30 === 0) {
    // console.log(frameCount);
    // if (newTrx > 0) {
      console.log(newTrx);
      // newTrx--;
      fireworks.push(new Firework());
    // }
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  if (frameCount % 100 === 0) {
    this.updateTrxs()
    console.log(trxs);
  }
}