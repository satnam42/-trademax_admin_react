export const isFieldEmpty = text => {
    if (text == '') {
        return true;
    }
    return false;
};
export const passwordPattern = password => {
    if(password.length<8){
        return true
    }
    return false;
};

export const isValidEmail = email => {
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (reg.test(email) != true) {
        return true;
    }
    return false;
};

export const isValidPhoneNumber = phoneNo => {
    if (phoneNo.length < 8) {
        return false;
    }
    return true;
};

export const isValidComparedPassword = (newpassword, confirmPassword) => {
    if (newpassword != confirmPassword) {
        return false;
    }
    return true;
};


export const nameValid = name => {
    const reg = /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
    if (reg.test(name) === true) {
        return false;
    }
    return true;
};


export const pinValid = pin => {
    const reg = /^[1-9][0-9]{5}$/;
    if (reg.test(pin) === true) {
        return false
    }
    return true;
}

export const validUserName = (userName)=>{
    const reg = /^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9](?<![-?\d+\.?\d*$]{6,}.*)$/;
    if (reg.test(userName) === true) {
        return false
    }
    return true;
}
