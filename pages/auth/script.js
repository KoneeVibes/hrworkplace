const loginBtn = document.getElementById('loginButton');

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

loginBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const form = document.getElementById("login-form");
    const username = form.elements["username"].value;
    const password = form.elements["password"].value;
    const errorMessage = form.querySelector('[class="error-message"]');

    errorMessage.innerHTML = "";

    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<span class="spinner"></span>';
    loginBtn.disabled = true;

    try {
        const response = await signInUserService({ username: username, password: password });
        if (response.status === "Success") {
            sessionStorage.setItem('access_token', response.data.token);
            window.location.href = '../dashboard/index.html';
        } else {
            errorMessage.innerHTML = ("Authentication failed. Please check your credentials and try again.");
            console.log("Fail to login");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Login failed. ${error.message}`);
        console.error('Login failed:', error);
    } finally {
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
});
