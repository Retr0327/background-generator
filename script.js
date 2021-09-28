const linearGradient = document.querySelector("#linear-gradient");
const hexText = document.querySelector("#hex");
const rgbText = document.querySelector("#rgb");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");
const linearBtn = document.querySelector("#linear-gradient-btn");
const RGBCopyBtn = document.querySelector("#rgb-btn");
const hexCopyBtn = document.querySelector("#hex-btn");
const switchBtn = document.querySelector("#switch-btn"); 

function getRgb(hex) {
  let hexValue = hex.replace("#", "");
  let r = parseInt(hexValue.slice(0, 2), 16);
  let g = parseInt(hexValue.slice(2, 4), 16);
  let b = parseInt(hexValue.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function setGradient(color1, color2) {
  let bgColor = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  body.style.background = bgColor;
  linearGradient.textContent = `${body.style.background};`;
  rgbText.textContent = `${getRgb(color1.value)}, ${getRgb(color2.value)}`;
  hexText.textContent = `${color1.value}, ${color2.value};`;
};

function copy(textNode, btn) {
  let range = document.createRange();
  range.selectNode(textNode);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  let copyAction = document.execCommand("copy");
  window.getSelection().removeAllRanges();
  if (copyAction) {
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 800);
  }
}

function switchColor() {
  let originalColor1 = color1.value;
  let originalColor2 = color2.value;
  color1.value = originalColor2;
  color2.value = originalColor1;
  setGradient(color1, color2);
}


color1.addEventListener("input", () => setGradient(color1, color2));
color2.addEventListener("input",  () => setGradient(color1, color2));
linearBtn.addEventListener("click", () => copy(linearGradient, linearBtn));
RGBCopyBtn.addEventListener("click", () => copy(rgbText, RGBCopyBtn));
hexCopyBtn.addEventListener("click", () => copy(hexText, hexCopyBtn));
switchBtn.addEventListener('click', switchColor);
