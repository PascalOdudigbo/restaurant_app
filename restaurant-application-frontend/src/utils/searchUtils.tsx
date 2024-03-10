import { BookingsType } from "./bookingsManagementUtils";

// Defining the search props type
export type SeachProps = {
    placeholderText: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
}

