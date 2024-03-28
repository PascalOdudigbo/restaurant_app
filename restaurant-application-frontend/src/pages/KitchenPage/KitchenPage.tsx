import React, { useEffect, useState } from 'react'
import { Table } from '../../utils/restaurantManagementPortalUtils'
import { getTables } from '../../utils/cartPageUtils'
import { KitchenPageProps, handleFilterOrders } from '../../utils/kitchenPageUtils'
import { Order } from '../../components'
import { OrderType } from '../../utils/menuPageUtils'

function KitchenPage({userData, orders, setOrders}: KitchenPageProps) {
    // Defining state variables to hold tables data
    const [tables, setTables] = useState<Table[]>([])
    const [kitchenOrders, setKitchenOrders] = useState<OrderType[]>([]);
    
    useEffect(() => {
        getTables(setTables)
        handleFilterOrders(userData, orders, setKitchenOrders)
    }, [orders])
    
    return (
        <div className='app__kitchen app__bg app__wrapper section_padding'>
            <section className='kitchen_heading_wrapper'>
                <h1 className='headtext__playfair kitchen_heading'>{userData.role === "chef" ? "KITCHEN": "SERVICE STATION"}</h1>
            </section>

            <section className='kichen_body'>
                {
                    kitchenOrders.map(kitchenOrder => <Order userData={userData} order={kitchenOrder} tables={tables} setOrders={setOrders}/>)
                }
            </section>

            
        </div>
    )
}

export default KitchenPage
