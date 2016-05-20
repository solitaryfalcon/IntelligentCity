var http = require('http');
var fs = require('fs');
var url = require('url');             

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // 响应文件内容
         response.write(data.toString());		
      }
	  //response.redirect ("accountBook.html");
      //  发送响应数据
	response.end();
	 
   });
	//将客户端发送数据写入json文件
	/* fs.appendFile('account1.json',"hello world!",function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
		
		 request.on('data',function(data){
			console.log("received data:" + decodeURIComponent(data));
			return data;
		});
	
		request.on('end',function(){
			console.log("received from client");
		});
		response.end();
   }); */
  
  
}).listen(8888);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8888/');