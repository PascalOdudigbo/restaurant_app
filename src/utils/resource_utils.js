// A function to capitalize strings with exclusions
const capitalize = (string) => {
    // Check if the string is null or undefined
    if (string == null) {
        return null;
    }

    // List of words to exclude from capitalization
    const excludedWords = ["and", "or", "but", "the", "is", "on"]; // Add more words as needed

    // Initialize an empty string to store the capitalized result
    let capitalizedString = "";

    // Check if the string contains spaces (multiple words)
    if (string?.includes(" ")) {
        // Convert the complex string into an array of strings
        const stringArray = string?.toLowerCase().split(" ");

        // Loop through each string and capitalize it
        stringArray.forEach((stringElement, index) => {
            // Capitalize the first letter of each word, except for excluded words
            const wordToCapitalize = excludedWords?.includes(stringElement) && index !== 0
                ? stringElement.toLowerCase()
                : stringElement.charAt(0).toUpperCase() + stringElement.slice(1);

            // Concatenate the capitalized word
            capitalizedString += wordToCapitalize + " ";
        });
    } else {
        // Capitalize the first letter of a single-word string
        capitalizedString = string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    }

    // Remove trailing spaces and return the capitalized string
    return capitalizedString.trim();
};

module.exports = {
    capitalize,
}
