import React from 'react'
import { OrderItemRowProps } from '../../../utils/kitchenPageUtils'

function OrderItemRow({ orderItem }: OrderItemRowProps) {
  return (
    <tr className="row_wrapper_order">
      <td className="row_cell_order">{orderItem.menu_item.name}</td>
      <td className="row_cell_order">{orderItem.quantity}</td>
      <td className="row_cell_order">£{parseFloat((parseFloat(orderItem.menu_item.price.toString()) * orderItem.quantity).toString()).toFixed(2)}</td>
    </tr>
  )
}

export default OrderItemRow
