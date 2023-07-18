$(document).ready(function () {
  // Calculate and display the sub total of each item 
  $('.quantity input').on('change', updateSubtotal);

  function updateSubtotal() {
    const quantity = $(this).val();
    const $row = $(this).closest('tr');
    const price = getPrice($row);
    const subTotal = (parseFloat(price) * parseInt(quantity)).toFixed(2);
    $row.find('.item-total').text('$' + subTotal);

    updateTotalPrice();
  }

  function getPrice($row) {
    return $row.find('.price').text().replace('$', '');
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    $('.item-total').each(function () {
      const itemTotal = $(this).text().replace('$', '');
      totalPrice += parseFloat(itemTotal);
    });
    $('.total-price').text('$' + totalPrice.toFixed(2));
  }
});