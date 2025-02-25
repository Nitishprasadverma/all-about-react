const fs = require('fs');
const { buffer } = require('stream/consumers');

// console.log("Read start");

// //Asynchronous way to read a file


// fs.readFile('input.txt', function(err,data){
//     if(err){
//         console.log("err a gaya bhai",err);
//         return err;
//     }
//     console.log(data.toString());
//     console.log("read end");
//     return data;
// })
// console.log("Other stuff");


//synchronous way


// var data = fs.readFileSync('input.txt');
// console.log('Data: ', data.toString());
// console.log('Read End');
// console.log('Other stuff');



const buf = new Buffer(1024);
fs.open('input.txt', 'r+', function(err,fd){
    if(err){
        console.log('Error a gyaa:',err);
    }

    console.log('File opened:');

    fs.read(fd,buf,0,buf.length,0,function(er,data){
        if(err){
            console.log('error in reading file');
        }
        console.log('Data ', data.toString());
        fs.close(fd,function(err){
            if(err){
                console.log("Error in closing file");
            }else{
                console.log('success fully closed');
            }
        })
    })
})


//writing to a file
// fs.writeFile('input.txt','pw skilss', function(err){
//     if(err){
//         console.log('error occured');
//     }else{
//         console.log('successfully wrote');
//     }
// })


//Appending to file

// fs.appendFile('input.txt','---nitisgya', 'utf8', function(err){
//     if(err){
//         console.log('Error occured: ', err);
//     }else{
//         console.log('successfully, append');
//     }
// })


fs.unlink('input.txt', function(err){
    if(err){
        console.log('Erros in deleting file');
    }else{
        console.log('successfully Deleted');
    }
})