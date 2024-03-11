import React from 'react'
import { IconContext } from 'react-icons';
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { ManagerDashboardProps } from '../../utils/restaurantManagementPortalUtils'
import { PieChart } from '@mui/x-charts';

function ManagerDashboard({ userData, totalBookings, totalClients, totalMenuCategories, totalPendingBookings, totalMenuItems, totalOrders }: ManagerDashboardProps) {
    return (
        <div className='managerDashboard_wrapper app__bg app__wrapper section_padding'>
            <section className='heading_wrapper'>
                <h1 className='headtext__playfair dashboard_heading'>DASHBOARD</h1>
            </section>
            <section className='welcome_and_stats_wrapper'>
                <section className='welcome_wrapper'>
                    <p className='p__inter welcome_texts_name'>Hello <b>{userData?.name}</b>.</p>
                    <p className='p__inter welcome_texts'>Welcome to your dashboard</p>
                </section>

                <section className='stats_layout_wrapper'>
                    <section className='stats_wrapper'>
                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                < FaUser />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Total Clients</p>
                            <p className='p__inter stat_count'>{totalClients}</p>
                        </div>
                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                <FaCalendarAlt />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Total Bookings</p>
                            <p className='p__inter stat_count'>{totalBookings}</p>
                        </div>

                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                <MdMenuBook />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Menu Categories</p>
                            <p className='p__inter stat_count'>{totalMenuCategories}</p>
                        </div>

                    </section>

                    <section className='stats_wrapper'>
                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                <MdOutlinePendingActions />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Pending Bookings</p>
                            <p className='p__inter stat_count'>{totalPendingBookings}</p>
                        </div>

                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                <BiSolidDish />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Menu Items</p>
                            <p className='p__inter stat_count'>{totalMenuItems}</p>
                        </div>

                        <div className='stat_wrapper'>
                            <IconContext.Provider value={{ className: "dashboard_icon" }}>
                                <GiShoppingBag />
                            </IconContext.Provider>
                            <p className='p__inter stat_text'>Total Orders</p>
                            <p className='p__inter stat_count'>{totalOrders}</p>
                        </div>

                    </section>

                </section>

            </section>

            <section className='piechart_wrapper'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'Pending', color: 'gold' },
                                { id: 1, value: 15, label: 'Approved', color: 'white' },
                                { id: 2, value: 20, label: 'Denied', color: 'purple' },
                            ],
                        },
                    ]}
                />

                <p className='p__inter chart_title'>Bookings Chart</p>
            </section>


        </div>
    )
}

export default ManagerDashboard
