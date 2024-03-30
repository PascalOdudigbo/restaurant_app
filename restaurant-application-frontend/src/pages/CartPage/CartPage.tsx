import React, { useEffect, useState } from 'react'
import { CartPageProps, calculateCartSubtotal, getTables, handleCheckout } from '../../utils/cartPageUtils'
import { CartItem, Dropdown } from '../../components'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Table } from '../../utils/restaurantManagementPortalUtils'

function CartPage({ userData, setUserData, activeOrder, setActiveOrder, tables, setTables }: CartPageProps) {
  const [targetTable, setTargetTable] = useState<Table>({
    id: 0,
    table_number: "Select table",
    is_occupied: false
  })

  // Declaring the navigation variable function
  const navigate = useNavigate()

  useEffect(() => {
    getTables(setTables)
  }, [])

  return (
    <div className='app__cart app__bg app__wrapper section_padding'>
      <section className='cart_heading_wrapper'>
        <h1 className='headtext__playfair menu_heading'>CART</h1>
      </section>

      <div className='cart_select_table_wrapper flex__center'>
        <Routes>
          <Route path="/checkout" element={
            <div className='checkout_wrapper flex__center'>
              <header className='checkout_header'>
                <h3 className='headtext__playfair checkout_header_title'>CHECKOUT</h3>
                <Link to="/cart" className='headtext__playfair checkout_header_close'>X</Link>
              </header>
              <form className='checkout_form' onSubmit={(e) => {
                handleCheckout(e, userData, setUserData, activeOrder, setActiveOrder, targetTable.id, navigate);
              }}>

                <Dropdown
                  label='Table  *'
                  items={tables.map(table => table.table_number)}
                  buttonText={targetTable.table_number}
                  clickFunction={(data) => { setTargetTable(tables.filter(table => table.table_number === data)[0]) }}
                />

                <button className='custom__button checkout_form_button' type='submit'>SUBMIT</button>
              </form>

            </div>
          } />
        </Routes>
      </div>

      <section className='cart_body_wapper'>
        {
          activeOrder.id !== 0 &&
          activeOrder?.order_items?.map(orderItem => <CartItem key={activeOrder.order_items?.indexOf(orderItem)} cartItem={orderItem} activeOrder={activeOrder} setActiveOrder={setActiveOrder} />)

        }
      </section>
      {
        activeOrder.order_items &&
        activeOrder?.order_items?.length < 1 && <h2 className='p__inter empty_cart_text'>Your Cart Is Empty</h2>
      }

      <section className='cart_subtotal_and_checkout_wrapper'>
        <h3 className='headtext__playfair cart_subtotal'>SUBTOTAL: £{calculateCartSubtotal(activeOrder).toFixed(2)}</h3>

        <button className="custom__button cart_item_checkout_btn" onClick={() => {
          navigate("/cart/checkout");
          window.scrollTo(0, 0);
        }}>CHECKOUT</button>
      </section>
    </div>
  )
}

export default CartPage
