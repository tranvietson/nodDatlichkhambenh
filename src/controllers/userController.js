import user from "../models/user";
import userService from "../services/userService";
let handLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('your email ' + email);
    console.log('your password ' + password);
    /* check email exist
    compare password
    return userinfo
    access_token: JWT json web token */

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log('Du lieu userData la ', userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

// let handLogin = (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     res.status(500).json({
//         message: 'Hello World',
//         email: email,
//         password: password

//     })
// }

let handleGetAllUsers = async (req, res) => {
    // let id = req.body.id;
    let id = req.query.id; //ALL , id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    //console.log(users);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    //console.log(message);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {
        setTimeout(async () => {
            let data = await userService.getAllCodeService(req.query.type);
            return res.status(200).json(data);
        }, 2000)

    } catch (e) {
        console.log('Get all code error: ', e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handLogin: handLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode
}