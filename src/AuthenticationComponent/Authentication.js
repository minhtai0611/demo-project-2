const registerUserMutation = `
    mutation ($username: String!, $password: String!, $confirmPassword: String!, $dateOfBirth: String!, $country: String!}) {
        registerUser (userInput: {username: $username, password: $password, confirmPassword: $confirmPassword, dateOfBirth: $dateOfBirth, country: $country}) {
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
        }
    }
`

export async function RegisterUser(username, password, confirmPassword, dateOfBirth, country) {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: registerUserMutation, variables: { username, password, confirmPassword, dateOfBirth, country } })
        });
        if (!response.ok) {
            throw new Error("Fail to register user");
        }
        const json = await response.json();
        const registerUser = await json?.data;
        // if ((registerUser?.errors && registerUser?.errors[0]?.message) || !registerUser) {
        //     throw new Error("Invalid input. You have to fill correct information")
        // }
        // else {
        //     return registerUser?.registerUser;
        // }
        return registerUser;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function LoginUser(username, password) {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: loginUserQuery, variables: { username, password } })
        });
        if (!response.ok) {
            throw new Error("Fail to login with given user");
        }
        const json = await response.json();
        const loginUser = await json?.data;
        return loginUser;
    }
    catch (err) {
        console.log(err.message);
    }
}