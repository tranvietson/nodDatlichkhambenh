import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
    let limit = req.body.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }

}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorsService()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }

}
let postInforDoctor = async (req, res) => {
    try {
        console.log('req parameter: ', req.body)
        let data = await doctorService.saveDetailInforDortorService(req.body);
        console.log('>>>>>>>>>>gia tri data: ', data)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        console.log('>>>>> gia tri cua req: ', req.query.id)
        let infor = await doctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        console.log('>>>>> gia tri cua req body: ', req)
        let infor = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getScheduleDoctorByDate = async (req, res) => {
    try {
        console.log('>>>>> gia tri cua req body: ', req)
        let infor = await doctorService.getScheduleDoctorByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        console.log('>>>>> gia tri cua req body: ', req)
        let infor = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId);
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInforDoctorById: getExtraInforDoctorById
}

