import { User, sendEmailNoNavigate } from "./appUtils";

// Defining the contact page props
export type ContactPageProps = {
    userData: User
}

// Defining the contactDetails type
export type ContactDetails = {
    name: string;
    email: string;
    mobileNumber: string;
    message: string;
}

// Defining a function to handle contactUS
export const contactUs = (e: React.FormEvent<HTMLFormElement>, contactDetails: ContactDetails) => {
    // Prevent automatic form refresh
    e.preventDefault();

    // Preparing the email data
    const emailValues = {
        logo_text: "LILA BROWN",
        logo_font: "'Playfair Display', serif",
        logo_color: "#FFD700",
        email_title: `Lila Brown, ${contactDetails.name} Sent A Message.`,
        user_name: "Lila Brown",
        email_to: "allmyprojectsemail@gmail.com",
        notice: `This email was intended for Lila Brown, 
        if you're not the intended recipient of this email please delete this email.`,
        email_body: `
        Message Details: 
        Customer Name( ${contactDetails.name} )
        Customer Email( ${contactDetails.email} )
        Customer Mobile( ${contactDetails.mobileNumber} )
        Message( ${contactDetails.message} )
        `
    }
    // Sending the booking submission email 
    sendEmailNoNavigate(emailValues, "Message sent!", "Something went wrong, message not sent!")

}
