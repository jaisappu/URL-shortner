#Url-shorten APP

##How to run
In side the Srikanth-url-shortner floder there two projects are there
1.Node.js server
2.Angular application

First Download the project folder or clone the project.
To run node.js server goto inside of Srikanth-url-shortner => node-url-shortener. Inside that open the terminal/cmd and type npm i to install all node_modules.
Then run npm run dev to run the server in locally. Now the server runs on http://localhost:4000. If you open the link in browser
you will get the Not found message.


To run the angular application Srikanth-url-shortner => angular-url-short project and open the terminal/cmd and type the 
command npm i to install all node_modules. Then run ng serve to run angular application locally. Now it will run on http://localhost:4200. If you open this link in browser 
you will see the angular application.


Now both the applications are running locally. 

Also I have deployed the Both applications in heroku and firebase.
Urls are:
Angular App : https://url-shorten-c1455.web.app
Nodejs App: https://node-url-shorten.herokuapp.com


###Docker images:
Nodejs: docker login
	docker run -it 'srikanth340/node-url-short:1.0'
	Stop the process with ctrl+c
   execute: docker run -p 4000:4000 -d srikanth340/node-url-short

Angular: Not done


You can refer them at the above links.


##How to use
After both applications started, goto the angular application you will see the two input boxes and one button. First input box for
entering the original long URL and second for customized shortUrl code.

If you enter the longUrl and press the shorten url button it will generate the short url and display to you.
Below of the inputbox you can see the generated shortUrl. You can click on that url or copy and paste in the address bar to navigate to the original URL page.


In top navbar consists of the LOGO and short urls button. If you click on the LOGO it will navigate to the home page. If you click on the short urls button it will
navigate to the shortUrls list. There all shorturls are displayed with details LongUrl, shortUrl, created on, valid till.
The shortUrls are valid by default for 1 day.

To change the url valid time please open the node-url-shortener => routes => urlRoute.js. In urlRoute.js file there is app.Post() present.
Inside that you will find the.

const expireDate = new Date().setDate(currentDate.getDate() + 1);

Just replace the 1 with no of days you want till the short url valid.

##Security
I have used the 'express-rate-limit' npm module to limit the no of requests not more the 100 per 1 minute.


##Security
