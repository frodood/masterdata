/*
var http = require('http');

http.createServer(function (request,response) {
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Hello World');

}).listen(8080);

console.log('Server Started');*/
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    process.stdout.write('data: ' + chunk);
});

function createCloud(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();

        if (format.test(data)) {
            callback(data);
        } else {
            stdout.write("It should match: "+ format +"\n");
            ask(question, format, callback);
        }
    });
}

createCloud("Enter Cloud Name", /.+/, function(cloudname) {
    //createCloud("Email", /^.+@.+$/, function(email)
    {
        console.log("Cloud Name: ", cloudname);
       //console.log("Your email is:", email);



    };
    //var querystring = require('querystring');
    var http = require('http');

    var data = {
        "CloudModel": "1",
        "Name": cloudname,
        "Class": "Class1",
        "Type": "Type1",
        "Category": "Cate1",
        "TenantId": 1,
        "CompanyId": 1
    };
    console.log(data);
    process.exit();
    var options = {
        host: 'clusterconfig.poc.lk',
        port: 80,
        path: '/DVP/API/1.0.0.0/CloudConfiguration/Cloud',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
    });

    req.write(data);
    req.end();


});


