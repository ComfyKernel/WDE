var windows = [];

windows.push(new webWindow(40, 40, 400, 400, "Little Tundra", "https://littletundra.ddns.net"));
windows.push(new webWindow(680, 80, 400, 200, "JS Craft", "https://littletundra.ddns.net/jscraft"));

function newWindow() {
    windows.push(new webWindow(40, 40, 400, 400,
			       document.getElementById("w-name").value,
			       document.getElementById("w-name").value));
}

var win_active = null;

var win_state  = "none";

var popPos = {
    x : 0,
    y : 0
};

var popSize = {
    w : 0,
    h : 0
};

mouse.onClick.push((function() {
    for(var i=0; i<windows.length; ++i) {
	windows[i].element.style.zIndex = 100;
	
	if(windows[i].inBar(mouse.x, mouse.y)) {
	    windows[i].element.style.zIndex = 9999;
	    
	    win_active = windows[i];
	    win_active.setFrozen(true);
	    popPos.x = (mouse.x - (windows[i].x - 4));
	    popPos.y = (mouse.y - (windows[i].y - 25));

	    win_state = "drag";
	    
	    break;
	} else {
	    if(windows[i].gibRight(mouse.x, mouse.y)) {
		windows[i].element.style.zIndex = 9999;
		
		win_active = windows[i];
		win_active.setFrozen(true);
		popPos.x = (mouse.x - windows[i].x);
		popPos.y = (mouse.y - windows[i].y);
		
		win_state = "size-right";
	    
		break;
	    }

	    if(windows[i].gibLeft(mouse.x, mouse.y)) {
		windows[i].element.style.zIndex = 9999;
		
		win_active = windows[i];
		win_active.setFrozen(true);
		popPos.x  = (windows[i].x);
		popPos.y  = (windows[i].y);
		popSize.w = (windows[i].width);
		
		win_state = "size-left";
		
		break;
	    }

	    if(windows[i].gibDown(mouse.x, mouse.y)) {
		windows[i].element.style.zIndex = 9999;
		
		win_active = windows[i];
		win_active.setFrozen(true);
		popPos.x  = (windows[i].x);
		popPos.y  = (windows[i].y);
		popSize.h = (windows[i].height);
		
		win_state = "size-down";
		
		break;
	    }
	}
    }
}));

mouse.onPop.push((function() {
    if(win_active != null) {
	win_active.setFrozen(false);
	
	win_active.element.style.zIndex = 100;
	
	win_active = null;
    }
}));

mouse.onMove.push((function() {
    if(win_active != null) {
	switch(win_state) {
	case "drag":
	    win_active.setPos(mouse.x - popPos.x,
			      mouse.y + popPos.y);
	    break;
	case "size-right":
	    win_active.setSize(mouse.x - win_active.x,
			       win_active.height);
	    break;
	case "size-left":
	    win_active.setPos (mouse.x,
			       win_active.y);
	    win_active.setSize(popSize.w + (popPos.x - mouse.x),
			       win_active.height);
	    break;
	case "size-down":
	    win_active.setSize(win_active.width,
			       mouse.y - popPos.y);
	    break;
	}
    }
}));
