const jwt = require("jsonwebtoken")

let token = jwt.sign({ userId: "user._id" }, 'your-secret-key', {
  expiresIn: '1s',
});
try{
  var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLl9pZCIsImlhdCI6MTcyNTMwODMzNywiZXhwIjoxNzI1MzA4MzM4fQ.e31ZuJQUCPfdvAk0ir4lclYN64wg3_QqDJHuqds6iaw", 'your-secret-key');
}
catch(e){
  console.log(e.name);
  console.log(JSON.parse(JSON.stringify(e)))
}
console.log({token, decoded})