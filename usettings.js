// Edit variables
const DoLEdit = {
	"menu": {
		"button":null,
		"container":null,
		"overlay":null,
		"title":null,
		"content":null,
		"tablist":null,
		"tab":null,
		"closebutton":null,
		"inputs": {
			"debt":null
		}
	},
	"native": {
		menubuttons:Array(),
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

// Grab the normal buttons so we can disable/enable them as needed
let buttons = document.getElementsByClassName("macro-button");
for(let i=0; i<8; i++){
	DoLEdit.native.menubuttons.push(buttons[i]);
}

// Create button, copy base game UI
DoLEdit.menu.button = document.createElement("button");
DoLEdit.menu.button.setAttribute("class","link-internal macro-button");
DoLEdit.menu.button.setAttribute("type","button");
DoLEdit.menu.button.setAttribute("role","button");
DoLEdit.menu.button.setAttribute("tabindex","0");
DoLEdit.menu.button.setAttribute("onclick","DoLOpenMenu()");
DoLEdit.menu.button.appendChild(document.createTextNode("DoLEdit"));
document.getElementById("overlayButtons").appendChild(DoLEdit.menu.button);

// Copy the original overlay. Create a duplicate to not interfere with existing game systems.
DoLEdit.menu.container = document.createElement("div");
// We don't want to duplicate the ID, so we use our own and inherit the styles
DoLEdit.menu.container.setAttribute("id","DoLEditMenu")
DoLEdit.menu.container.setAttribute("style","position:fixed; z-index:999; top:0; right:0; width:-webkit-calc(100% - 17.6em); width:-moz-calc(100% - 17.6em); width:calc(100% - 17.6em); height:100%; pointer-events:all; backdrop-filter:blur(3px);");
DoLEdit.menu.container.setAttribute("class","customOverlayContainer no-numberify hidden");
//DoLEdit.menu.container.setAttribute("onclick","DoLCloseMenu()");

DoLEdit.menu.overlay = document.createElement("div");
DoLEdit.menu.overlay.setAttribute("style","display:block; position:absolute; z-index:1000; top:10px; right:10px; bottom:10px; left:10px; width:auto; max-width:1000px; height:auto; line-height:1.5em; text-align:left;");
DoLEdit.menu.overlay.setAttribute("class","customOverlay hidden");
DoLEdit.menu.container.appendChild(DoLEdit.menu.overlay);

DoLEdit.menu.title = document.createElement("div");
DoLEdit.menu.title.setAttribute("style","display:flex; flex-wrap:wrap; align-items:center; padding:0.5rem; padding-bottom:0;");
DoLEdit.menu.overlay.appendChild(DoLEdit.menu.title);

DoLEdit.menu.content = document.createElement("div");
DoLEdit.menu.content.setAttribute("style","position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);");
DoLEdit.menu.overlay.appendChild(DoLEdit.menu.content);

DoLEdit.menu.tablist = document.createElement("div");
DoLEdit.menu.tablist.setAttribute("class","tab");
DoLEdit.menu.title.appendChild(DoLEdit.menu.tablist);

DoLEdit.menu.tab = document.createElement("button");
DoLEdit.menu.tab.setAttribute("class","link-internal macro-button tab-selected");
DoLEdit.menu.tab.setAttribute("type","button");
DoLEdit.menu.tab.setAttribute("role","button");
DoLEdit.menu.tab.setAttribute("tabindex","0");
DoLEdit.menu.tab.appendChild(document.createTextNode("DoLEdit"));
DoLEdit.menu.tablist.appendChild(DoLEdit.menu.tab);

DoLEdit.menu.closebutton = document.createElement("div");
DoLEdit.menu.closebutton.setAttribute("class","customOverlayClose");
DoLEdit.menu.closebutton.setAttribute("onclick","DoLCloseMenu()");
DoLEdit.menu.closebutton.setAttribute("style","top:0.8rem");
DoLEdit.menu.closebutton.setAttribute("onclick","DoLCloseMenu()");
DoLEdit.menu.tablist.appendChild(DoLEdit.menu.closebutton);

// Content for the overlay
let table = document.createElement("table");
table.setAttribute("style","border-top:1px solid white; border-right:1px solid white; width:100%;");
DoLEdit.menu.content.appendChild(table);

let tbody = document.createElement("tbody");
table.appendChild(tbody);

let tr = document.createElement("tr");
tr.setAttribute("style","border-bottom:1px solid white;");
tbody.appendChild(tr);

let debttd = document.createElement("td");
debttd.setAttribute("style","border-left:1px solid white; width:40%;");
tr.appendChild(debttd);

DoLEdit.menu.inputs.debt = document.createElement("input");
DoLEdit.menu.inputs.debt.setAttribute("name","DoLEditDebt");
DoLEdit.menu.inputs.debt.setAttribute("type","text");
DoLEdit.menu.inputs.debt.setAttribute("inputmode","text");
DoLEdit.menu.inputs.debt.setAttribute("tabindex","0");
DoLEdit.menu.inputs.debt.setAttribute("class","macro-textbox");
DoLEdit.menu.inputs.debt.setAttribute("style","width:5%; min-width:3em;");
DoLEdit.menu.inputs.debt.setAttribute("placeholder",-Math.abs(SugarCube.State.variables.rentmoney*0.01));
debttd.appendChild(DoLEdit.menu.inputs.debt);

let debtbutton = document.createElement("button");
debtbutton.setAttribute("style","padding:0.3em;");
debtbutton.setAttribute("onclick","DoLSetDebt()");
debttd.appendChild(debtbutton);
debtbutton.appendChild(document.createTextNode("Debt"));

// Place the new overlay below the old one
document.getElementsByClassName("passage")[0].appendChild(DoLEdit.menu.container);


function DoLOpenMenu(){
	// Close the normal game menu.
	closeOverlay();
	
	// Disable the other buttons so we can't open the normal menu
	for(let i=0; i<DoLEdit.native.menubuttons.length; i++){
		DoLEdit.native.menubuttons[i].setAttribute("disabled","true");
		DoLEdit.native.menubuttons[i].classList.remove("macro-button-selected");
	}

	// Reveal the overlay
	DoLEdit.menu.container.classList.remove("hidden");
	DoLEdit.menu.overlay.classList.remove("hidden");

	// Change the function on the button to close instead of open
	DoLEdit.menu.button.setAttribute("onclick","DoLCloseMenu()");

	// Highlight the button
	DoLEdit.menu.button.classList.add("macro-button-selected");
}

function DoLCloseMenu(){
	// Re-enable the other buttons
	for(let i=0; i<DoLEdit.native.menubuttons.length; i++){
		DoLEdit.native.menubuttons[i].removeAttribute("disabled");
	}
	
	// Hide the overlay
	DoLEdit.menu.container.classList.add("hidden");
	DoLEdit.menu.overlay.classList.add("hidden");

	// Set the button back to open
	DoLEdit.menu.button.setAttribute("onclick","DoLOpenMenu()");

	// Remove the button highlight
	DoLEdit.menu.button.classList.remove("macro-button-selected");
}

function DoLSetDebt(){
	let val = DoLEdit.menu.inputs.debt.value*100;
	DoLEdit.rentmoney = SugarCube.State.variables.rentmoney;

	// Set the value to the input if a value was provided, otherwise just invert the debt.
	if(val!=0){
		SugarCube.State.variables.rentmoney=val;
	} else {
		SugarCube.State.variables.rentmoney=DoLEdit.rentmoney;
	}
	
	alert("Bailey Debt: £"+(DoLEdit.rentmoney*0.01)+" is now £"+(SugarCube.State.variables.rentmoney*0.01));
}