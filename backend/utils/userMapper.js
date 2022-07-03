const cleanUser = (user) => {
    const {password, isAdmin, ...other} = user._doc;
    return {...other};
}

module.exports = {cleanUser}