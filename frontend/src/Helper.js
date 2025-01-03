// export const API_URL = "http://localhost:4000";
// export const API_URL = "https://diamond-api-50e4.onrender.com";
// export const API_URL = "http://52.63.48.17:4000";
export const API_URL = "https://api.businessalliancehub.org";


export const createStorage = (key, item) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(item));
    else localStorage.setItem(key,JSON.stringify(item))
}

export const getStorage = (key) => {
    return localStorage.getItem(key);
}

export const clearStorage = (key) => {
    localStorage.removeItem(key);
}

export const checkStorage = (key) => {
    if (localStorage.getItem(key)) return true;
    else return false;
}

export const updateStorage = (key, newData) => {
    // Retrieve the current data
    let existingData = getStorage(key);
    
    if (existingData) {
        // Parse the existing data
        existingData = JSON.parse(existingData);
        
        // Modify the data as needed (e.g., update token or other fields)
        const updatedData = { ...existingData, ...newData };
        
        // Store the updated data
        createStorage(key, updatedData);
    } else {
        // If no data exists, create a new entry with the newData
        createStorage(key, newData);
    }
}


// set token to request header
export const setNetworkHeader = () => {
    let user = JSON.parse(getStorage('user'));
    return { headers: { "Authorization": `Bearer ${user.token}` } }
}

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

export const separateAndCapitalize = (str) => {
    // Split the string into words
    const words = str.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a string
    const result = capitalizedWords.join(' ');

    return result;
}
export var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];