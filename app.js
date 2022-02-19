const http = require('http');

var mp = require('minecraft-protocol');
var client = mp.createClient({
    username: "kristian381@hotmail.com",
    password: "RoHgame01",
    host: "Join.Performium.co", // this is the servers ip address and this is the one I used (its a free hosting service so the server can only stay up for an hour)
    port: 25565,
    auth: 'mojang'
});
// list with chatlog of the server
var chatlog = [];

// catches packages from the server
client.on('chat', function(packet) {
    // messages from a server is a json so we have to parse the information
    var json = JSON.parse(packet.message);
    var username = json.with[0].text;
    var msg = json.with[1].text;
    // prints the message and username to the console
    console.log("user: '" + username + "' says: '" + msg +"'");
    // stores chatlog to the chatlog array
    chatlog.push(username + ": " + msg);
});
// store chatlog on a local html file
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>Chatlog of minecraft server</h1>");
    // display every message in the chatlog
    for(var i = 0; i < chatlog.length; i++) {
        res.write("<p>" + chatlog[i] + "</p>");
    }
    res.write("</body></html>");
    res.end();
}).listen(8080); // run server on port 8080
