const dropdowns = document.querySelectorAll(".dropdown select");
const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// console.log(dropdowns)

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    // console.log(evt.target)
    flagexchange(evt.target);
  });
}

const flagexchange = (element)=>{
  // console.log("runing...")
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

const exchange = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let all = data[fromCurr.value.toLowerCase()];
  const inrr = toCurr.value.toLowerCase()
  for(one in all){
    if (one==fromCurr.value.toLowerCase()){
        let rate = all[toCurr.value.toLowerCase()]
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }
  }
//   console.log(rate);
//   console.log(amtVal);
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchange();
});
window.addEventListener("load", () => {
  exchange();
});
