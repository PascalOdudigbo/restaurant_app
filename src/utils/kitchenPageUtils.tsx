import axios from "axios";
import { API_BASE_URL, User } from "./appUtils";
import { OrderItemType, OrderType } from "./menuPageUtils"
import { toast } from "react-toastify";
import { Table } from "./restaurantManagementPortalUtils";
import { makeTableUnoccupied } from "./cartPageUtils";

// Defining the kitchen page props
export type KitchenPageProps = {
    userData: User;
    orders: OrderType[];
    tables: Table[]
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

// Defining the order props
export type OrderProps = {
    userData: User;
    order: OrderType;
    tables: Table[]
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

// Defining the order item row props
export type OrderItemRowProps = {
    orderItem: OrderItemType;
}

// Defining a function to get all orders
export const getAllOrders = (setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>) => {
    axios.get(API_BASE_URL + "/orders")
        .then((response) => {
            setOrders(response.data);
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

export const handleFilterOrders = (userData: User, orders: OrderType[], setFilteredOrders: React.Dispatch<React.SetStateAction<OrderType[]>>) => {
    switch (userData.role) {
        case "attendant":
            setFilteredOrders(orders.filter(order => order.status !== "Active" && order.status !== "Completed" && order.status !== "Processing"));
            break;
        case "chef":
            setFilteredOrders(orders.filter(order => order.status === "Processing"));
            break;
        default:
            setFilteredOrders([]);
            break
    }
}

// A function to handle change order status 
export const changeOrderStatus = (order: OrderType, setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>) => {
    // Creating a variable to hold the new order status
    let newStatus = ""

    switch (order.status) {
        case "Processing":
            newStatus = "Ready";
            break;
        case "Ready":
            newStatus = "Served";
            break;
        case "Served":
            newStatus = "Completed"
            break;
    }

    axios.patch(API_BASE_URL + `/orders/${order.id}`, { status: newStatus })
        .then(() => {
            toast.success("Order status updated successfully!");
            // If the order is completed make the table unoccupied
            (newStatus === "Completed" && order.table_id) && makeTableUnoccupied(order.table_id)
            getAllOrders(setOrders)
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