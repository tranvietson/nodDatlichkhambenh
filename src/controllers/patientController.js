import patientService from '../services/patientService';
let postBookAppointment = async (req, res) => {
    try {
        console.log('>>>>> gia tri cua req body: ', req)

        let infor = await patientService.postBookAppointmentService(req.body);
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


module.exports = {
    postBookAppointment: postBookAppointment
}