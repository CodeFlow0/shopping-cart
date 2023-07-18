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

  // Allow user to add a new item
  $('.create').click(function () {
    const $row = $(this).closest('tr');
    const itemName = $row.find('input[type="text"]').val();
    const itemPrice = $row.find('input[type="number"]').val();
    const newRow = createRow(itemName, itemPrice);
    $row.before(newRow);

    // Attach the event handler for the new item's quantity
    newRow.find('.quantity input').on('change', updateSubtotal);

    $row.find('input[type="text"]').val('');
    $row.find('input[type="number"]').val('');
  });

  function createRow(itemName, itemPrice) {
    const $row = $('<tr></tr>');
    const $item = $('<td class="item"></td>').text(itemName);
    const $price = $('<td class="price"></td>').text('$' + itemPrice + '.00');
    const $quantity = $('<td class="quantity">QTY <input class="me-2" type="number" value="0"><button class="btn btn-danger cancel">Cancel</button></td>');
    const $itemTotal = $('<td class="item-total">$0.00</td>');
    $row.append($item, $price, $quantity, $itemTotal);
    return $row;
  }

  // Allow user to delete an item
  $(document).on('click', '.cancel', function () {
    $(this).closest('tr').remove();
    updateTotalPrice();
  });
});