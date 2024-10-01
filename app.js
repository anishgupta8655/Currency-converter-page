let apikey = "988429c87a1fcccb7e6e748e";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const exchangeTxt = document.querySelector(".exchange-rate");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    
    
    const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    let updateExchangeRate = data.conversion_rates[toCurr.value];
    let totalExchangeRate = (amtVal * updateExchangeRate).toFixed(2);
    console.log(totalExchangeRate);
    exchangeTxt.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
  } catch (e) {
    console.log(e);
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
