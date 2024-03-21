import axios from "axios";
import { User, sendEmailNoNavigate } from "./appUtils"
import { toast } from "react-toastify";
import { BookingsType } from "./bookingsManagementUtils";
// import { NavigateFunction } from "react-router-dom";

export type ManagerDashboardProps = {
    userData: User;
    totalBookings: number;
    totalClients: number;
    totalMenuCategories: number;
    totalPendingBookings: number;
    totalMenuItems: number;
    totalOrders: number;
    bookings: BookingsType;
}

export type RestaurantManagementProps = {
    userData: User
}

// A function to get the total clients count
export const totalClients = (users: User[]) => {
    let totalClients = 0;
    users.forEach(user => {
        user.role === 'client' && (totalClients += 1);
    })
    return totalClients;
}

// A function to get the total pending bookings count
export const totalBookingsStatus = (bookings: BookingsType, status: String) => {
    let totalBookings = 0;
    bookings.forEach(booking => {
        booking.status === status && (totalBookings += 1);
    })
    return totalBookings;
}

/********************************************USERS MANAGEMENT CODE START ************************************************************/

export type UsersTableProps = {
    userData: User;
    users: User[];
    setTargetUser: React.Dispatch<React.SetStateAction<User>>;
    targetUser: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
}

export type UserRowProps = {
    userData: User;
    user: User;
    setTargetUser: React.Dispatch<React.SetStateAction<User>>;
    targetUser: User;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type UsersManagementProps = {
    userData: User;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type AddUserFormType = {
    name: string;
    mobileNumber: string;
    email: string;
    postcode: string;
    role: string;
    password: string;
    confirmPassword: string;
}

export type AddUserProps = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type EditUserProps = {
    targetUser: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type EditUserFormType = {
    name: string;
    mobileNumber: string;
    email: string;
    postcode: string;
    role: string;

}

// Creating the navigation function type
// type NavigateFunctionType = NavigateFunction;

// Defining a function to get all users 
export const getAllUsers = (setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    axios.get("/users")
        .then(response => {
            // Setting users data to the state variable
            setUsers(response.data)
            localStorage.setItem("usersCount", response.data.length)
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

// Defining a function to edit a user
export const editUser = (e: React.FormEvent<HTMLFormElement>, targetUser: User, userData: EditUserFormType, setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    // Preventing form auto-refresh
    e.preventDefault();

    // Defining the postData
    let postData = {
        name: userData.name,
        mobile_number: userData.mobileNumber,
        email: userData.email,
        postcode: userData.postcode,
        role: userData.role
    }


    axios.put(`/users/${targetUser.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Getting all the users data
            getAllUsers(setUsers)

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

// Defining a function to handle deleting user
export const deleteUser = (targetUser: User, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {

    axios.delete(`/users/${targetUser.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Removing the deleted user from the users state 
            const filteredUsers = users.filter(user => user.id !== targetUser.id)
            // Setting the filtered users
            setUsers(filteredUsers)

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


// Defining a function to search users
export const searchUsers = (searchData: string, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    if (searchData === "") {
        getAllUsers(setUsers)
    }
    else {
        // Filtering the users to get users where the client name is similar to search input
        let filteredData = users.filter(user => user.name.toLowerCase().includes(searchData.toLowerCase()));
        setUsers(filteredData);
    }
}

// Defining a function to handle filter users
export const filterUsers = (filterData: string, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    const usersCountStr = localStorage.getItem("usersCount");
    const usersCount = usersCountStr ? parseInt(usersCountStr) : 0;

    if (filterData === "All") {
        getAllUsers(setUsers);
    } else {
        let filteredUsers: User[];
        if (users.length < usersCount) {
            getAllUsers(setUsers);
            filteredUsers = users.filter(user => user.role.toLowerCase() === filterData.toLowerCase());
        } else {
            filteredUsers = users.filter(user => user.role.toLowerCase() === filterData.toLowerCase());
        }
        setUsers(filteredUsers);
    }
}

// Defining a function to create a user
export const createUser = (e: React.FormEvent<HTMLFormElement>, userData: AddUserFormType, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        name: userData.name,
        mobile_number: userData.mobileNumber,
        email: userData.email,
        postcode: userData.postcode,
        password: userData.password,
        role: userData.role.toLowerCase()
    }
    // Sending user data to the backend
    axios.post("/users", postData)
        .then(response => {
            // Showing a success message
            toast.success("User saved successfully")
            // Adding the new user data to the users state
            setUsers([...users, response.data])
            // Creating the email values object
            const emailValues = {
                logo_text: "LILA BROWN",
                logo_font: "'Playfair Display', serif",
                logo_color: "#FFD700",
                email_title: "Welcome to Lila Brown",
                user_name: userData.name,
                email_to: userData.email,
                notice: `This email was intended for ${userData.name}'s account creation, if you're not the intended recipient of this email please delete this email.`,
                email_body: `We're pleased to work with you, welcome to Lila Brown as a dear ${userData.role.toLowerCase()} please sign in using this email address. Your password is ${userData.password} please change it in the profile section after logging in.`,
            }

            // Send an email to the new user
            sendEmailNoNavigate(emailValues, "Welcome Email Sent!", "Something went wrong, welcome email not sent!")
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                toast.error("Something went wrong please try again!");
            }
        })
}


/********************************************TABLES MANAGEMENT CODE START************************************************************/
export type Table = {
    id: number;
    table_number: string;
    is_occupied: boolean;
}

export type TablesTableProps = {
    userData: User;
    tables: Table[];
    setTargetTable: React.Dispatch<React.SetStateAction<Table>>;
    targetTable: Table;
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
}

export type TableRowProps = {
    userData: User;
    table: Table;
    setTargetTable: React.Dispatch<React.SetStateAction<Table>>;
    targetTable: Table;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export type TablesManagementProps = {
    userData: User;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export type AddTableFormType = {
    table_number: string;
    is_occupied: boolean;
}

export type AddTableProps = {
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export type EditTableProps = {
    targetTable: Table;
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export type EditTableFormType = {
    table_number: string;
    is_occupied: boolean;
}

// Defining a function to get all tables 
export const getAllTables = (setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    axios.get("/tables")
        .then(response => {
            // Setting tables data to the state variable
            setTables(response.data)
            localStorage.setItem("tablesCount", response.data.length)
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

// Defining a function to edit a table
export const editTable = (e: React.FormEvent<HTMLFormElement>, targetTable: Table, tableData: EditTableFormType, setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    // Preventing form auto-refresh
    e.preventDefault();

    // Defining the postData
    let postData = {
        table_number: tableData.table_number,
        is_occupied: tableData.is_occupied
    }

    axios.put(`/tables/${targetTable.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Getting all the tables data
            getAllTables(setTables)

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

// Defining a function to handle deleting table
export const deleteTable = (targetTable: Table, tables: Table[], setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {

    axios.delete(`/tables/${targetTable.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Removing the deleted table from the tables state 
            const filteredTables = tables.filter(table => table.id !== targetTable.id)
            // Setting the filtered tables
            setTables(filteredTables)

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


// Defining a function to search tables
export const searchTables = (searchData: string, tables: Table[], setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    if (searchData === "") {
        getAllTables(setTables)
    }
    else {
        // Filtering the tables to get tables where the client name is similar to search input
        let filteredData = tables.filter(table => table.table_number.toString().includes(searchData));
        setTables(filteredData);
    }
}

// Defining a function to handle filter tables
export const filterTables = (filterData: string, tables: Table[], setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    const tablesCountStr = localStorage.getItem("tablesCount");
    const tablesCount = tablesCountStr ? parseInt(tablesCountStr) : 0;

    if (filterData === "All") {
        getAllTables(setTables);
    } else {
        let filteredTables: Table[];
        if (tables.length < tablesCount) {
            getAllTables(setTables);
            filteredTables = tables.filter(table => table.is_occupied === (filterData === "Occupied" ? true : false));
        } else {
            filteredTables = tables.filter(table => table.is_occupied === (filterData === "Occupied" ? true : false));
        }
        setTables(filteredTables);
    }
}

// Defining a function to create a table
export const createTable = (e: React.FormEvent<HTMLFormElement>, tableData: AddTableFormType, tables: Table[], setTables: React.Dispatch<React.SetStateAction<Table[]>>) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        table_number: tableData.table_number,
        is_occupied: tableData.is_occupied
    }
    // Sending table data to the backend
    axios.post("/tables", postData)
        .then(response => {
            // Showing a success message
            toast.success("Table saved successfully")
            // Adding the new table data to the tables state
            setTables([...tables, response.data])
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                toast.error("Something went wrong please try again!");
            }
        })
}