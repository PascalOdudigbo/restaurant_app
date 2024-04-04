import axios from "axios";
import { API_BASE_URL, User } from "./appUtils"
import { MenuItemType } from "./menuManagementUtils";
import { toast } from "react-toastify";

// Defining the menu page props
export type MenuPageProps = {
    userData: User;
    activeOrder: OrderType;
    setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

// Defining the order type
export type OrderType = {
    id: number;
    user_id: number;
    table_id: number | null;
    status: string;
    order_items?: OrderItemType[]
    created_at?: string;
}

// Defining the order items type
export type OrderItemType = {
    id: number;
    order_id: number;
    menu_item_id: number;
    quantity: number;
    menu_item: MenuItemType
}



// Defining a function to get a user's actve order
export const getUsersActiveOrder = (userData: User, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    // Looping through the userData orders to get the active order
    const activeOrder = userData?.orders?.filter(order => order.status === "Active")[0]
    // Set the active order data
    activeOrder !== undefined && setActiveOrder(activeOrder);
}

// Defining a function to add an item to cart 
export const addToCart = (userData: User, activeOrder: OrderType, targetMenuItem: MenuItemType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    // Check if user has an active order
    if (activeOrder.id !== 0) {
        // Verify if the menu item already exists in the cart
        const existingOrderItem = activeOrder?.order_items?.filter(orderItem => orderItem.menu_item_id === targetMenuItem.id)[0];
        if (existingOrderItem !== undefined) {
            // If order item already exists increment it's quantity
            incrementOrderItemQuantity(existingOrderItem, activeOrder, setActiveOrder)

        } else {
            // If menu item doesn't exist add it to the cart
            addOrderItemToCart(activeOrder, targetMenuItem, setActiveOrder);
        }

    }else {
        // If there's no active order
        createAnOrder(userData, targetMenuItem, setActiveOrder)
    }

}

// A function to create an order
export const createAnOrder = (userData: User, targetMenuItem: MenuItemType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    // Creating the post data
    const postData = {
        user_id: userData.id,
        status: "Active"
    }
    // add the new order item to cart
    axios.post(API_BASE_URL + `/orders`, postData)
        .then(response => {
            // Get order by id the bookings data
            addOrderItemToCart(response.data.order, targetMenuItem, setActiveOrder)
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error.message);
            }
        })
}

// A function to increment item quantity
export const incrementOrderItemQuantity = (existingOrderItem: OrderItemType, activeOrder: OrderType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    axios.patch(API_BASE_URL + `/order-items/${existingOrderItem.id}`, { quantity: existingOrderItem.quantity + 1 })
        .then(response => {
            // Showing a success message
            toast.success("Item quantity increased!");
            // Get order by id the bookings data
            getOrderById(activeOrder, setActiveOrder);

        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error.message);
            }
        })
}

// A function to add an order item to cart
export const addOrderItemToCart = (activeOrder: OrderType, targetMenuItem: MenuItemType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    // Creating the post data
    const postData = {
        order_id: activeOrder.id,
        menu_item_id: targetMenuItem.id,
        quantity: 1
    }
    // add the new order item to cart
    axios.post(API_BASE_URL + `/order-items`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message);
            // Get order by id the bookings data
            getOrderById(activeOrder, setActiveOrder);
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error.message);
            }
        })
}

// A function to get order by ID
export const getOrderById = (activeOrder: OrderType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    axios.get(API_BASE_URL + `/orders/${activeOrder.id}`)
        .then(response => {
            // Setting the active order 
            setActiveOrder(response.data)
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error.message);
            }
        })

}