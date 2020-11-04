const fs = require('fs');

fs.readdir('./token', function(err,files){
    if (err) {
        console.log('error message : ', err);
    } else {
        if (files) {
            console.log(files);
        } else {
            console.log(`There's no file`);
        }
    }

});

fs.writeFileSync('./token/sample.txt','hello sample');