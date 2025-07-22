
const 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
const 종성 = ["", "ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ",
               "ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ",
               "ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function hangulToNumbers(char) {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11172) return [];
  const 초 = Math.floor(code / 588);
  const 중 = Math.floor((code % 588) / 28);
  const 종 = code % 28;
  return [초, 중, 종];
}

function encryptCustom() {
  const seqType = document.querySelector('input[name="seqType"]:checked').value;
  const input = document.getElementById("customInputText").value;
  let result = "";
  let prev = parseInt(document.getElementById("startValue").value);
  let common = parseFloat(document.getElementById("commonValue").value);
  let formula = document.getElementById("customFormula").value;
  let count = 0;
  for (let char of input) {
    let nums = hangulToNumbers(char);
    if (nums.length === 0) continue;
    for (let num of nums) {
      let seq;
      if (seqType === "arithmetic") {
        seq = prev + (common * count);
      } else if (seqType === "geometric") {
        seq = prev * Math.pow(common, count);
      } else if (seqType === "custom") {
        try {
          seq = eval(formula.replace(/prev/g, prev));
        } catch (e) {
          alert("점화식 오류: " + e.message);
          return;
        }
        prev = seq; // update prev for next round
      }
      let encrypted = (num + Math.floor(seq)) % 26;
      result += String.fromCharCode(65 + encrypted);
      count++;
    }
  }
  document.getElementById("customResult").innerText = `📄 암호문: ${result}`;
}

document.querySelectorAll('input[name="seqType"]').forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.value === "custom") {
      document.getElementById("arithmeticGeometricInputs").style.display = "none";
      document.getElementById("customFormulaInput").style.display = "block";
    } else {
      document.getElementById("arithmeticGeometricInputs").style.display = "block";
      document.getElementById("customFormulaInput").style.display = "none";
    }
  });
});

function getFibonacci(n) {
  if (n <= 2) return 1;
  let a = 1, b = 1, temp;
  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function encryptFibonacci() {
  const input = document.getElementById("fibInputText").value;
  let result = "";
  let count = 1;
  for (let char of input) {
    let nums = hangulToNumbers(char);
    if (nums.length === 0) continue;
    for (let num of nums) {
      let fib = getFibonacci(count);
      let encrypted = (num + fib) % 26;
      result += String.fromCharCode(65 + encrypted);
      count++;
    }
  }
  document.getElementById("fibResult").innerText = `📄 암호문: ${result}`;
}
