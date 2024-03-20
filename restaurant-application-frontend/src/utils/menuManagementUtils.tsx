import { NavigateFunction } from "react-router-dom";
import { User } from "./appUtils";
import axios from "axios";
import { toast } from "react-toastify";

// Defining the menu category type
export type MenuCategoryType = {
    id: number;
    name: string;
    description: string;
}

// Defining the menu categories type
export type MenuCategoriesType = MenuCategoryType[]

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;

// Defining the MenuManagementProps
export type MenuManagementProps = {
    userData: User;
    menuCategories: MenuCategoriesType;
    setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>;
}

// Defining the menu categories management props
export type MenuCategoriesManagementProps = {
    userData: User;
    menuCategories: MenuCategoriesType;
    setTargetMenuCategory: React.Dispatch<React.SetStateAction<MenuCategoryType>>;
    targetMenuCategory: MenuCategoryType;
    setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>;
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
}

// Defining the menu category row props
export type MenuCategoryRowProps = {
    userData: User;
    menuCategory: MenuCategoryType;
    setTargetMenuCategory: React.Dispatch<React.SetStateAction<MenuCategoryType>>;
    targetMenuCategory: MenuCategoryType;
    menuCategories: MenuCategoriesType;
    setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>;
    
}

// Defining the MenuManagementProps
export type AddMenuCategoryProps = {
    menuCategories: MenuCategoriesType;
    setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>;
}


// Defining edit menu category props
export type EditMenuCategoryProps = {
    targetMenuCategory: MenuCategoryType;
    setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>;
}

// Defining a function to get all menu categories 
export const getAllMenuCategories = (setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>) => {
    axios.get("/menu-categories")
        .then(response => {
            // Setting menu categories data to the state variable
            setMenuCategories(response.data)
            localStorage.setItem("menuCategoriesCount", response.data.length)
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

// Defining a function to create a menu category
export const createMenuCategory = (e: React.FormEvent<HTMLFormElement>, menuCategoryData: MenuCategoryType, menuCategories: MenuCategoriesType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>, navigate: NavigateFunctionType) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        name: menuCategoryData.name,
        description: menuCategoryData.description,
    }

    // Sending menu category data to the backend
    axios.post("/menu-categories", postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Adding the new user data to the users state
            setMenuCategories([...menuCategories, response.data.menuCategory])
            navigate("/restaurant-management/menu-management/manage-categories")
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

// Defining a function to edit a menu category
export const editMenuCategory = (e: React.FormEvent<HTMLFormElement>, targetMenuCategory: MenuCategoryType, menuCategoryDetails: MenuCategoryType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>) => {
    // Preventing form auto-refresh
    e.preventDefault();

    // Defining the postData
    let postData = {
        name: menuCategoryDetails.name,
        description: menuCategoryDetails.description,
    }


    axios.put(`/menu-categories/${targetMenuCategory.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Getting all the menu categories data
            getAllMenuCategories(setMenuCategories)

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

// Defining a function to handle deleting menu category
export const deleteMenuCategory = (targetMenuCategory: MenuCategoryType, menuCategories: MenuCategoriesType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>) => {

    axios.delete(`/menu-categories/${targetMenuCategory.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Removing the deleted menu category from the menu categories state 
            const filteredMenuCategories = menuCategories.filter(menuCategory => menuCategory.id !== targetMenuCategory.id)
            // Setting the filtered menu categories
            setMenuCategories(filteredMenuCategories)

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

// Defining a function to search menu categories
export const searchMenuCategories = (searchData: string, menuCategories: MenuCategoriesType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>) => {
    if (searchData === "") {
        getAllMenuCategories(setMenuCategories)
    }
    else {
        // Filtering the menu categories to get menu categories where the name is similar to search input
        let filteredData = menuCategories.filter(menuCategory => menuCategory.name.toLowerCase().includes(searchData.toLowerCase()));
        setMenuCategories(filteredData);
    }
}
