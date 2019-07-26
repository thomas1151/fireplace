function logIn(token, domain,username,profile) {
    localStorage.setItem('token', token)
    localStorage.setItem('domain', domain+profile+'/')
    localStorage.setItem('username', username)
    localStorage.setItem('profile', profile)
}
export default logIn;