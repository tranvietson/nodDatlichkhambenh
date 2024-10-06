require('dotenv').config();
//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "xekohpvn@gmail.com",
            pass: "tujy tnvl ilge cclw",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Hoi Dan It👻" <xekohpvn@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body
        html: `
       <h3>Xin chào ${dataSend.patientName}!</h3>
       <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Hỏi Dân It channel. </p>
       <p>Thông tin đặt lịch khám bênh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ:${dataSend.doctorName}</b></div>

        <p>
        Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
        để xác nhận và hoàn tất thủ tục đặt lịch khám.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
       `
    });


}




module.exports = {
    sendSimpleEmail: sendSimpleEmail
}