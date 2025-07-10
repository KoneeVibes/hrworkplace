const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const signInUserService = async (authDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authDetails)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

document.getElementById('loginButton').addEventListener('click', async function (e) {
    e.preventDefault();

    const form = document.getElementById("login-form");
    const username = form.elements["username"].value;
    const password = form.elements["password"].value;

    try {
        const response = await signInUserService({ username: username, password: password });
        console.log(response);
        // if (response.status === "success") {
        //     // setIsLoading(false);
        //     // cookies.set("TOKEN", response.token, {
        //     //     path: "/",
        //     // });
        //     // setIsAuthenticated(true);
        //     window.location.href = '../../dashboard/index';
        // } else {
        //     // setIsLoading(false);
        //     // setError('Authentication failed. Please check your credentials and try again.');
        //     console.log("Fail to login")
        // }
    } catch (error) {
        // setIsLoading(false);
        // setError(`Login failed. ${error.message}`);
        console.error('Login failed:', error);
    }
});
