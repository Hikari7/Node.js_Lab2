1. In VS Code, create a file named index.js. Then, in VS Code Terminal, type ‘npm init’.

2. In VS Code, install the following NPM packages:
   nodemon

3. Inspect the contents of package.json and package-lock.json. Make sure to understand what those files are about.

4. Add a new run script: “start”, which runs “nodemon index.js” script.

5. Import the “http” module. Set your server to run on port 8000.

6. In your server, console.log the request from localhost:8000.

7. Now we will do some routing. Create a router module. There, you should handle requests coming from “/”, “/read-message” and “/write-message”.

8. Respond to “http://localhost:8000/” with the h1 element, “Hello Node!”. There, you should also have two anchor elements (links or <a></a>), one to the address “http://localhost:8000/read-message” and another to “http://localhost:8000/write-message”.

9. Respond to requests from “/write-message” by sending a html form that has a text input field. When a user enters some text into the field, write the content of it to some text file. (you will need to deal with parsing and buffers for this.)

10. Respond to requests from “/read-message” by sending some html that displays the content of your text file.

11. Save and upload all your work on Google Classroom to Node.Js - Lab 2 Submission.
