# cli-converse

### What is it?
cli-converse is a client to server messaging system, usable inside of the command line.

### How to use
To set up a server, its as simple as running <code>node server.js</code>, and you don't have to touch it after that.

On the client side, run <code>node client.js</code>. At the moment, some features are clunky until they can be reworked to be intuitive.

To properly set up the client, once the client window is open, you will have to configure a username and the server you want to connect to. To do this, run the command <code>set -n \<username\> -u \<server\></code>. <code>\<server\></code> should look like http://localhost:3000/. Replace localhost with another domain if not a local server, and leave the trailing <code>/</code> after the port.

Once this has been set, you can try to connect to the server by typing <code>connect</code>, and pressing enter. If everything has been set up, you should get reply with <code>You made contact with the server</code>

To send a message, type <code>send</code> into the prompt and press enter. When the prompt delimiter changes to <code>send =></code>, type the message you want to send and it will be pushed to the database.

At this point, you can type <code>log</code> into the prompt, and view previous messages.
