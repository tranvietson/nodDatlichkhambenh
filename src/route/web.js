import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"

let router = express.Router();
let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);

  // router.get('/hoidanit',(req,res)=>{
  //   return res.send('Hoi dan It')
  //});

  router.get('/about', homeController.getAboutPage);
  router.get('/CRUD', homeController.getCRUDPage);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.displayGetCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  router.post('/api/login', userController.handLogin);
  router.get('/api/get-all-users', userController.handleGetAllUsers);
  router.put('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);

  router.get('/api/allcode', userController.getAllCode);
  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/api/get-all-doctors', doctorController.getAllDoctors);
  router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
  router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);

  return app.use("/", router);
}

module.exports = initWebRoutes;