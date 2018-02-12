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
}
