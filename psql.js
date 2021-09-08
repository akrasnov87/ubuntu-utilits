const fs = require('fs');
var filePath = process.argv[2];
if(fs.existsSync(filePath)) {
    var data = fs.readFileSync(filePath).toString();
    var output = 'datname;xact_commit;now;numbackends;server\n';

    var lines = data.split('\n');
    for(var i in lines.slice(2, lines.length)) {
        var line = lines[i];
        if(line.trim() == '' || line.indexOf('(') >=0 || line.indexOf('datname') >= 0 || line.indexOf('-----') >= 0)
            continue;

        if(line) {
            var data = line.split('|');
            output += data[0].trim() + ';' + data[1].trim() + ';' + data[2].trim() + ';' + data[3].trim() + ';' + process.argv[4] + '\n';
        }
    }

    output = output.trimEnd();

    fs.writeFileSync(process.argv[3], output);
}