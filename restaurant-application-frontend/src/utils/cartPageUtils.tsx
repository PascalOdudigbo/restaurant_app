import axios from "axios";
import { User, getUserData } from "./appUtils";
import { OrderItemType, OrderType, getOrderById } from "./menuPageUtils";
import { toast } from "react-toastify";
import { Table } from "./restaurantManagementPortalUtils";
import { NavigateFunction } from "react-router-dom";

// Defining the cart page props
export type CartPageProps = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>
    activeOrder: OrderType;
    setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

// Defining the cart item props
export type CartItemProps = {
    cartItem: OrderItemType;
    activeOrder: OrderType;
    setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;

// A function to decrease item quantity
export const decreaseOrderItemQuantity = (existingOrderItem: OrderItemType, activeOrder: OrderType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    axios.patch(`/order-items/${existingOrderItem.id}`, { quantity: existingOrderItem.quantity - 1 })
        .then(() => {
            // Showing a success message
            toast.success("Item quantity decreased!");
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

// A function to remove an order item
export const removeOrderItem = (existingOrderItem: OrderItemType, activeOrder: OrderType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    axios.delete(`/order-items/${existingOrderItem.id}`)
        .then(() => {
            // Showing a success message
            toast.success("Item removed successfully!");
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

// A function to calculate cart subtotal
export const calculateCartSubtotal = (activeOrder: OrderType) => {
    let subtotal = 0.00;
    // Looping through the order items
    activeOrder.order_items?.forEach(orderItem => {
        subtotal += (orderItem.quantity * parseFloat(orderItem.menu_item.price.toString()))
    })
    return subtotal;
}

// A function to get tables
export const getTables = (setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    axios.get("/tables")
        .then((response) => {
            setTables(response.data);
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

// A function to make a table occupied
export const makeTableOccupied = (targetTable: Table, userData: User, setUserData: React.Dispatch<React.SetStateAction<User>>, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>, navigate: NavigateFunctionType) => {
    axios.patch(`/tables/${targetTable.id}`, {is_occupied: true})
    .then(() => {
       toast.success("Checkout successful, order sent to kitchen!");
       getUserData(`/users/${userData.id}`, setUserData, setActiveOrder);
       navigate("/");
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

// A function to handle checkout
export const handleCheckout = (userData: User, setUserData: React.Dispatch<React.SetStateAction<User>>, activeOrder: OrderType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>, targetTable: Table, navigate: NavigateFunctionType) => {
    axios.patch(`/orders/${activeOrder.id}`, {table_id: targetTable.id, status: "Processing"})
    .then(() => {
        makeTableOccupied(targetTable, userData, setUserData, setActiveOrder, navigate);
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

