// crontab: */1 * * * * top -bi -n1 >> top.log
/**
 * Простое применение: node script.js /var/data.log
 * Полный синтаксис: node script.js /var/data.log /var/data.log.csv ;
 * Версия: 1.0
 */
const SEPARATE = process.argv[4] || ',';
const fs = require('fs');
var filePath = process.argv[2];
if(fs.existsSync(filePath)) {
    var data = fs.readFileSync(filePath).toString();
    var output = 'time' + SEPARATE + 'la1' + SEPARATE + 'la2' + SEPARATE + 'la3' + SEPARATE + 'tasks' + SEPARATE + 'used\n';

    var lines = data.split('\n');
    var la1 = '';
    var la2 = '';
    var la3 = '';
    var tasks = '';
    var mem = '';
    var time = '';

    for(var i in lines) {
        var line = lines[i];
        var load_average = 'load average:';
        if(line.indexOf(load_average) >= 0) {
            var items = line.split(',')[0].split(' ');
            time = items[4] + ' day ' + items[2];
            var i = line.indexOf(load_average);
            var data = line.substr(i + load_average.length, line.length - (i + load_average.length)).trim().split(',');
            
            la1 = data[0].trim();
            la2 = data[1].trim();
            la3 = data[2].trim();
        }

        var _tasks = 'Tasks:'
        if(line.indexOf(_tasks) >= 0) {
            var i = line.indexOf(_tasks);
            var data = line.substr(i + _tasks.length, line.indexOf('total') - (i + _tasks.length)).trim();
            tasks = data;
        }

        var _mem = 'KiB Mem :'
        if(line.indexOf(_mem) >= 0) {
            var data = line.split(',');
            mem = data[2].trim().split(' ')[0];

            output += time + SEPARATE + la1 + SEPARATE + la2 + SEPARATE + la3 + SEPARATE + tasks + SEPARATE + mem + '\n';
        }
    }

    output = output.trimEnd();

    fs.writeFileSync(process.argv[3] || (process.argv[2] + '.csv'), output);
}