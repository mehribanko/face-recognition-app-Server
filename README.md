<h2>Face Recognition App Server Side</h2>


The server-side API of the face-recognition web app is quite straightforward. It was built using <strong>node.js</strong>, and <strong>express framework</strong>. The server also connects to PostgreSQL database. 
The server receives requests from the front end, connects with database, and  sends a respond back to the front end. 
Of course, the server makes an asynchronous call to Clarifai API and returns reply. 

PostgreSQL is used to store user data. The backend talks with the database to verify the user and their password when they try to register/log in. 
The backend also enables routing. It also fetches face recognition API from Clarifai. 

