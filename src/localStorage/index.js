

export function storeData(key, value){
    try {
        sessionStorage.setItem(key, value);
        return true
        
    } catch (error) {
        
        console.log(error);
    }
}

export function retrieveTokenData(key) {
    try {   
        const value = sessionStorage.getItem(key);
            // console.warn(value)
            // if (value == null) {
            // }
            return value;
    } catch (error) {
        // There was an error on the native side
    }
}

export function retrieveData(key) {
    try {   
        const value =  sessionStorage.getItem(key);
            // console.warn(key, value)
            return value;
    } catch (error) {
        // There was an error on the native side
    }
}

export function removeData(key) {
    try {
        sessionStorage.removeItem(key);
        return true
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
}

export function clearStorage() {
    try {
        sessionStorage.clear();
        return true
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
    }
}