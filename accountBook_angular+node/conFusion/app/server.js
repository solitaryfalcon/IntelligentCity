var http = require('http');
var fs = require('fs');
var url = require('url');             

// ����������
http.createServer( function (request, response) {  
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
	  //response.redirect ("accountBook.html");
      //  ������Ӧ����
	response.end();
	 
   });
	//���ͻ��˷�������д��json�ļ�
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

// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:8888/');