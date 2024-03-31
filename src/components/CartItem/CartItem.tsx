import React from 'react'
import { CartItemProps, decreaseOrderItemQuantity, removeOrderItem } from '../../utils/cartPageUtils'
import { incrementOrderItemQuantity } from '../../utils/menuPageUtils'

function CartItem({ cartItem, activeOrder, setActiveOrder }: CartItemProps) {
    return (
        <div className='cart_item_wrapper'>
            <img className='productImage' src={cartItem.menu_item.image} alt={cartItem.menu_item.name} />
            <section className='name_and_price_wrapper'>
                <p className='p__playfair cart_item_name'>{cartItem.menu_item.name}</p>
                <p className='p__inter cart_item_price'>£{(parseFloat(cartItem?.menu_item?.price.toString()) * cartItem.quantity).toFixed(2)}</p>
            </section>


            <p className='p__inter cart_item_description'>{cartItem.menu_item.description}</p>
            <section className='cart_item_buttons_wrapper'>
                <section className='cart_item_quantity_buttons_wrapper'>
                    <button className='custom__button cart_item_decrement_btn' onClick={() => {
                        cartItem.quantity === 1 ? removeOrderItem(cartItem, activeOrder, setActiveOrder) : 
                        decreaseOrderItemQuantity(cartItem, activeOrder, setActiveOrder);
                    }}><b>-</b></button>

                    <p className='p__inter cart_item_quantity'>{cartItem.quantity}</p>

                    <button className="custom__button cart_item_increment_button" onClick={() => {
                        incrementOrderItemQuantity(cartItem, activeOrder, setActiveOrder);
                    }}><b>+</b></button>
                </section>

                <button className="custom__button cart_item_remove_btn" onClick={() => {
                    removeOrderItem(cartItem, activeOrder, setActiveOrder);
                }}>REMOVE</button>


            </section>

        </div>
    )
}

export default CartItem
