const express = require('express');
const router = express.Router();
var DocumentDBClient = require('documentdb').DocumentClient;

var TaskList = require('./tasklist');
var TaskDao = require('./../models/taskDao');

var host = process.env.HOST || 'https://projectdb.documents.azure.com:443/';
var authKey = process.env.AUTH_KEY || 'ln5q0WsGrhBjex7QMOkqY8TdyUg8BG61Hk4o92lNg20Y7887NutiscUI4uG32eWQMVoVncNTm4v2EFtMIqqCFA==';
var databaseId = "ToDoList";
var collectionId = "Items";


var docDbClient = new DocumentDBClient(host, {
    masterKey: authKey
});


var taskDao = new TaskDao(docDbClient, databaseId, collectionId);
var taskList = new TaskList(taskDao);
taskDao.init();

router.get('/show', taskList.showTasks.bind(taskList));
router.post('/addtask', taskList.addTask.bind(taskList));
router.post('/completetask', taskList.completeTask.bind(taskList));


module.exports = function (app) {
  app.use('/', router);
};
