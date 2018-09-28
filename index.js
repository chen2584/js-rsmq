RedisSMQ = require("rsmq");
rsmq = new RedisSMQ({ host: "127.0.0.1", port: 6379, ns: "rsmq" });

var count = 0;

rsmq.createQueue({ qname: "myqueue" }, function (err, resp) {
    if (resp === 1) {
        console.log("queue created")
    }

    setInterval(() => {
        rsmq.sendMessage({ qname: "myqueue", message: JSON.stringify({ name: "Hello" + count, sir: "World" }) }, function (err, resp) {
            if (resp) {
                console.log("Message sent. ID:", resp);
            }
        });
        count++;
    }, 3000)

});