function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('domain'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('profile'); 
    localStorage.removeItem('config'); 
}
export default logOut;