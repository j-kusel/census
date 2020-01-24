var app = require('express')();
const morgan = require('morgan')('dev');
const methodOverride = require('method-override')();
const bodyParser = require('body-parser');
var shell = require('shelljs');

const PORT = 14666;

app.use(morgan);
app.use(methodOverride);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.route('/api/status')
    .get((req, res, next) => res.send({ message: 'active' }))
    .post((req, res, next) => {
        var code = 0;
        if (req.body.command === 'poweroff') {
            code = shell.exec('poweroff', function (code, stdout, stderr) {
                return res.send({ code, stdout, stderr });
            });
        } else {
            return res.status(500).send({ errors: ['command failed.'] });
        };
    });


app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);
