var http = require('http');
var fs = require('fs');
var url = require('url');     
var writeData;        
var storeData;
var date = new Date();
var today = date.toLocaleDateString();
// ����������
var server = http.createServer();
server.on("request", function (request, response) { 
	if(request!=="/favicon.ico")
   // �������󣬰����ļ���
   var pathname = url.parse(request.url).pathname;
   
   // ���������ļ���
   console.log("Request for " + pathname + " received.");
   
   // ���ļ�ϵͳ�ж�ȡ������ļ�����
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP ״̬��: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP ״̬��: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // ��Ӧ�ļ�����
         response.write(data.toString());		
      }
	 
	  response.end();
	 
	 //���ͻ��˷�������д��json�ļ�
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

// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:8888/');
	  
	  
	  
	  