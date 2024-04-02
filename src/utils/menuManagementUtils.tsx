import { NavigateFunction } from "react-router-dom";
import { User } from "./appUtils";
import axios from "axios";
import { toast } from "react-toastify";


// Defining the menu category type
export type MenuCategoryType = {
    id: number;
    name: string;
    description: string;
    menu_items?: MenuItemsType;
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
    menuItems: MenuItemsType;
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>;
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
    menuCategory: MenuCategoryType;
    setTargetMenuCategory: React.Dispatch<React.SetStateAction<MenuCategoryType>>;
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
            if (error?.response?.data) {
                // Display the error message if it's sent from the backend
                toast.error(error?.response?.data?.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error?.message);
            }
        })

}

// Defining a function to create a menu category
export const createMenuCategory = (e: React.FormEvent<HTMLFormElement>, menuCategoryData: MenuCategoryType, menuCategories: MenuCategoriesType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>, navigate: NavigateFunctionType) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        name: menuCategoryData?.name,
        description: menuCategoryData?.description,
    }

    // Sending menu category data to the backend
    axios.post("/menu-categories", postData)
        .then(response => {
            // Showing a success message
            toast.success(response?.data?.message)
            // Adding the new user data to the users state
            setMenuCategories([...menuCategories, response?.data?.menuCategory])
            navigate("/restaurant-management/menu-management/manage-categories")
        })
        .catch(error => {
            if (error?.response?.data) {
                // Display the error message if it's sent from the backend
                toast.error(error?.response?.data?.error);
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
        name: menuCategoryDetails?.name,
        description: menuCategoryDetails?.description,
    }


    axios.put(`/menu-categories/${targetMenuCategory?.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response?.data?.message)
            // Getting all the menu categories data
            getAllMenuCategories(setMenuCategories)

        })
        .catch(error => {
            if (error?.response?.data) {
                // Display the error message if it's sent from the backend
                toast.error(error?.response?.data?.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error?.message);
            }
        })
}

// Defining a function to handle deleting menu category
export const deleteMenuCategory = (targetMenuCategory: MenuCategoryType, menuCategories: MenuCategoriesType, setMenuCategories: React.Dispatch<React.SetStateAction<MenuCategoriesType>>) => {

    axios.delete(`/menu-categories/${targetMenuCategory.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response?.data?.message)
            // Removing the deleted menu category from the menu categories state 
            const filteredMenuCategories = menuCategories?.filter(menuCategory => menuCategory.id !== targetMenuCategory.id)
            // Setting the filtered menu categories
            setMenuCategories(filteredMenuCategories)

        })
        .catch(error => {
            if (error?.response?.data) {
                // Display the error message if it's sent from the backend
                toast.error(error?.response?.data?.error);
            } else if (error) {
                // If no error message is sent from backend display a generic message
                toast.error(error?.message);
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
        let filteredData = menuCategories?.filter(menuCategory => menuCategory?.name?.toLowerCase()?.includes(searchData?.toLowerCase()));
        setMenuCategories(filteredData);
    }
}


// ############################################################################# MENU ITEMS UTILS ############################################################################# //



// Defining the menu item type
export type MenuItemType = {
    id?: number;
    menu_category_id: number;
    name: string;
    description: string;
    price: number | string;
    image: string;
    image_public_id: string;
    is_available: boolean;
}

// Defining the menu items type
export type MenuItemsType = MenuItemType[]


// Defining the menu items management props
export type MenuItemsManagementProps = {
    userData: User;
    menuItems: MenuItemsType;
    setTargetMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
    targetMenuItem: MenuItemType;
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>;
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
    menuCategories: MenuCategoriesType;
}


// Defining the menu item row props
export type MenuItemRowProps = {
    menuItem: MenuItemType;
    setTargetMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
    menuItems: MenuItemsType;
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>;

}

// Defining the MenuManagementProps
export type AddMenuItemProps = {
    menuItems: MenuItemsType;
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>;
    menuCategories: MenuCategoriesType;
}


// Defining edit menu item props
export type EditMenuItemProps = {
    targetMenuItem: MenuItemType;
    menuItems: MenuItemsType;
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>;
    menuCategories: MenuCategoriesType;
}

// Defining a function to get all menu items 
export const getAllMenuItems = (setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>) => {
    axios.get("/menu-items")
        .then(response => {
            // Setting menu items data to the state variable
            setMenuItems(response.data)
            localStorage.setItem("menuItemsCount", response.data.length)
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

// A function to handle image file changes
export const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>, setSelectedImageFile: React.Dispatch<React.SetStateAction<File | null | undefined>>, menuItem: MenuItemType, setMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>) => {
    // This returns a FileList object
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
        // Get the first file from the FileList
        const file = fileList[0];
        // Update the state with the selected file
        setSelectedImageFile(file);
        setMenuItem({ ...menuItem, image: URL.createObjectURL(file) });
    }
};

// Defining a function to upload an image to the cloudinary server
export const uploadImageToCloudinary = async (imageFile: File, menuItem: MenuItemType, setMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>, e: React.FormEvent<HTMLFormElement>, menuItems: MenuItemsType, setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>, navigate: NavigateFunctionType, createNewItem: boolean) => {
    e.preventDefault();
    if (process.env.REACT_APP_CLOUDINARY_PRESET_NAME && process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
        // Setting up cloudinary upload data
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "restaurant_app");

        // Creating a try-catch block to rescue from upload errors
        try {
            // Sending the upload data to the cloudinary server
            const uploadedImage = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data);

            // Setting up menu item data image attributes 
            if (uploadedImage.data.url && uploadedImage.data.public_id) {
                const postData: MenuItemType = {
                    menu_category_id: menuItem.menu_category_id,
                    name: menuItem.name,
                    description: menuItem.description,
                    price: menuItem.price,
                    image: uploadedImage.data.url.toString(),
                    image_public_id: uploadedImage.data.public_id.toString(),
                    is_available: menuItem.is_available
                }

                const editPostData: MenuItemType = {
                    id: menuItem?.id ? menuItem?.id : 0,
                    menu_category_id: menuItem.menu_category_id,
                    name: menuItem.name,
                    description: menuItem.description,
                    price: menuItem.price,
                    image: uploadedImage.data.url.toString(),
                    image_public_id: uploadedImage.data.public_id.toString(),
                    is_available: menuItem.is_available
                }
                console.log(editPostData)
               createNewItem ?  createMenuItem(e, postData, menuItems, setMenuItems, navigate) : editMenuItem(e, editPostData, editPostData, menuItems, setMenuItems)
            }
            else {
                console.log(uploadedImage)
            }

        }
        catch (error) {
            // if image upload fails this happens
            toast.error(`${error}`);
            console.log(error)
        }
    }
    else {
        console.log("Environment variables failed access")
        return false;
    }
}

const sha1 = require('js-sha1');

function generateSignature(timestamp: any, public_id: string, api_secret: string) {
    // Create a string with the parameters used in the DELETE request to Cloudinary
    const parameters = `public_id=${public_id}&timestamp=${timestamp}`;

    // Append your API secret to the end of the string
    const stringToSign = parameters + api_secret;

    // Create a hexadecimal message digest (hash value) of the string using SHA-1 cryptographic function
    const signature = sha1(stringToSign);

    return signature;
}

// A function do delete an image from the cloudinary server
export const deleteCloudinaryItemImage = async (menuItem: MenuItemType,  menuItems: MenuItemsType, setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>, deleteItem: boolean) => {
    if (process.env.REACT_APP_CLOUDINARY_CLOUD_NAME && process.env.REACT_APP_CLOUDINARY_API_KEY && process.env.REACT_APP_CLOUDINARY_API_SECRET) {

        const imageUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/destroy`;

        const formData = new FormData();
        formData.append('public_id', menuItem.image_public_id);
        formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append('api_secret', process.env.REACT_APP_CLOUDINARY_API_SECRET);
        formData.append('timestamp', Math.floor(Date.now() / 1000).toString());
        formData.append('signature',  generateSignature(Math.floor(Date.now() / 1000), menuItem.image_public_id,  process.env.REACT_APP_CLOUDINARY_API_SECRET));

        try {
            const response = await axios.post(imageUrl, formData);

            if (response.status === 200) {
                deleteItem && deleteMenuItem(menuItem, menuItems, setMenuItems)

            } else {
                // Handle the error response
                throw new Error('Failed to delete image from Cloudinary');
            }
        } catch (error) {
            // Handle the error
            console.error('Error deleting image from Cloudinary:', error);
            // Show alert or handle error as needed
        }
    }

}

// Defining a function to create a menu item
export const createMenuItem = (e: React.FormEvent<HTMLFormElement>, menuItemData: MenuItemType, menuItems: MenuItemsType, setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>, navigate: NavigateFunctionType) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        menu_category_id: menuItemData.menu_category_id,
        name: menuItemData.name,
        description: menuItemData.description,
        price: menuItemData.price,
        image: menuItemData.image,
        image_public_id: menuItemData.image_public_id,
        is_available: menuItemData.is_available,
    }

    // Sending menu item data to the backend
    axios.post("/menu-items", postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Adding the new user data to the users state
            setMenuItems([response.data.menuItem, ...menuItems])
            navigate("/restaurant-management/menu-management/manage-items")
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

// Defining a function to edit a menu item
export const editMenuItem = (e: React.FormEvent<HTMLFormElement>, targetMenuItem: MenuItemType, menuItemDetails: MenuItemType, menuItems: MenuItemsType,  setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>) => {
    // Preventing form auto-refresh
    e.preventDefault();

    //delete the old image if necessary
    const filteredMenuItem = menuItems.filter(menuItem => menuItem.id === targetMenuItem.id)[0]
    if (filteredMenuItem.image !== targetMenuItem.image){
        deleteCloudinaryItemImage(filteredMenuItem, menuItems, setMenuItems, false);
    }
    // Defining the postData
    let postData = {
        menu_category_id: menuItemDetails.menu_category_id,
        name: menuItemDetails.name,
        description: menuItemDetails.description,
        price: menuItemDetails.price,
        image: menuItemDetails.image,
        image_public_id: menuItemDetails.image_public_id,
        is_available: menuItemDetails.is_available,
    }


    axios.put(`/menu-items/${targetMenuItem.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Getting all the menu items data
            getAllMenuItems(setMenuItems)

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

// Defining a function to handle deleting menu item
export const deleteMenuItem = (targetMenuItem: MenuItemType, menuItems: MenuItemsType, setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>) => {

    axios.delete(`/menu-items/${targetMenuItem.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Removing the deleted menu item from the menu items state 
            const filteredMenuItems = menuItems.filter(menuItem => menuItem.id !== targetMenuItem.id)
            // Setting the filtered menu items
            setMenuItems(filteredMenuItems)

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

// Defining a function to search menu items
export const searchMenuItems = (searchData: string, menuItems: MenuItemsType, setMenuItems: React.Dispatch<React.SetStateAction<MenuItemsType>>) => {
    if (searchData === "") {
        getAllMenuItems(setMenuItems)
    }
    else {
        // Filtering the menu items to get menu items where the name is similar to search input
        let filteredData = menuItems.filter(menuItem => menuItem.name.toLowerCase().includes(searchData.toLowerCase()));
        setMenuItems(filteredData);
    }
}

