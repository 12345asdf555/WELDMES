var client,clientId;
$(function() {
	mqttTest();
})
function mqttTest(){
	clientId = Math.random().toString().substr(3,8) + Date.now().toString(36);
	client = new Paho.MQTT.Client(websocketURL.split(":")[0], parseInt(websocketURL.split(":")[1]), clientId);
	var options = {
        timeout: 5,  
        keepAliveInterval: 60,  
        cleanSession: false,  
        useSSL: false,  
        onSuccess: onConnect,  
        onFailure: function(e){  
            console.log(e);  
        },
        reconnect : true
	}
	
	//set callback handlers
	client.onConnectionLost = onConnectionLost;
//	client.onMessageArrived = onMessageArrived;

	//connect the client
	client.connect(options);
}

//called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}