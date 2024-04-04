import React from 'react'
import { KitchenPageProps } from '../../utils/kitchenPageUtils'
import { Order } from '../../components'

function OrdersPage({userData, tables, setTables, setOrders}: KitchenPageProps) {
    return (
        <div className='app__orders app__bg app__wrapper section_padding'>
            <section className='orders_heading_wrapper'>
                <h1 className='headtext__playfair orders_heading'>YOUR ORDERS</h1>
            </section>

            <section className='orders_body'>
                {
                    userData?.orders?.map(order => order?.status !== "Active" && <Order key={order.id} userData={userData} order={order} tables={tables} setOrders={setOrders}/>)
                }
            </section>

            
        </div>
    )
}

export default OrdersPage

