/* micro:bit -> p5*js BLE communication example. 
   Control video playback with microbit gesture input.

micro:bit code: https://makecode.microbit.org/_HwxMh9Fcgcxy

*/


//variable to store microbit device connection
let microBit;

let messageText = ""; 
let receivedText = "";


function preload() {


}

function setup() {
  createCanvas(500, 500);

  microBit = new uBitWebBluetooth();
 
  microBit.onConnect(function(){
    console.log("connected");
  });

  microBit.onDisconnect(function(){
    console.log("disconnected");
  });

  microBit.setButtonACallback(function(){
    console.log("buttonA pressed");
    // emojiMan.position.x -= 10;
  });

  microBit.setButtonBCallback(function(){
    console.log("buttonB pressed");
    // emojiMan.position.x += 10;
  });

  microBit.setUARTCallback(function(data){
    console.log("UART received",data);
    receivedText = data;
  });

  //define connect and disconnect buttons
  const connectButton = createButton("Connect");
  connectButton.mousePressed(() => {microBit.searchDevice()});
 
  // connectButton.mousePressed(microBit.searchDevice);
  const disconnectButton = createButton("Disconnect");
  disconnectButton.mousePressed(() => {microBit.disconnectDevice()});

  const helloButton = createButton("Hello!");
  helloButton.mousePressed(sayHello);
  helloButton.position(50,height/2);
  helloButton.size(200,40);

  const byeButton = createButton("Bye!");
  byeButton.mousePressed(sayBye);
  byeButton.position(250,height/2);
  byeButton.size(200,40);


  //video.showControls();
}

function draw() {
  background(78);
  fill(255)
  textSize(36)
  text("snd: " + messageText,width/4,height/2 - 100);
  text("rcv: " + receivedText,width/4,height/2 - 50);
}

//handleData function is called 
//when the bluetooth data is received.

function handleData(status) {
    receivedText = status;
    print("received:"+status);  
}

function sayHello(){
  messageText = "Hello!";
  microBit.writeUARTData(messageText);
  print("send:"+messageText);  
}

function sayBye(){
  messageText = "Bye!";
  microBit.writeUARTData(messageText);
  print("send:"+messageText);  

}

function keyPressed(){
  messageText = key;
  writeData(messageText);

  print("send:"+messageText);  
}


function toggleFullScreen(){
    let fs = fullscreen();
    fullscreen(!fs);
}



