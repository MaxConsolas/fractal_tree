var canv = document.getElementById("canvas");
canv.width  = document.documentElement.clientWidth;
canv.height = document.documentElement.clientHeight;
ctx = canv.getContext('2d');


function randBetween(min, max) {
  calc = (Math.random() * (max - min)) + min;
  return calc;
}

function render(startX, startY, len, angle, width) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();

  if(len < 5) {
    ctx.restore();
    return;
  }

  render(0, -len, len * (branchScaleRatio + (Math.random() / 5 - 0.10)), this.randBetween(minAngle, maxAngle), width * 0.8);
  render(0, -len, len * (branchScaleRatio + (Math.random() / 5 - 0.10)), -this.randBetween(minAngle, maxAngle), width * 0.8);
  ctx.restore();
  }

function renderNew(startX, startY, len, angle, width) {
  ctx.clearRect(0, 0, canv.width, canv.height);
  render(startX, startY, len, angle, width);
}

function callRender() {
  treeSize = Number(document.getElementById("treeSize").value);
  minAngle = Number(document.getElementById("minAngle").value);
  maxAngle = Number(document.getElementById("maxAngle").value);
  branchScaleRatio = Number(document.getElementById("branchScaleRatio").value);

  document.getElementById("labelMin").innerText = minAngle+" Minimum angle";
  document.getElementById("labelMax").innerText = maxAngle+" Maximum angle";
  document.getElementById("treeSizeLabel").innerText = treeSize+" Tree size";
  document.getElementById("branchScaleRatioLabel").innerText = branchScaleRatio+"±0.1 Branch scale ratio[>0.8 !!!]";
  
  renderNew(canv.width/2, canv.height-50, treeSize, 0, 15);
}
