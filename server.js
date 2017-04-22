const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');



hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { 
	return new Date().getFullYear() 
});

hbs.registerHelper('screamIt', (text) => { 
	return text.toUpperCase(); 
});

app.use((req,res,next) => {
	var now = new Date().toString();
	var log =`${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});


// SITE BLOCK

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.get('/', (req, res) => { 
	res.render('home.hbs', { 
		pageTitle: 'Home Page', 
		welcomeMessage: 'Welcome to my website', 
		currentYear: new Date().getFullYear() 
	}); 
});


app.get('/about', (req, res) => {
	res.render('home.hbs', { 
		pageTitle: 'Home Page',
		welcomeMessage: 'About page'
	}); 
});

app.get('/bad', (req, res) => { 
	res.send({ 
		errorMessage: 'Unable to handle request' 
	}); 
});


app.listen(8080, () => { 
console.log('Server is up on port 8080'); 
});