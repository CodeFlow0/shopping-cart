const updateMarketValue = function (ele) {
  const sharesOwned = parseFloat($(ele).find('.shares input').val());
  const marketPrice = parseFloat($(ele).find('.marketPrice input').val());
  const marketValue = sharesOwned * marketPrice;
  $(ele).children('.marketValue').text(marketValue);
  return marketValue;
}

const updateUnrealizedProfit = function (ele, marketValue) {
  const sharesOwned = parseFloat($(ele).find('.shares input').val());
  const costPerShare = parseFloat($(ele).find('.cost input').val());
  const costOfPurchase = sharesOwned * costPerShare;

  const unrealizedProfit = marketValue - costOfPurchase;
  $(ele).children('.profit').text(unrealizedProfit);
  return unrealizedProfit;
}

const sum = function (acc, x) { return acc + x };

const updatePortfolioValueAndProfit = function () {
  let stocksMarketValues = [];
  let stocksUnrealizedProfits = [];

  $('tbody tr').each(function (i, ele) {
    const marketValue = updateMarketValue(ele);
    stocksMarketValues.push(marketValue);
    const unrealizedProfit = updateUnrealizedProfit(ele, marketValue);
    stocksUnrealizedProfits.push(unrealizedProfit);

    const portfolioMarketValue = stocksMarketValues.reduce(sum);
    const portfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);
    $('#portfolioValue').text(portfolioMarketValue);
    $('#portfolioProfit').text(portfolioUnrealizedProfit);
  });
}

$(document).ready(function () {
  updatePortfolioValueAndProfit();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updatePortfolioValueAndProfit();
  });

  $(document).on('input', 'tr input', function () {
    updatePortfolioValueAndProfit();
  });

  let timeout;
  $('tr input').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePortfolioValueAndProfit();
    }, 1000);
  });

  $('#addStock').on('submit', function (event) {
    event.preventDefault();
    const name = $(this).children('[name=name]').val();
    const shares = $(this).children('[name=shares]').val();
    const cost = $(this).children('[name=cost]').val();
    const marketPrice = $(this).children('[name=marketPrice]').val();

    $('tbody').append('<tr>' +
      '<td class="name">' + name + '</td>' +
      '<td class="shares"><input type="number" value="' + shares + '" /></td>' +
      '<td class="cost"><input type="number" value="' + cost + '" /></td>' +
      '<td class="marketPrice"><input type="number" value="' + marketPrice + '" /></td>' +
      '<td class="marketValue"></td>' +
      '<td class="profit"></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '</tr>');

    updatePortfolioValueAndProfit();
    $(this).children('[name=name]').val('');
    $(this).children('[name=shares]').val('');
    $(this).children('[name=cost]').val('');
    $(this).children('[name=marketPrice]').val('');
  });
});