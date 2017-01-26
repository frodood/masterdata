console.log("Resource and Nagivation Controller");
var config = require('./config/default.json');

// Initialize
function initialize() {
    showMain();
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', checkMenu);

    function checkMenu() {
        var input = process.stdin.read();
        if(input !== null) {
            menuHandler(input.trim());
        }
    }
}
// Main

function showMain() {
    console.log(
        '1 : Create Resources' + '\n' +
        '2 : Create Consoles...'  + '\n' +
        '3 : Create Packages...'  + '\n' +
        '4 : Add Nagivations...'  + '\n' +
        '5 : Add Tasks' + '\n' +
            '6 : Add DashboardMeta Data' +'\n'+
        '5 : Exit'  + '\n\n' +
        'Choose number, then press ENTER:'
    );

    menuHandler = function(input){
        switch(input) {
            case '1': createResources(); break;
            case '2': showSub(); break;
            case '3': addPackages(); break;
            case '4': navigationSub(); break;
            case '5': addTasks();break;
            case '6': addDashboardMeta();break;
            case '9': process.exit(); break;
            default: showMain();
        }
    };
}

// Sub
function showSub() {

    console.log(
        '1 : Create AgentConsole' + '\n' +
        '2 : Create SupervisorConsole'  + '\n\n' +
        'Choose number, then press ENTER:'
    );

    menuHandler = function(input){
        switch(input) {
            case '1': createAgentConsole(); break;
            case '2': createSupervisorConsole(); break;
            default: showSub();
        }
    };
}
function navigationSub() {
    console.log(
        '1 : Add Navigation to Supervisor' +'\n'+
        '2 : Add Navigation to Agent' + '\n\n' +
            'Choose number, then pree ENTER:'
    );
    menuHandler = function (input) {
        switch (input){
            case '1': addNavigationSupervisor(); break;
            case '2': addNavigationAgent(); break;
            default: navigationSub();
        }
    };
}
function addNavigationSupervisor() {
    var async = require('async');
    var http = require('http');
    var data1 = JSON.stringify(require('./navigationdata/conferenceMonitor.json')),
        data2 = JSON.stringify(require('./navigationdata/pbxAdmin.json')),
        data3 =JSON.stringify(require('./navigationdata/conference.json')),
        data3 =JSON.stringify(require('./navigationdata/pbxUser.json')),
        data4 = JSON.stringify(require('./navigationdata/dashboard.json')),
        data5 = JSON.stringify(require('./navigationdata/notification.json')),
        data6 = JSON.stringify(require('./navigationdata/ardsConfiguration.json')),
        data7 = JSON.stringify(require('./navigationdata/companyConfiguration.json')),
        data8 = JSON.stringify(require('./navigationdata/mynumbers.json')),
        data9 = JSON.stringify(require('./navigationdata/agentProductivity.json')),
        data10 = JSON.stringify(require('./navigationdata/callMonitor.json')),
        data11 = JSON.stringify(require('./navigationdata/realTimeQueue.json')),
        data12 = JSON.stringify(require('./navigationdata/fileGallery.json')),
        data13 = JSON.stringify(require('./navigationdata/fileUpload.json')),
        data14 = JSON.stringify(require('./navigationdata/sipuserConfiguration.json')),
        data15 = JSON.stringify(require('./navigationdata/ringGroupConfiguration.json')),
        data16 = JSON.stringify(require('./navigationdata/users.json')),
        data17 = JSON.stringify(require('./navigationdata/applications.json')),
        data18 = JSON.stringify(require('./navigationdata/rules.json')),
        data19 = JSON.stringify(require('./navigationdata/holdmusic.json')),
        data20 = JSON.stringify(require('./navigationdata/limitHandler.json')),
        data21 = JSON.stringify(require('./navigationdata/attributes.json')),
        data22 = JSON.stringify(require('./navigationdata/resources.json')),
        data23 = JSON.stringify(require('./navigationdata/cdr.json')),
        data24 = JSON.stringify(require('./navigationdata/abandonCallReport.json')),
        data25 = JSON.stringify(require('./navigationdata/profile.json')),
        data26 = JSON.stringify(require('./navigationdata/myprofile.json')),
        data27 = JSON.stringify(require('./navigationdata/ticketTrigger.json')),
        data28 = JSON.stringify(require('./navigationdata/translation.json')),
        data29 = JSON.stringify(require('./navigationdata/queueSummary.json')),
        data30 = JSON.stringify(require('./navigationdata/slaBreakdown.json')),
        data31 = JSON.stringify(require('./navigationdata/tagmanager.json')),
        data32 = JSON.stringify(require('./navigationdata/autoattendance.json')),
        data33 = JSON.stringify(require('./navigationdata/socialConnector.json')),
        data34 = JSON.stringify(require('./navigationdata/facebook.json')),
        data35 = JSON.stringify(require('./navigationdata/twitter.json')),
        data36 = JSON.stringify(require('./navigationdata/toDoList.json')),
        data37 = JSON.stringify(require('./navigationdata/ticketSLA.json')),
        data38 = JSON.stringify(require('./navigationdata/templateMarker.json')),
        data39 = JSON.stringify(require('./navigationdata/packageManager.json')),
        data40 = JSON.stringify(require('./navigationdata/qualityAssuarance.json'));


    var post_data = [ data1, data2, data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,
                        data18,data19,data20,data21,data22,data23,data24,data25,data26,data27,data28,data29,data30,data31,data32,data33,
                        data34,data35,data36,data37,data38,data39,data40];

    async.each(post_data, function(data, callback){

        var post_options = {
            hostname: config.userserviceHost,
            port    : '80',
            path    : '/DVP/API/1.0.0.0/Resource',
            method  : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': config.secret
            }
        };

        post_req = http.request(post_options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ', chunk);
            });
            res.on('end', function () {
                callback();
            });
        });

        post_req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        post_req.write(data); //posting data
        post_req.end();
    }, function(err){
        console.log('All requests done!')
    });
}

function addNavigationAgent() {

    var async = require('async');
    var http = require('http');
    var data1 = JSON.stringify(require('./navigationdata/notification.json')),
        data2 = JSON.stringify(require('./navigationdata/agentProductivity.json')),
        data3 = JSON.stringify(require('./navigationdata/myprofile.json')),
        data4 = JSON.stringify(require('./navigationdata/agent_widget.json')),
        data5 = JSON.stringify(require('./navigationdata/ticket.json')),
        data6 = JSON.stringify(require('./navigationdata/dynamicform.json')),
        data7 = JSON.stringify(require('./navigationdata/agentDashboard.json')),
        data8 = JSON.stringify(require('./navigationdata/toDoList.json'))
    var post_data = [data1,data2,data3,data4,data5,data6,data7,data8];

    async.each(post_data, function(data, callback){

        var post_options = {
            hostname: config.userserviceHost,
            port    : '80',
            path    : '/DVP/API/1.0.0.0/Resource',
            method  : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': config.secret
            }
        };

        post_req = http.request(post_options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ', chunk);
            });
            res.on('end', function () {
                callback();
            });
        });

        post_req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        post_req.write(data); //posting data
        post_req.end();
    }, function(err){
        console.log('All requests done!')
    });
}
function addPackages() {
    console.log(
        '1 = Add Basic Package' + '\n' +
        '2 = Add Call Center Package'  + '\n\n' +
        'Choose number, then press ENTER:'
    );

    menuHandler = function(input){
        switch(input) {
            case '1': addBasicPackage(); break;
            case '2': askme(); break;
            default: showSub();
        }
    };
}
function askDetails(question, format, callback) {
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
}function askme() {
   var youexample = (require('./packages/callcenterpackage.json'));
    for (var x=0; x < youexample.consoleAccessLimit.length; x++) {
      askDetails("Enter example"+x+" Count:", /.+/, function(count) {
            youexample.consoleAccessLimit[x].accessLimit = count;

      })
    }
    console.log("youexample result: ", youexample)




}

function addBasicPackage() {
    var http = require('http');
    var post_req  = null,
        post_data = JSON.stringify(require('./packages/basicpackage.json'));

    var post_options = {
        hostname: config.userserviceHost,
        port    : '80',
        path    : '/DVP/API/1.0.0.0/package',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': config.secret
        }
    };

    post_req = http.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ', chunk);
        });
    });
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    post_req.write(post_data);
    post_req.end();
}

function addCallCenterPackage() {

}
function addTasks() {
    var pg = require('pg');
    var dbUrl = 'tcp://duo:DuoS123@192.168.4.3:5432/pocDB';
    console.log(dbUrl);

   /* var client = new pg.Client(dbUrl);
    client.connect();
    client.query("INSERT into DB_RES_TaskInfos (TaskClass, TaskType, TaskCategory, TaskName, OtherData, Status, createdAt, updatedAt) VALUES(DASUN, DASUN, DASUN, DASUN , null, true, )");
*/
    pg.connect(dbUrl, function(err, client, done) {

            client.query(
                'INSERT INTO "DB_RES_TaskInfos" ("TaskClass","TaskType","TaskCategory","TaskName","OtherData","Status","createdAt","updatedAt", "id") values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',['TOM','TOM','TOM',null,true,new Date(),new  Date(), 5],
                function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('row inserted with id: ' + result.rows[0].id);
                    }

                    client.end();

                });

    });


}
function createResources() {

    var async = require('async');
    var http = require('http');
    var data1 = JSON.stringify(require('./resources/monitorrestapi.json')),
        data2 = JSON.stringify(require('./resources/dashboard.json')),
        data3 = JSON.stringify(require('./resources/appregistry.json')),
        data4 = JSON.stringify(require('./resources/ardsliteservice.json')),
        data5 = JSON.stringify(require('./resources/autoattendant.json')),
        data6 = JSON.stringify(require('./resources/cdrprocessor.json')),
        data7 = JSON.stringify(require('./resources/clusterconfiguration.json')),
        data8 = JSON.stringify(require('./resources/conference.json')),
        data9 = JSON.stringify(require('./resources/eventservice.json')),
        data10 = JSON.stringify(require('./resources/fileservice.json')),
        data11 = JSON.stringify(require('./resources/interactions.json')),
        data12 = JSON.stringify(require('./resources/limithandler.json')),
        data13 = JSON.stringify(require('./resources/liteticket.json')),
        data14 = JSON.stringify(require('./resources/notificationservice.json')),
        data15 = JSON.stringify(require('./resources/pbxservice.json')),
        data16 = JSON.stringify(require('./resources/phonenumbertrunkservice.json')),
        data17 = JSON.stringify(require('./resources/queuemusic.json')),
        data18 = JSON.stringify(require('./resources/resourceservice.json')),
        data19 = JSON.stringify(require('./resources/ruleservice.json')),
        data20 = JSON.stringify(require('./resources/sipuserendpointservice.json')),
        data21 = JSON.stringify(require('./resources/socialconnector.json')),
        data22 = JSON.stringify(require('./resources/templates.json')),
        data23 = JSON.stringify(require('./resources/todolistservice.json')),
        data24 = JSON.stringify(require('./resources/userservice.json')),
        data25 = JSON.stringify(require('./resources/voxboneapi.json'))

    var post_data = [ data1, data2, data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,
                        data19,data19,data20,data21,data22,data23,data24,data25];
    async.each(post_data, function(data, callback){

        var post_options = {
            hostname: config.userserviceHost,
            port    : '80',
            path    : '/DVP/API/1.0.0.0/Resource',
            method  : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': config.secret
            }
        };

        post_req = http.request(post_options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ', chunk);
            });
            res.on('end', function () {
                callback();
            });
        });

        post_req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        post_req.write(data); //posting data
        post_req.end();
    }, function(err){
        console.log('All requests done!')
    });

   }
function createAgentConsole() {
    var http = require('http');
    var post_req  = null,
        post_data = JSON.stringify(require('./consoles/agentconsole.json'));

    var post_options = {
        hostname: config.userserviceHost,
        port    : '80',
        path    : '/DVP/API/1.0.0.0/Console',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': config.secret
        }
    };

    post_req = http.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ', chunk);
        });
    });
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    post_req.write(post_data);
    post_req.end();
}
function createSupervisorConsole() {
    var http = require('http');
    var post_req  = null,
        post_data = JSON.stringify(require('./consoles/supervisorconsole.json'));

    var post_options = {
        hostname: config.userserviceHost,
        port    : '80',
        path    : '/DVP/API/1.0.0.0/Console',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': config.secret
        }
    };

    post_req = http.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ', chunk);
        });
    });
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    post_req.write(post_data);
    post_req.end();
}

initialize();