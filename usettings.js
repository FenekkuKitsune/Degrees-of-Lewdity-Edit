// Edit variables
const DoLE = {
	"el": {
		"toggle":null,
		"menu":null,
		"tablist":null,
		"tab":[],
		"content":[]
	},
	"inputs": {
		"debt":null
	}
};

// Create button, copy base game UI, but position it in the bottom right.
DoLE.el.toggle = document.createElement("button");
DoLE.el.toggle.setAttribute("class","link-internal macro-button");
DoLE.el.toggle.setAttribute("style","position:fixed; right:0em; bottom:0em; max-width:initial; width:5em;");
DoLE.el.toggle.setAttribute("type","button");
DoLE.el.toggle.setAttribute("role","button");
DoLE.el.toggle.setAttribute("tabindex","0");
DoLE.el.toggle.setAttribute("onclick","DoLOpenMenu()");
DoLE.el.toggle.appendChild(document.createTextNode("DoLEdit"));
document.body.appendChild(DoLE.el.toggle);

// Create menu
DoLE.el.menu = document.createElement("div");
DoLE.el.menu.setAttribute("style","display:block; position:fixed; right:6em; bottom:0em; width:50em; height:20em; line-height:1.5em; text-align:left;");
DoLE.el.menu.setAttribute("class","hidden");
document.body.appendChild(DoLE.el.menu);

// Title bar
let DoLETitleBar = document.createElement("div");
DoLETitleBar.setAttribute("style","display:flex; flex-wrap:wrap; align-items:center; padding:0.5rem; padding-bottom:0;");
DoLE.el.menu.appendChild(DoLETitleBar);

// Tab list
DoLE.el.tablist = document.createElement("div");
DoLE.el.tablist.setAttribute("class","tab");
DoLETitleBar.appendChild(DoLE.el.tablist);

// Tabs
for(let i=0; i<4; i++){
	DoLE.el.tab.push(document.createElement("button"));
	DoLE.el.tab[i].setAttribute("class","link-internal macro-button");
	DoLE.el.tab[i].setAttribute("type","button");
	DoLE.el.tab[i].setAttribute("role","button");
	DoLE.el.tab[i].setAttribute("tabindex","0");
	DoLE.el.tab[i].setAttribute("onclick","DoLSwitchTab("+i+")");
	DoLE.el.tablist.appendChild(DoLE.el.tab[i]);
}
// First tab is always selected initially
DoLE.el.tab[0].classList.add("tab-selected");

// Tab names
DoLE.el.tab[0].appendChild(document.createTextNode("Game"));
DoLE.el.tab[1].appendChild(document.createTextNode("Stats"));
DoLE.el.tab[2].appendChild(document.createTextNode("Body"));
DoLE.el.tab[3].appendChild(document.createTextNode("Social"));

// Close button
let DoLEClose = document.createElement("div");
DoLEClose.setAttribute("class","customOverlayClose");
DoLEClose.setAttribute("onclick","DoLCloseMenu()");
DoLEClose.setAttribute("style","top:0.8rem");
DoLEClose.setAttribute("onclick","DoLCloseMenu()");
DoLE.el.tablist.appendChild(DoLEClose);

// Content
for(let i=0; i<4; i++){
	DoLE.el.content[i] = document.createElement("div");
	DoLE.el.content[i].classList.add("hidden");
	DoLE.el.content[i].setAttribute("style","position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);");
	DoLE.el.menu.appendChild(DoLE.el.content[i]);
}
// First tab is always selected initially
DoLE.el.content[0].classList.remove("hidden");

// Tab 1
let DoLETable = document.createElement("table");
DoLETable.setAttribute("style","border-top:1px solid white; border-right:1px solid white; width:100%;");
DoLE.el.content[0].appendChild(DoLETable);

let DoLETBody = document.createElement("tbody");
DoLETable.appendChild(DoLETBody);

let DoLETR = document.createElement("tr");
DoLETR.setAttribute("style","border-bottom:1px solid white;");
DoLETBody.appendChild(DoLETR);

// Bailey's debt
let DoLETD = document.createElement("td");
DoLETD.setAttribute("style","border-left:1px solid white; width:40%;");
DoLETR.appendChild(DoLETD);

DoLE.inputs.debt = document.createElement("input");
DoLE.inputs.debt.setAttribute("name","DoLEDebt");
DoLE.inputs.debt.setAttribute("type","text");
DoLE.inputs.debt.setAttribute("inputmode","text");
DoLE.inputs.debt.setAttribute("tabindex","0");
DoLE.inputs.debt.setAttribute("class","macro-textbox");
DoLE.inputs.debt.setAttribute("style","width:5%; min-width:3em;");
DoLE.inputs.debt.setAttribute("placeholder",-Math.abs(SugarCube.State.variables.rentmoney*0.01));
DoLETD.appendChild(DoLE.inputs.debt);

let DoLEButton = document.createElement("button");
DoLEButton.setAttribute("style","padding:0.3em;");
DoLEButton.setAttribute("onclick","DoLSetDebt()");
DoLETD.appendChild(DoLEButton);
DoLEButton.appendChild(document.createTextNode("Debt"));

// Tab 2


// Tab 3
DoLETable = document.createElement("table");
DoLETable.setAttribute("style","border-top:1px solid white; border-right:1px solid white; width:100%;");
DoLE.el.content[2].appendChild(DoLETable);

DoLETBody = document.createElement("tbody");
DoLETable.appendChild(DoLETBody);

DoLETR = document.createElement("tr");
DoLETR.setAttribute("style","border-bottom:1px solid white");
DoLETBody.appendChild(DoLETR);

// Clean Body
DoLETD = document.createElement("td");
DoLETD.setAttribute("style","border-left:1px solid white; width:40%;");
DoLETR.appendChild(DoLETD);

// In Future: Specify levels to set body clean states
DoLEButton = document.createElement("button");
DoLEButton.setAttribute("style","padding:0.3em;");
DoLEButton.setAttribute("onclick","DoLCleanBody()");
DoLETD.appendChild(DoLEButton);
DoLEButton.appendChild(document.createTextNode("Clean Body"));

function DoLOpenMenu(){
	// Reveal the overlay
	DoLE.el.menu.classList.remove("hidden");

	// Change the function on the button to close instead of open
	DoLE.el.toggle.setAttribute("onclick","DoLCloseMenu()");

	// Highlight the button
	DoLE.el.toggle.classList.add("macro-button-selected");
}

function DoLCloseMenu(){
	// Hide the overlay
	DoLE.el.menu.classList.add("hidden");

	// Set the button back to open
	DoLE.el.toggle.setAttribute("onclick","DoLOpenMenu()");

	// Remove the button highlight
	DoLE.el.toggle.classList.remove("macro-button-selected");
}

function DoLSwitchTab(tab){
	let tabs = DoLE.el.tab;
	let contents = DoLE.el.content;

	for(let i=0; i<tabs.length; i++){
		if(i!==tab){
			tabs[i].classList.remove("tab-selected");
			contents[i].setAttribute("class","hidden");
		} else{
			tabs[i].classList.add("tab-selected");
			contents[i].setAttribute("class","");
		}
	}
}

function DoLSetDebt(){
	let val = DoLE.inputs.debt.value*100;
	let debt = SugarCube.State.variables.rentmoney;

	// Set the value to the input if a value was provided, otherwise just invert the debt.
	if(val!=0){
		SugarCube.State.variables.rentmoney=val;
	} else {
		SugarCube.State.variables.rentmoney=-Math.abs(SugarCube.State.variables.rentmoney);
	}
	
	alert("Bailey Debt: £"+(debt*0.01)+" is now £"+(SugarCube.State.variables.rentmoney*0.01));
}

function DoLCleanBody(){
	// let bl = SugarCube.State.variables.player.bodyliquid;

	// Set all body liquids to 0, which cleans the player of all external liquids.
	for(let area in SugarCube.State.variables.player.bodyliquid){
		// Set each value individually. This is purely so we can avoid issues if future game updates add other liquids.
		SugarCube.State.variables.player.bodyliquid[area].goo=0;
		SugarCube.State.variables.player.bodyliquid[area].semen=0;
		SugarCube.State.variables.player.bodyliquid[area].nectar=0;
	}
	
	alert("Body cleaned of all external liquids");
}
