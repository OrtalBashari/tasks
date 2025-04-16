const BASE_URL = "http://localhost:5500";

export const registerUser = async (userData) => {
    const response = await fetch (`${BASE_URL}/newUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return await response.json();
};