class Auth {
    constructor() {
        this.token = window.localStorage.getItem('token');

        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

            this.getUser();
        }

    }

    login(token, user) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        this.token = token;
        this.user = user;

        Event.$emit('userLoggedIn');
    }

    check () {
        return !! this.token;
    }

    getUser() {
        axios.get('/api/get-user')
            .then(({user}) => {
                this.user = user;
            })
            .catch(({response}) => {
                if (response.status === 401) {
                    console.log('dupa')
                }
            });
    }
}

export default Auth;