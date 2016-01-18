//******************* Login registered ************************//
if (typeof localStorage !== 'undefined') {
  // Value taken back from the web storage
    var user = localStorage.getItem('username');
    if (user === null) {
        user = 'Guest';
    }
  // Display in the page
    document.getElementById('username').innerHTML = user;
} else {
    alert("localStorage is not supported");
}
//******************* Drawing tools *****************************//
function change() {
	select = document.getElementById("selColor");
	select_s = select.style;
	 
	switch(select.selectedIndex) {
	case 0:
		select_s.background = "url('imgs/turquoise.png') no-repeat";
	    break;
	case 1:
		select_s.background = "url('imgs/emerald.png') no-repeat";
	    break;
	case 2:
		select_s.background = "url('imgs/peterriver.png') no-repeat";
	    break;
	case 3:
		select_s.background = "url('imgs/amethyst.png') no-repeat";
	    break;
	case 4:
		select_s.background = "url('imgs/wetasphalt.png') no-repeat";
	    break;
	case 5:
		select_s.background = "url('imgs/sunflower.png') no-repeat";
	    break;
	case 6:
		select_s.background = "url('imgs/carrot.png') no-repeat";
	    break;
	case 7:
		select_s.background = "url('imgs/alizarin.png') no-repeat";
	    break;
	case 8:
		select_s.background = "url('imgs/pomegranate.png') no-repeat";
	    break;
	case 9:
		select_s.background = "url('imgs/brown.png') no-repeat";
	    break;
	case 10:
		select_s.background = "url('imgs/clouds.png') no-repeat";
	    break;
	case 11:
		select_s.background = "url('imgs/concrete.png') no-repeat";
	    break;
	case 12:
		select_s.background = "url('imgs/kuro.png') no-repeat";
	    break;
	default:
		select_s.background = "url('imgs/turquoise.png') no-repeat";
	    break;
	}
}


function changeWidth() {
	select = document.getElementById("selWidth");
	select_s = select.style;
	 
	switch(select.selectedIndex) {
	case 0 :
		select_s.background = "url('imgs/size1.png') no-repeat";
	break;
	case 1 :
		select_s.background = "url('imgs/size2.png') no-repeat";
	break;
	case 2 :
		select_s.background = "url('imgs/size3.png') no-repeat";
	break;	
	case 3 :
		select_s.background = "url('imgs/size4.png') no-repeat";
	break;	
	case 4 :
		select_s.background = "url('imgs/size5.png') no-repeat";
	break;
	default:
		select_s.background = "url('imgs/size1.png') no-repeat";
	break;
	}
}

//******************* Drawing ***********************************//
init_sketch();
function init_sketch(){
	var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	var sketch = document.querySelector('#canvas-container');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));
	var tool = 'brush';
	$('#tools button').on('click', function () {
		tmp_canvas.style.display = 'block';
		tool = $(this).attr('id');
		console.log(tool);

	});
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;

	sketch.appendChild(tmp_canvas);


	var mouse = {
		x: 0,
		y: 0
	};
	var start_mouse = {
		x: 0,
		y: 0
	};
	var last_mouse = {
		x: 0,
		y: 0
	};
    
	/* Mouse Capturing Work */
	tmp_canvas.addEventListener('mousemove', function (e) {

		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);


	/* Drawing on Paint App */
	tmp_canvas.addEventListener('mousedown', function (e) {

		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;

		if (tool == 'line') {
			tmp_canvas.addEventListener('mousemove', onLinePaint, false);
			onLinePaint();
		} else if (tool == 'rectangle') {
			tmp_canvas.addEventListener('mousemove', onRectPaint, false);
			onRectPaint();
		} else if (tool == 'brush') {
			tmp_canvas.addEventListener('mousemove', onBrushPaint, false);
            onBrushPaint();
		} else if (tool == 'circle') {
			tmp_canvas.addEventListener('mousemove', onCirclePaint, false);
			onCirclePaint();
		} else if (tool == 'eraser') {
			tmp_canvas.addEventListener('mousemove', onErase, false);
			onErase();
		}


	}, false);

	tmp_canvas.addEventListener('mouseup', function () {
		tmp_canvas.removeEventListener('mousemove', onLinePaint, false);
		tmp_canvas.removeEventListener('mousemove', onRectPaint, false);
		tmp_canvas.removeEventListener('mousemove', onBrushPaint, false);
		tmp_canvas.removeEventListener('mousemove', onCirclePaint, false);
        tmp_canvas.removeEventListener('mousemove', onErase, false);
		///////////////////////////////////////////////////////
        

	
		// Writing down to real canvas now
		ctx.drawImage(tmp_canvas, 0, 0);
		// Clearing tmp canvas
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		ppts = [];


	}, false);
	canvas.addEventListener('mousemove', function (e) {
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);

	canvas.addEventListener('mousedown', function (e) {
		canvas.addEventListener('mousemove', onErase, false);

		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

		ppts.push({
			x: mouse.x,
			y: mouse.y
		});

		onErase();
	}, false);

	canvas.addEventListener('mouseup', function () {
		canvas.removeEventListener('mousemove', onErase, false);

		// Emptying up Pencil Points
		ppts = [];
	}, false);


    
	var onErase = function () {
        ppts.push({
			x: mouse.x,
			y: mouse.y
		});

		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.lineWidth = $('#selWidth').val();
			tmp_ctx.lineJoin = 'round';
			tmp_ctx.lineCap = 'round';
			tmp_ctx.strokeStyle = 'white';
			tmp_ctx.fillStyle = 'white';
			tmp_ctx.beginPath();
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();

			return;
		}

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		tmp_ctx.quadraticCurveTo(
			ppts[i].x,
			ppts[i].y,
			ppts[i + 1].x,
			ppts[i + 1].y);
		tmp_ctx.stroke();    

	};
	


	var onCirclePaint = function () {
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		var x = (mouse.x + start_mouse.x) / 2;
		var y = (mouse.y + start_mouse.y) / 2;

		var radius = Math.max(
			Math.abs(mouse.x - start_mouse.x),
			Math.abs(mouse.y - start_mouse.y)) / 2;

		tmp_ctx.beginPath();
		tmp_ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		tmp_ctx.strokeStyle = $('#selColor').val();
		tmp_ctx.lineWidth = $('#selWidth').val();
		tmp_ctx.stroke();
		tmp_ctx.closePath();

	};

	var onLinePaint = function () {
		tmp_ctx.lineWidth = $('#selWidth').val();
		tmp_ctx.lineJoin = 'round';
		tmp_ctx.lineCap = 'round';
		tmp_ctx.strokeStyle = $('#selColor').val();
		tmp_ctx.fillStyle = $('#selColor').val();
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
		tmp_ctx.lineTo(mouse.x, mouse.y);
		tmp_ctx.stroke();
		tmp_ctx.closePath();

	};

	var onRectPaint = function () {
		tmp_ctx.lineWidth = $('#selWidth').val();
		tmp_ctx.lineJoin = 'round';
		tmp_ctx.lineCap = 'round';
		tmp_ctx.strokeStyle = $('#selColor').val();
		tmp_ctx.fillStyle = $('#selColor').val();
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = Math.abs(mouse.y - start_mouse.y);
		tmp_ctx.strokeRect(x, y, width, height);

	};

	// Pencil Points
	var ppts = [];

	var onBrushPaint = function () {

		ppts.push({
			x: mouse.x,
			y: mouse.y
		});

		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.lineWidth = $('#selWidth').val();
			tmp_ctx.lineJoin = 'round';
			tmp_ctx.lineCap = 'round';
			tmp_ctx.strokeStyle = $('#selColor').val();
			tmp_ctx.fillStyle = $('#selColor').val();
			tmp_ctx.beginPath();
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();

			return;
		}

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		tmp_ctx.quadraticCurveTo(
			ppts[i].x,
			ppts[i].y,
			ppts[i + 1].x,
			ppts[i + 1].y);
		tmp_ctx.stroke();

	};    
}

//*********************** clone canvas *****************************/
cloneBoard();
function cloneBoard() {
    var oldCanvas = document.querySelector('#paint');
    var cloneCanvas = document.querySelector('#show');
    var context = cloneCanvas.getContext('2d');

    //apply the old canvas to the new one
    context.drawImage(oldCanvas,0,0,250,100);
}


//*********************** DragnDrop *****************************/
window.onload = init;
function init(){

    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));

    } 
    function drag_over(event) { 
        event.preventDefault(); 
        return false; 
    } 
    function drop(event) { 
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById('dragme');
        dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        return false;
    } 
    var dm = document.getElementById('dragme');
    dm.addEventListener('dragstart',drag_start,false); 
    var canvas = document.getElementById('tmp_canvas')
    canvas.addEventListener('dragover',drag_over,false);
    canvas.addEventListener('drop',drop,false);

}

//*********************** Back to frontpage *****************************//
$('h1').click(function(){
     window.location.href = 'home.html';
});
