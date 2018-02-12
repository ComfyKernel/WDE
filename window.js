var mouse = {
    x : 0,
    y : 0,

    active : false,

    onClick : [],
    onPop   : [],
    onMove  : []
};

(function() {
    document.onmousemove = (function(event) {	
	mouse.x = event.pageX;
	mouse.y = event.pageY;

	for(var i=0; i<mouse.onMove.length; ++i) {
	    mouse.onMove[i]();
	}
    });

    document.onmousedown = (function(event) {
	mouse.active = true;
	
	for(var i=0; i<mouse.onClick.length; ++i) {
	    mouse.onClick[i]();
	}
    });

    document.onmouseup   = (function(event) {
	mouse.active = false;

	for(var i=0; i<mouse.onPop.length; ++i) {
	    mouse.onPop[i]();
	}
    });
})();

class webWindow {
    constructor(x, y, w, h, t, u) {
	this.create(x, y, w, h, t, u);
    }

    create(x, y, w, h, t, u) {
	this.x = x;
	this.y = y;
	this.width  = w;
	this.height = h;

	this.url = u;

	this.name   = t;

	this.element = document.getElementById("example-window").cloneNode(true);
	this.element.id = t;
	this.element.style.display = "block";
	
	this.element.style.left = this.x + "px";
	this.element.style.top  = this.y + "px";

	this.element.style.width  = this.width  + "px";
	this.element.style.height = this.height + "px";

	this.element.querySelector(".window-border-top").innerHTML = t;
	this.element.querySelector(".window-frame").src = u;
	
	document.getElementById("environment").appendChild(this.element);
    }

    inBar(x, y) {
	return (x > this.x - 4 &&
		y > this.y - 25 &&
		x < this.x + this.width + 4 &&
		y < this.y);
    }

    setPos(x, y) {
	this.x = x;
	this.y = y;

	this.element.style.left = (x + "px");
	this.element.style.top  = (y + "px");
    }

    setFrozen(f) {
	if(f) {
	    this.element.querySelector(".window-frame").style.pointerEvents = "none";
	} else {
	    this.element.querySelector(".window-frame").style.pointerEvents = "auto";
	}
    }
}
