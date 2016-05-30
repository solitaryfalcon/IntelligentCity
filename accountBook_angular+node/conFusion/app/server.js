var http = require('http');
var fs = require('fs');
var url = require('url');     
var writeData;        
var storeData;
var date = new Date();
var today = date.toLocaleDateString();
// 创建服务器
var server = http.createServer();
server.on("request", function (request, response) { 
	if(request!=="/favicon.ico")
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
	 
	  response.end();
	 
	 //将客户端发送数据写入json文件
	 request.on('data',function(data){
			var reduce = "num=";
			data += "";
			var s = data.split("=");
			data = s[1];
			console.log(data);
			storeData = data;
			console.log(storeData);
			
			
			 fs.readFile('account1.json',function(err,data1){
				if(err) throw err;
				var json = JSON.parse(data1);
				console.log(storeData);
				json.push({"date":today,"num":storeData});
				console.log(today);
				writeData = JSON.stringify(json);
				fs.writeFile('account1.json',writeData);
			}); 
			return data;
		});
   });
 
	
}).listen(8888);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8888/');
	  
	  
	  
	  