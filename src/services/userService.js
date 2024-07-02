import db from "../models/index";
import bcrypt from 'bcryptjs';
import user from "../models/user";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            // let user = {};
            // user.email = email;
            // user.password = password;


            // console.log('>>>>> gia tri user data dau tien:', userData);

            let isExist = await checkUserEmail(email);
            // console.log('gi tri cua isExist :', isExist);

            if (isExist) {
                //user already exist
                //compare password

                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'firstName', 'lastName', 'gender', 'roleId'],
                    where: { email: email },
                    raw: false
                });

                if (user) {
                    // compare password

                    let check = bcrypt.compareSync(password, user.password); //false
                    // console.log('gia tri cua bien check la,' + check);
                    //  console.log('gia tri cua user email:', user.email);
                    //   console.log('gia tri cua user password:', user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                        // console.log('>>>>>>>>>>>>>> gia tri moi userData:', userData);
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                        userData.user = user;
                        //  console.log('>>>>>>>>>>>>>> gia tri moi userData:', userData);

                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'User s not found';
                }
                // userData.user.email = email;
                //userData.user.password = password;
            }
            else {
                //return error
                userData.errCode = '1';
                userData.errMessage = 'Your s Email is not exist in our system. plz try another email';
                // console.log('check gia tri cua userData:>>>>>>>>:', userData)
            }
            //userData.user = user;
            resolve(userData);
        }

        catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({

                where: { email: userEmail },

            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email existed , Pls using another email'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.lastName,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId },
        });
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }

        // await foundUser.destroy();

        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: 'The user is deleted'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if (!data.id) {
            //     console.log('check nodejs ', data);
            //     resolve({
            //         errCode: 2,
            //         errMessage: 'Missing required parameters'
            //     })
            // }
            console.log('check nodejs data ', data);
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            // console.log('check user data from nodejs:', user);
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.positionId = data.position;
                user.roleId = data.role;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds'
                })

                // await user.save();
                //let allUsers = await db.User.findAll();
                // resolve(allUsers);
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    //attributes: ['key', 'type1'],
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            console.log('>>>>>>>>>> in ra bat loi:', e);
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}