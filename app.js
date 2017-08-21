var express = require("express");
var mysql = require('mysql');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);
console.log("connected to server!!!!!!");

var arr_user = [];
var con = mysql.createConnection({
  host: "mysql6001.hostbuddy.com",
  user: "a276a0_dungle",
  password: "Ledung@2711",
  database: "db_a276a0_dungle"
});

io.sockets.on('connection', function (socket) {
	
  console.log("Co nguoi connect ne");
  
  //lang nghe su kien tu client
  socket.on('client_to_server_register', function (data) {
	  var check = false;
	  if(arr_user.indexOf(data) > -1){
		  console.log("this name is used...");
		  check = false;
	  }else{
		  arr_user.push(data);
		  socket.un = data;
		  console.log("added "+data);
		  check = true;
	  }
	  //gui du lieu ve client khi dk
	  socket.emit('server_to_client_result_register', { noidung: check });
  });
  
  socket.on('client_to_server_need_list_user', function (data) {
	// emit toi tat ca moi nguoi
	io.sockets.emit('server_to_client_result_list_user', { noidung: arr_user });
  });
  
   socket.on('client_to_server_send_chat', function (data) {
	// emit toi tat ca moi nguoi
	io.sockets.emit('server_to_client_notify_all', { noidung: socket.un+":"+data});
  });
  
  
});