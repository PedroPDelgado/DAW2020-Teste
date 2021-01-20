const fs = require('fs');

let rawdata = fs.readFileSync('batismos.json');
let batismos = JSON.parse(rawdata);
batismos.forEach(b => {
    b.ref2 = b.ref
    b.title2 = b.title
    b.date2 = b.date
});

fs.writeFile("batismos2.json", JSON.stringify(batismos),  err => {
    console.log(err)
})