
/**
 * author : Nidhi Gadhavi.
 * Purpose : JWT tockens utility.
 */

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));    
    console.log("**&*&**&&&***");
    console.log(user);

    if (user && user.data) {
        let authorization =  { 'authorization': user.data.data.data };
        return authorization;
    } else {
        return {};
    }    
}