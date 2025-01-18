// Edit variables
const DoLE = {
	"el": {
		"toggle":null,
		"menu":null,
		"tablist":null,
		"tab":[],
		"content":[],
		"debt":null
	},
	"inputs": {
		"debt":null
	},
	"rentmoney":SugarCube.State.variables.rentmoney,
	"pain":SugarCube.State.variables.pain,
	"arousal":SugarCube.State.variables.arousal,
	"tiredness":SugarCube.State.variables.tiredness,
	"stress":SugarCube.State.variables.stress,
	"trauma":SugarCube.State.variables.trauma,
	"control":SugarCube.State.variables.control,
	"bodyliquid":SugarCube.State.variables.player.bodyliquid,
	"TFChange":5
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
DoLE.el.menu.setAttribute("style","display:block; position:fixed; right:6em; bottom:0em; width:101em; height:20em; line-height:1.5em; text-align:left;");
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
DoLE.el.tab.push(document.createElement("button"));
DoLE.el.tab[0].setAttribute("class","link-internal macro-button tab-selected");
DoLE.el.tab[0].setAttribute("type","button");
DoLE.el.tab[0].setAttribute("role","button");
DoLE.el.tab[0].setAttribute("tabindex","0");
DoLE.el.tab[0].setAttribute("onclick","DoLSwitchTab(0)");
DoLE.el.tab[0].appendChild(document.createTextNode("Game"));
DoLE.el.tablist.appendChild(DoLE.el.tab[0]);

DoLE.el.tab.push(document.createElement("button"));
DoLE.el.tab[1].setAttribute("class","link-internal macro-button");
DoLE.el.tab[1].setAttribute("type","button");
DoLE.el.tab[1].setAttribute("role","button");
DoLE.el.tab[1].setAttribute("tabindex","0");
DoLE.el.tab[1].setAttribute("onclick","DoLSwitchTab(1)");
DoLE.el.tab[1].appendChild(document.createTextNode("Stats"));
DoLE.el.tablist.appendChild(DoLE.el.tab[1]);

DoLE.el.tab.push(document.createElement("button"));
DoLE.el.tab[2].setAttribute("class","link-internal macro-button");
DoLE.el.tab[2].setAttribute("type","button");
DoLE.el.tab[2].setAttribute("role","button");
DoLE.el.tab[2].setAttribute("tabindex","0");
DoLE.el.tab[2].setAttribute("onclick","DoLSwitchTab(2)");
DoLE.el.tab[2].appendChild(document.createTextNode("Body"));
DoLE.el.tablist.appendChild(DoLE.el.tab[2]);

// Close button
let DoLEClose = document.createElement("div");
DoLEClose.setAttribute("class","customOverlayClose");
DoLEClose.setAttribute("onclick","DoLCloseMenu()");
DoLEClose.setAttribute("style","top:0.8rem");
DoLEClose.setAttribute("onclick","DoLCloseMenu()");
DoLE.el.tablist.appendChild(DoLEClose);

// Content
DoLE.el.content[0] = document.createElement("div");
DoLE.el.content[0].setAttribute("style","position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);");
DoLE.el.menu.appendChild(DoLE.el.content[0]);

let DoLETable = document.createElement("table");
DoLETable.setAttribute("style","border-top:1px solid white; border-right:1px solid white; width:100%;");
DoLE.el.content[0].appendChild(DoLETable);

let DoLETBody = document.createElement("tbody");
DoLETable.appendChild(DoLETBody);

let DoLETR = document.createElement("tr");
DoLETR.setAttribute("style","border-bottom:1px solid white;");
DoLETBody.appendChild(DoLETR);

// Bailey's debt
let DoLEDebtTD = document.createElement("td");
DoLEDebtTD.setAttribute("style","border-left:1px solid white; width:40%;");
DoLETR.appendChild(DoLEDebtTD);

DoLE.inputs.debt = document.createElement("input");
DoLE.inputs.debt.setAttribute("name","DoLEDebt");
DoLE.inputs.debt.setAttribute("type","text");
DoLE.inputs.debt.setAttribute("inputmode","text");
DoLE.inputs.debt.setAttribute("tabindex","0");
DoLE.inputs.debt.setAttribute("class","macro-textbox");
DoLE.inputs.debt.setAttribute("style","width:5%; min-width:3em;");
DoLE.inputs.debt.setAttribute("placeholder",-Math.abs(SugarCube.State.variables.rentmoney*0.01));
DoLEDebtTD.appendChild(DoLE.inputs.debt);

let DoLEDebtB = document.createElement("button");
DoLEDebtB.setAttribute("style","padding:0.3em;");
DoLEDebtB.setAttribute("onclick","DoLSetDebt()");
DoLEDebtTD.appendChild(DoLEDebtB);
DoLEDebtB.appendChild(document.createTextNode("Debt"));

DoLE.el.content[1] = document.createElement("div");
DoLE.el.content[1].setAttribute("class","hidden");
DoLE.el.content[1].setAttribute("style","position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);");
DoLE.el.menu.appendChild(DoLE.el.content[1]);

DoLE.el.content[2] = document.createElement("div");
DoLE.el.content[2].setAttribute("class","hidden");
DoLE.el.content[2].setAttribute("style","position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);");
DoLE.el.menu.appendChild(DoLE.el.content[2]);

// Clean Body
let cbbutton = document.createElement("button");

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
	DoLE.rentmoney = SugarCube.State.variables.rentmoney;

	// Set the value to the input if a value was provided, otherwise just invert the debt.
	if(val!=0){
		SugarCube.State.variables.rentmoney=val;
	} else {
		SugarCube.State.variables.rentmoney=DoLE.rentmoney;
	}
	
	alert("Bailey Debt: £"+(DoLE.rentmoney*0.01)+" is now £"+(SugarCube.State.variables.rentmoney*0.01));
}
