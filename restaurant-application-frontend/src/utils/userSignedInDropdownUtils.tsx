import { User } from "./appUtils"

export type UserSignedInDropdownProps = {
    userData: User
    setUserData: React.Dispatch<React.SetStateAction<User>>
}

