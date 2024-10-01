import db from "../models/index";
require('dotenv').config();

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                // upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                    raw: true
                });

                console.log('>>>>>>>> hoi dan it check userid: ', user[0].id);
                let patientId = user[0].id;
                console.log('************* patientId:', patientId);

                //create a booking record
                if (user[0] && user[0].id) {
                    await db.Booking.findOrCreate({
                        where: { patientId: patientId },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: patientId,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointmentService: postBookAppointmentService
}