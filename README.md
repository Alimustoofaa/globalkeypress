# node-red-contrib-keypress
A [Node-RED](http://nodered.org) node capturing keypress input in terminal

## Install
Run the following command in your Node-RED user directory - typically `~/.node-red`
```
1. clone this repository
2. navigate to directory  ./node-red 
3. npm install {position clone directory}
```

## Sample node messages
```
{
	"keyboard": "1"
}
```
```
{
	"barcode": "2"
}
```

## Keys mapping
Keypress Node supports following sample keys mapping:
```
{
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

```
If you do not specify input key, add your key code in globalkeypress/globalkeypress.js in variable code_keybord
```
{
    "code":"key"
}
```
