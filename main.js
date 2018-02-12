var windows = [];

windows.push(new webWindow(40, 40, 400, 400, "Little Tundra", "https://littletundra.ddns.net"));
windows.push(new webWindow(680, 80, 400, 200, "JS Craft", "https://littletundra.ddns.net/jscraft"));

var win_active = null;

var popPos = {
    x : 0,
    y : 0
};

mouse.onClick.push((function() {
    for(var i=0; i<windows.length; ++i) {
	if(windows[i].inBar(mouse.x, mouse.y)) {
	    console.log("Window clicked " + windows[i].name);
	    
	    win_active = windows[i];
	    win_active.setFrozen(true);
	    popPos.x = (mouse.x - (windows[i].x - 4));
	    popPos.y = (mouse.y - (windows[i].y - 25));
	    break;
	}
    }
}));

mouse.onPop.push((function() {
    win_active.setFrozen(false);
    win_active = null;
}));

mouse.onMove.push((function() {
    if(win_active != null) {	
	win_active.setPos(mouse.x - popPos.x,
			  mouse.y + popPos.y);
    }
}));
