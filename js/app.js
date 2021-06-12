const selectors = {
  pageviewCountText: document.querySelector('.pageview-count-text'),
  priceText: document.querySelector('.price-text'),
  rangeSlider: document.querySelector('input[type="range"]'),
  billingToggle: document.getElementById('billing-toggle'),
};

const data = {
  pageviewOptions: [
    { pageviews: '10K', price: 8 },
    { pageviews: '50K', price: 12 },
    { pageviews: '100K', price: 16 },
    { pageviews: '500K', price: 24 },
    { pageviews: '1M', price: 36 },
  ],
  // default slider position
  currentSliderPosition: Number(selectors.rangeSlider.value),
  isAnnualBilling: false,
  pageviewText: '100K',
  price: 16.0,
};

selectors.rangeSlider.addEventListener('input', (e) => {
  const rangeValue = Number(e.target.value);

  // change current slider position
  data.currentSliderPosition = rangeValue;

  const selectedPageViews = data.pageviewOptions[rangeValue].pageviews;
  // const selectedPrice = data.pageviewOptions[rangeValue].price;

  // update the data object with currently selected pageviews
  data.pageviewText = selectedPageViews;

  // calculate the price
  calculatePrice();

  // update the UI
  updateUI();
});

selectors.billingToggle.addEventListener('change', (e) => {
  // toggle if billing is annual and update state
  data.isAnnualBilling = !data.isAnnualBilling;

  // calculate the price
  calculatePrice();

  // update UI
  updateUI();
});

// initial UI render
updateUI();

/*********** FUNCTIONS ************/

function calculatePrice() {
  //set price to base price of the current plan
  let planPrice = data.pageviewOptions[data.currentSliderPosition].price;

  if (data.isAnnualBilling) {
    // calculate discount and change plan price if billing is toggled to annual
    planPrice = planPrice - planPrice * 0.25;
  }

  // update the state
  data.price = planPrice;
}

// update UI with current values
function updateUI() {
  selectors.pageviewCountText.textContent = data.pageviewText;
  selectors.priceText.textContent = `$${data.price.toFixed(2)}`;
}
