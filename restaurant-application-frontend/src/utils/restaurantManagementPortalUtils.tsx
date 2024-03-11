import { User } from "./appUtils"

export type ManagerDashboardProps = {
    userData: User;
    totalBookings: number;
    totalClients: number;
    totalMenuCategories: number;
    totalPendingBookings: number;
    totalMenuItems: number;
    totalOrders: number;
}