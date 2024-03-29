import React from 'react'
import { OrderProps, changeOrderStatus } from '../../utils/kitchenPageUtils'
import OrderItemRow from './OrderItemRow/OrderItemRow'
import { calculateCartSubtotal } from '../../utils/cartPageUtils';

function Order({ userData, order, tables, setOrders }: OrderProps) {

    return (
        <div className='order_item_wrapper'>
            <section className='table_number_and_time_wrapper'>
                <h4 className='p__playfair table_number'>TABLE NUMBER: {tables?.filter(table => table.id === order.table_id)[0]?.table_number}</h4>
                {(userData.role === "attendant" || userData.role === "chef") && <p className='p__inter order_time'>{order.created_at?.split("T")[1].slice(0, 5)}{(order?.created_at?.split("T")[1]?.slice(0, 5)?.split(":")[0] !== undefined) && order?.created_at?.split("T")[1]?.slice(0, 5)?.split(":")[0] > "11" ? "PM" : "AM"}</p>}
                {userData.role === "client" && <p className='p__inter order_time'>{order.created_at?.split("T")[0]}</p>}
            </section>
            <table className="order_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">QUANTITY</th>
                        <th className="p__inter table_header">PRICE</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {order.order_items?.map((orderItem) => (
                        <OrderItemRow
                            key={order.order_items?.indexOf(orderItem)}
                            orderItem={orderItem}
                        />
                    ))}
                </tbody>
            </table>


            <section className='order_subtotal_and_button_wrapper'>
                <div className='order_status_and_subtotal_wrapper'>
                    {userData.role === "client" && <h4 className='p__inter order_status'>STATUS: {order.status}</h4>}
                    {(userData.role === "attendant" || userData.role === "client") && <h4 className='p__inter order_subtotal'>SUBTOTAL: £{calculateCartSubtotal(order).toFixed(2)}</h4>}
                </div>

                {(userData.role === "attendant" || userData.role === "chef") && <button className="custom__button order_item_checkout_btn" onClick={() => {
                    changeOrderStatus(order, setOrders)
                }}>{order.status === "Processing" ? "READY" : order.status === "Ready" ? "SERVED" : order.status === "Served" && "COMPLETED"}</button>}
            </section>
        </div >
    )
}

export default Order
