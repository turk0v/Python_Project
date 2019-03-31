var SEND_INTERVAL = 3000; // interval 
var CAPTURE_INTERVAL = 30;  // interval of capturing a mouse event
var MAX_SAVED = (1000/CAPTURE_INTERVAL) * (SEND_INTERVAL/1000);
var CHUNK_TYPE_MOUSE = 0
var CHUNK_TYPE_KEYBOARD = 1

function add_chunk_mouse(e) {
	moment= new Date();
	return({
		type: CHUNK_TYPE_MOUSE,
		minutes:moment.getMinutes(),
		seconds:moment.getSeconds(),
		miliseconds:moment.getMilliseconds(),
		mousePlace: {
			positionX: e.clientX,
			positionY: e.clientY
		}
	})
}
function built_key_chunk(event) {
	moment= new Date();
	return({
		type:CHUNK_TYPE_KEYBOARD,
		minutes:moment.getMinutes(),
		seconds:moment.getSeconds(),
		miliseconds:moment.getMilliseconds(),
		keypress: event.key,
		shiftPress:event.shiftKey,
		ctrlPress:event.ctrlKey,
	})
}

var mouseCache = {
	saved:[],
	cacheFull:false,
	clear: function() {
		this.saved = []
	},
	add:function(income) {
		if (this.saved.length == MAX_SAVED){
			console.log(this.saved)
			this.cacheFull == true //TODO cacheFULL flag
			this.saved = []
			}
		this.saved.push(income)
	}
}

onmousemove = function(){mouseCache.add(add_chunk_mouse(event))}


document.addEventListener("keypress", function onPress(event) {
	if (event.key) {
		keyBoardCache.add(built_key_chunk(event))
	}
});
var keyBoardCache = {
	saved:[],
	cacheFull:false,//TODO cacheFULL flag
	clear: function() {
		this.saved = []
	},
	add:function(income) {
		this.saved.push(income)
	}
}
setInterval(function() {console.log(keyBoardCache.saved);keyBoardCache.saved=[]},3000)