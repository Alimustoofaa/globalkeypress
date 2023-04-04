const InputEvent = require('input-event');

// // Number of active nodes of this type
// var globalKeypressNodes = 0;

// const code_keybord = {
//     // Input number
//     "2": "1",
//     "3": "2",
//     "4": "3",
//     "5": "4",
//     "6": "5",
//     "7": "6",
//     "8": "7",
//     "9": "8",
//     "10": "9",
//     "11": "0",
    
//     // Input Keypad
//     "79": "1",
//     "80": "2",
//     "81": "3",
//     "75": "4",
//     "76": "5",
//     "77": "6",
//     "71": "7",
//     "72": "8",
//     "73": "9",
//     "82": "0",
    
//    1 // Enter
//     "96": "ENTER",
//     // Backspace
//     "14": "BACKSPACE",
//     // Space
//     "57": "SPACE"
//   }

// module.exports = function(RED){

//     function GlobalKeyPress(config){
//         RED.nodes.createNode(this, config);
//         var node = this;
//         node.key = config.key;

//         if(process.stdout.isTTY) {
//             process.stdin.setRawMode(true);
//         } else {
//             node.log('Raw mode not supported in this terminal');
//         }

//         process.stdin.on('keypress', onKeyPress);
//         if(keypressNodes === 0) {
//             keypress(process.stdin);
//             process.stdin.resume();
//             node.log('Started keypress capturing');
//         }

//     }
// }

const code_keybord = {
    // Input number
    "2": "1",
    "3": "2",
    "4": "3",
    "5": "4",
    "6": "5",
    "7": "6",
    "8": "7",
    "9": "8",
    "10": "9",
    "11": "0",
    
    // Input Keypad
    "79": "1",
    "80": "2",
    "81": "3",
    "75": "4",
    "76": "5",
    "77": "6",
    "71": "7",
    "72": "8",
    "73": "9",
    "82": "0",
    
    // Enter
    "96": "ENTER",
    // Backspace
    "14": "BACKSPACE",
    // Space
    "57": "SPACE"
  }

var keypressNodes = 0;

module.exports = function(RED) {
    function globalKeypressNodes(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.keyboard = config.keyboard;
        node.barcode = config.barcode

        // Start globalkeypress
        process.stdin.on('InputEvent', onGlobalKeyPrress);
        if(keypressNodes === 0) {
            stopCapturing()
            onGlobalKeyPrress()
            process.stdin.resume();
            node.log('Started keypress capturing');
          }
        keypressNodes++;

        function onGlobalKeyPrress(){
            // try{
            //     var input_key = new InputEvent(node.keyboard);
            //     var keyboard = new InputEvent.Keyboard(input_key);
            // }
            // catch(err){
            //     node.error(err.message)
            // }

            // keyboard.on('keyup', function(data){
            //     let key_code =String(data.code);
            //     let key_str = code_keybord[key_code];
            //     if (typeof(key_str)!== 'undefined'){
            //         // console.log(code_keybord[key_code]);
            //         var message = {
            //                 payload: {
            //                     "key": key_str
            //                 }
            //             };
            //         node.send(message);
            //     }
            // });
            if(node.keyboard){
                console.log('Keyboard')
                try{
                    var inputKeyboard = new InputEvent(node.keyboard);
                    var keyboard = new InputEvent.Keyboard(inputKeyboard);

                    keyboard.on('keyup', function(data){
                        let key_code =String(data.code);
                        let key_str = code_keybord[key_code];
                        if (typeof(key_str)!== 'undefined'){
                            // console.log(code_keybord[key_code]);
                            var message = {
                                    payload: {
                                        "keyboard": key_str
                                    }
                                };
                            node.send(message);
                        }
                    });
                }catch(err){
                    node.error(err.message)
                }
            }
            if(node.barcode){
                console.log('Barcode')
                try{
                    var inputBarcode = new InputEvent(node.barcode);
                    var barcode = new InputEvent.Keyboard(inputBarcode);

                    barcode.on('keyup', function(data){
                        let key_code =String(data.code);
                        let key_str = code_keybord[key_code];
                        if (typeof(key_str)!== 'undefined'){
                            // console.log(code_keybord[key_code]);
                            var message = {
                                    payload: {
                                        "barcode": key_str
                                    }
                                };
                            node.send(message);
                        }
                    });
                }catch(err){
                    node.error(err.message)
                }   
            }
        };

        node.on('input', function(msg) {
            if(msg.payload == "stop"){
                stopCapturing();
                keypressNodes--;
            }
        });

        function stopCapturing(log) {
            process.stdin.removeListener('InputEvent', onGlobalKeyPrress);
            // Skip removing of keypress capturing when there is another node of this type
            if(keypressNodes > 1) {
              return;
            }
      
            if(process.stdout.isTTY) {
              process.stdin.setRawMode(false);
            }
            process.stdin.pause();
            node.log('Stopped keypress capturing');
          }

        node.on('close', function() {
            stopCapturing();
            keypressNodes--;
          });
    }
    RED.nodes.registerType("globalkeypress",globalKeypressNodes);
}
