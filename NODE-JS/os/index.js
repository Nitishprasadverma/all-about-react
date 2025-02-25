const os = require('os');
console.log('Cpu Architecture: ' + os.arch());

console.log('Free memory: ' + os.freemem() );
console.log('Total memory: ' + os.totalmem() );

console.log('Network interfaces: ' + JSON.stringify(os.networkInterfaces()));

console.log('Os defalut tmep path: ' + os.tmpdir());

console.log("host name: " + os.hostname());
console.log("os type:" + os.type());

console.log("release: " + os.release());
console.log("platform: " + os.platform());