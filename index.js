const InputEvent = require('input-event');
 
const input = new InputEvent('/dev/input/event5');
const keyboard = new InputEvent.Keyboard(input);


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

keyboard.on('keyup', function(data){
    let key_code =String(data.code);
    let key_str = code_keybord[key_code];
    console.log(data)
    if (typeof(key_str)!== 'undefined'){
        console.log(code_keybord[key_code]);
    }
});
