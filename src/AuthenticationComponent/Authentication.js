const registerUserMutation = `
    mutation ($username: String!, $password: String!, $confirmPassword: String!, $dateOfBirth: String!, $country: String!, $termCondition: String) {
        registerUser (userInput: {username: $username, password: $password, confirmPassword: $confirmPassword, dateOfBirth: $dateOfBirth, country: $country, termCondition: $termCondition}) {
            _id
            username
        }
    }
`;

const loginUserQuery = `
    query ($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            userid
            token
            tokenRefresh
        }
    }
`;

const logoutUserQuery = `
    query ($userid: String!) {
        logoutUser (userid: $userid) {
            userid
            isAuth
        }
    }
`;

const refreshTokenQuery = `
    query ($tokenRefresh: String!, $token: String!) {
        tokenRefreshUser(tokenRefresh: $tokenRefresh, token: $token) {
            token
            tokenRefresh
        }
    }
`;

export async function RegisterUser(registerData) {
    try {
        const { username, password, confirmPassword, dateOfBirth, country, termCondition } = registerData;
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: registerUserMutation, variables: { username, password, confirmPassword, dateOfBirth, country, termCondition } })
        });
        if (!response.ok) {
            throw new Error("Fail to register user");
        }
        const registerUser = await response.json();
        return registerUser;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function LoginUser(loginData) {
    try {
        const { username, password } = loginData;
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: loginUserQuery, variables: { username, password } })
        });
        if (!response.ok) {
            throw new Error("Fail to log in with given user");
        }
        const loginUser = await response.json();
        return loginUser;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function LogoutUser(userid, token) {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ query: logoutUserQuery, variables: { userid } })
        });
        if (!response.ok) {
            throw new Error("Fail to log out with given user");
        }
        const logoutUser = await response.json();
        return logoutUser;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function RefreshTokenUser(tokenRefresh, _token) {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: refreshTokenQuery, variables: { tokenRefresh, token: _token } })
        });
        if (!response.ok) {
            throw new Error("Fail to refresh token with user");
        }
        const token = await response.json();
        return token;
    }
    catch (err) {
        console.log(err.message);
    }
}