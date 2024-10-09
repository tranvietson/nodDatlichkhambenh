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
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = ` <h3>Xin chào ${dataSend.patientName}!</h3>
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
    }

    if (dataSend.language === 'en') {
        result = `<h3>Dear ${dataSend.patientName}!</h3>
       <p>You received this email because you made an appointment online on the Ask Dan It channel. </p>
       <p>Medical appointment information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor:${dataSend.doctorName}</b></div>

        <p>
        If the above information is correct, please click on the link below to confirm and complete the appointment booking process.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Thanks so much!</div>
       `
    }

    return result;
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail
}