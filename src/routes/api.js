const express = require("express");
const routerAPI = express.Router();
const { getUsersAPI,postCreateUserAPI,putUpdateUserAPI,deleteUserAPI,postUploadSingleFileApi,postUploadMultipleFilesAPI } = require("../controllers/apiController")
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomers, putUpdateCustomers, deleteACustomer, deleteArrayCustomer } = require('../controllers/customerController')
const { postCreateProject, getAllProject, deleteProject, updateProject } = require('../controllers/projectController')
const {postCreateTask,getAllTask,deleteTask,updateTask} = require('../controllers/taskController')
routerAPI.get('/', (req, res) => {
    res.send("hello world with apis")
})
routerAPI.get('/abc', (req, res) => {
    res.status(200).json({
        data: 'data work hard'
    })
})
routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', deleteUserAPI);
routerAPI.post('/file', postUploadSingleFileApi);
routerAPI.post('/files', postUploadMultipleFilesAPI);
routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getAllCustomers);
routerAPI.put('/customers', putUpdateCustomers);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteArrayCustomer);
routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getAllProject);
routerAPI.delete('/projects', deleteProject);
routerAPI.put('/projects', updateProject);

routerAPI.post('/tasks', postCreateTask);
routerAPI.get('/tasks', getAllTask);
routerAPI.delete('/tasks', deleteTask);
routerAPI.put('/tasks', updateTask);


module.exports = routerAPI;
