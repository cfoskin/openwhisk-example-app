const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);


app.post('/reverse', (req, res) => {
	var str = req.body.name;
	return res.json(str.split("").reverse().join(""));
}); 

app.listen(app.get('port'), () => {
    console.log('Running on http://localhost:' + app.get('port'));
});