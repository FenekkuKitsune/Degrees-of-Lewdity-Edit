// DoLEdit
const DoLE = {
	"el":{ // DOM elements that we need to keep track of
		"toggle":null, // Button to open/close the menu
		"menu":null, // The menu itself
		"tab":[], // Tabs array
		"content":[] // Content for each tab
	},
	"input":{ // R=range, T=textbox
		"game":{
			"debt":{"t":null}, // Bailey's debt
			"money":{"t":null} // Player's money
		},
		"stat":{ // Self-explanatory
			"pain":{"r":null,"t":null},
			"arousal":{"r":null,"t":null},
			"fatigue":{"r":null,"t":null},
			"stress":{"r":null,"t":null},
			"trauma":{"r":null,"t":null},
			"control":{"r":null,"t":null}
		},
		"soc":{
			"wolf":{ // Wolfpack harmony/ferocity. Displays under "Black Wolf" in the game.
				"harmony":{"r":null,"t":null},
				"ferocity":{"r":null,"t":null}
			},
		},
		"tf":{ // Self-explanatory
			"wolf":{"r":null,"t":null},
			"cat":{"r":null,"t":null},
			"cow":{"r":null,"t":null},
			"fox":{"r":null,"t":null},
			"bird":{"r":null,"t":null},
			"angel":{"r":null,"t":null},
			"fangel":{"r":null,"t":null},
			"demon":{"r":null,"t":null}
		}
	},
	"versions":{
		"game":"0.5.8.10", // Supported game version
		"DoLE":"0.20" // DoLE Version
	},
	"init":function(){ // Initialisation function
		let thisVersion = SugarCube.State.variables.saveVersions[SugarCube.State.variables.saveVersions.length-1]
		let supported = 0;

		if(this.versions.game >= thisVersion){
			// We're confirmed to support this version
			console.log("DoLEdit supports "+this.versions.game+". Game version "+thisVersion+" detected, supported.");
			supported = 1;
		} else {
			// Warn the player about the unsupported version
			// alert("This game version is not supported on DoLEdit "+this.versions.DoLE+". The last supported version is "+this.versions.game+". Please update DoLE or revert to an earlier version of Degrees of Lewdity.\nYou can still play with this version, however we cannot guarantee everything will work correctly.");
			console.warn("DoLEdit "+this.versions.DoLE+": Unsupported game version. Check https://github.com/FenekkuKitsune/Degrees-of-Lewdity-Edit for an updated version.");
			
			// We'll add exclamations to the DoLE version to indicate it's not fully supported
			this.versions.DoLE = "!"+this.versions.DoLE+"!";
		}

		// Add our stylesheet to the document head, this conveniently puts it under the usettings.js script tag.
		let DoLEStyles = this.newElement(
			"link",
			{
				"id":"DoLEStyles",
				"type":"text/css",
				"rel": "stylesheet",
				"href": "ustyles.css"
			},
			document.head
		);

		// Create the menu toggle button. Position it in the bottom right corner because it's out of the way and an unused space.
		this.el.toggle = this.newElement(
			"button",
			{
				"id":"DoLEToggle",
				"class":"link-internal macro-button", // We don't need to specify link-internal but we copy base game classes just in case
				"type":"button",
				"role":"button",
				"tabindex":"0",
				"onclick":"DoLE.toggleMenu(1)"
			},
			document.body,
			"DoLEdit\n"+this.versions.DoLE
		);
		
		// Copy the base game overlay menu pretty much 1f1. We squish it to the bottom right, again, so it's out of the way.
		this.el.menu = this.newElement(
			"div",
			{
				"id":"DoLEMenu",
				"class":"hidden"
			},
			document.body
		);

		// The title bar is where all the tabs are put. We don't need to track it because it doesn't do much.
		let DoLETitleBar = this.newElement("div", {"id":"DoLETitleBar"}, this.el.menu);

		// The tab list is a simple container that holds all the tabs and the close button. We don't need to keep track of it.
		let tablist = this.newElement("div", {"class":"tab"}, DoLETitleBar);

		// We iterate four times to create the individual tabs, and store them in a tab array.
		// Why do we iterate? Because we hate repetition!
		for(let i=0; i<4; i++){
			this.el.tab.push(this.newElement(
				"button",
				{
					"class":"link-internal macro-button",
					"type":"button",
					"role":"button",
					"tabindex":"0",
					"onclick":"DoLE.switchTab("+i+")"
				},
				tablist
			));
		
			// First tab is always selected initially
			if(i===0){
				this.el.tab[i].classList.add("tab-selected");
			}
		}

		// The close button doesn't need to be tracked.
		// Buttons have a handy onclick attribute we use for the relevant functions.
		let DoLEClose = this.newElement(
			"div",
			{
				"id":"DoLECloseButton",
				"class":"customOverlayClose",
				"onclick":"DoLE.toggleMenu(0)"
			},
			tablist
		);

		// Content
		for(let i=0; i<4; i++){
			this.el.content.push(this.newElement(
				"div",
				{"class":"dole-content"},
				this.el.menu
			));
			// First tab is always selected initially
			if(i!==0){
				this.el.content[i].classList.add("hidden");
			}
		}

		this.tab1();
		this.tab2();
		this.tab3();
		this.tab4();
	},
	"tab1":function(){ // General settings
		this.el.tab[0].appendChild(document.createTextNode("Game"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.content[0]);
		
		let DoLETBody = this.newElement("tbody", {}, DoLETable);
		
		let DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);
		
		// Bailey's debt
		let DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);
		
		this.input.game.debt.t = this.newElement(
			"input",
			{
				"name":"DoLEDebt",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"placeholder":Math.abs(SugarCube.State.variables.rentmoney)
			},
			DoLETD
		);
		
		let DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setDebt()"
			},
			DoLETD,
			"Debt"
		);

		// Player's money
		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.game.money.t = this.newElement(
			"input",
			{
				"name":"DoLEMoney",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"placeholder":Math.abs(SugarCube.State.variables.money)
			},
			DoLETD
		);

		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('money')"
			},
			DoLETD,
			"Money"
		);
	},
	"tab2":function(){ // Player stats
		this.el.tab[1].appendChild(document.createTextNode("Stats"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.content[1]);

		let DoLETBody = this.newElement("tbody", {}, DoLETable);

		let DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		// Pain
		let DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.pain.r = this.newElement(
			"input",
			{
				"name":"DoLEPainRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":"100",
				"value":Math.floor(SugarCube.State.variables.pain),
				"oninput":"DoLE.input.stat.pain.t.value = this.value",
				"onchange":"DoLE.input.stat.pain.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.pain.t = this.newElement(
			"input",
			{
				"name":"DoLEPainText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.pain),
				"oninput":"DoLE.input.stat.pain.r.value = this.value",
				"onchange":"DoLE.input.stat.pain.r.value = this.value"
			},
			DoLETD
		)
		let DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('pain')"
			},
			DoLETD,
			"Pain"
		);

		// Arousal
		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.arousal.r = this.newElement(
			"input",
			{
				"name":"DoLEArousalRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":SugarCube.State.variables.arousalmax,
				"value":Math.floor(SugarCube.State.variables.arousal),
				"oninput":"DoLE.input.stat.arousal.t.value = this.value",
				"onchange":"DoLE.input.stat.arousal.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.arousal.t = this.newElement(
			"input",
			{
				"name":"DoLEArousalText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.arousal),
				"oninput":"DoLE.input.stat.arousal.r.value = this.value",
				"onchange":"DoLE.input.stat.arousal.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('arousal')"
			},
			DoLETD,
			"Arousal"
		);

		// Fatigue
		DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.fatigue.r = this.newElement(
			"input",
			{
				"name":"DoLEFatigueRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":"2000",
				"value":Math.floor(SugarCube.State.variables.tiredness),
				"oninput":"DoLE.input.stat.fatigue.t.value = this.value",
				"onchange":"DoLE.input.stat.fatigue.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.fatigue.t = this.newElement(
			"input",
			{
				"name":"DoLEFatigueText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.tiredness),
				"oninput":"DoLE.input.stat.fatigue.r.value = this.value",
				"onchange":"DoLE.input.stat.fatigue.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('fatigue')"
			},
			DoLETD,
			"Fatigue"
		);

		// Stress
		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.stress.r = this.newElement(
			"input",
			{
				"name":"DoLEStressRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":SugarCube.State.variables.stressmax,
				"value":Math.floor(SugarCube.State.variables.stress),
				"oninput":"DoLE.input.stat.stress.t.value = this.value",
				"onchange":"DoLE.input.stat.stress.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.stress.t = this.newElement(
			"input",
			{
				"name":"DoLEStressText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.stress),
				"oninput":"DoLE.input.stat.stress.r.value = this.value",
				"onchange":"DoLE.input.stat.stress.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('stress')"
			},
			DoLETD,
			"Stress"
		);

		// Trauma
		DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.trauma.r = this.newElement(
			"input",
			{
				"name":"DoLETraumaRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":SugarCube.State.variables.traumamax,
				"value":Math.floor(SugarCube.State.variables.trauma),
				"oninput":"DoLE.input.stat.trauma.t.value = this.value",
				"onchange":"DoLE.input.stat.trauma.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.trauma.t = this.newElement(
			"input",
			{
				"name":"DoLETraumaText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.trauma),
				"oninput":"DoLE.input.stat.trauma.r.value = this.value",
				"onchange":"DoLE.input.stat.trauma.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('trauma')"
			},
			DoLETD,
			"Trauma"
		);

		// Control
		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.stat.control.r = this.newElement(
			"input",
			{
				"name":"DoLEControlRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"1",
				"max":SugarCube.State.variables.controlmax,
				"value":Math.floor(SugarCube.State.variables.control),
				"oninput":"DoLE.input.stat.control.t.value = this.value",
				"onchange":"DoLE.input.stat.control.t.value = this.value"
			},
			DoLETD
		);
		this.input.stat.control.t = this.newElement(
			"input",
			{
				"name":"DoLEControlText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(SugarCube.State.variables.control),
				"oninput":"DoLE.input.stat.control.r.value = this.value",
				"onchange":"DoLE.input.stat.control.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setVal('control')"
			},
			DoLETD,
			"Control"
		)
	},
	"tab3":function(){ // Body stats, liquids, TF's
		this.el.tab[2].appendChild(document.createTextNode("Body"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.content[2]);
		
		let DoLETBody = this.newElement("tbody", {}, DoLETable);
		
		let DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);
		
		// Clean Body
		let DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);
		
		// In Future: Specify levels to set body clean states
		let DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.cleanBody()"
			},
			DoLETD,
			"Clean Body"
		);
	},
	"tab4":function(){ // Social stats
		this.el.tab[3].appendChild(document.createTextNode("Social"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.content[3]);

		let DoLETBody = this.newElement("tbody", {}, DoLETable);

		let DoLETR = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		// Wolfpack harmony
		let DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		// Apparently harmony/ferocity is between 0-20, 0-100%, but it can go above 20
		this.input.soc.wolf.harmony.r = this.newElement(
			"input",
			{
				"name":"DolEWolfHarmonyRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"5",
				"max":"100",
				"value":Math.floor(((SugarCube.State.variables.wolfpackharmony)/20)*100),
				"oninput":"DoLE.input.soc.wolf.harmony.t.value = this.value",
				"onchange":"DoLE.input.soc.wolf.harmony.t.value = this.value"
			},
			DoLETD
		);
		this.input.soc.wolf.harmony.t = this.newElement(
			"input",
			{
				"name":"DoLEWolfHarmonyText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(((SugarCube.State.variables.wolfpackharmony)/20)*100),
				"oninput":"DoLE.input.soc.wolf.harmony.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.harmony.r.value = this.value"
			},
			DoLETD
		);
		let DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setSocial('wolfpack', 'harmony')"
			},
			DoLETD,
			"Wolf Harmony"
		);

		// Wolfpack ferocity
		DoLETD = this.newElement("td", {"class":"dole-td"}, DoLETR);

		this.input.soc.wolf.ferocity.r = this.newElement(
			"input",
			{
				"name":"DoLEWolfFerocityRange",
				"type":"range",
				"class":"dole-range",
				"min":"0",
				"step":"5",
				"max":"100",
				"value":Math.floor(((SugarCube.State.variables.wolfpackferocity)/20)*100),
				"oninput":"DoLE.input.soc.wolf.ferocity.t.value = this.value",
				"onchange":"DoLE.input.soc.wolf.ferocity.t.value = this.value"
			},
			DoLETD
		);
		this.input.soc.wolf.ferocity.t = this.newElement(
			"input",
			{
				"name":"DoLEWolfFerocityText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(((SugarCube.State.variables.wolfpackferocity)/20)*100),
				"oninput":"DoLE.input.soc.wolf.ferocity.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.ferocity.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setSocial('wolfpack', 'ferocity')"
			},
			DoLETD,
			"Wolf Ferocity"
		);
	},
	"newElement":function(type, attrs, appendTo, text=null){ // Create new DOM elements
		let el = document.createElement(type);
	
		for(let attr in attrs){
			el.setAttribute(attr, attrs[attr]);
		}
	
		appendTo.appendChild(el);
	
		if(text!=null){
			el.appendChild(document.createTextNode(text));
		}
	
		return el;
	},
	"toggleMenu":function(toggle){ // Toggle the menu
		if(toggle){
			// Reveal the overlay
			this.el.menu.classList.remove("hidden");
		
			// Change the function on the button to close instead of open
			this.el.toggle.setAttribute("onclick","DoLE.toggleMenu(0)");
		
			// Highlight the button
			this.el.toggle.classList.add("macro-button-selected");
		} else {
			// Hide the overlay
			this.el.menu.classList.add("hidden");
		
			// Set the button back to open
			this.el.toggle.setAttribute("onclick","DoLE.toggleMenu(1)");
		
			// Remove the button highlight
			this.el.toggle.classList.remove("macro-button-selected");
		}
	},
	"switchTab":function(tab){ // Switch between tabs
		let tabs = this.el.tab;
		let contents = this.el.content;
	
		for(let i=0; i<tabs.length; i++){
			if(i!==tab){
				tabs[i].classList.remove("tab-selected");
				contents[i].classList.add("hidden");
			} else{
				tabs[i].classList.add("tab-selected");
				contents[i].classList.remove("hidden");
			}
		}
	},
	"setDebt":function(){ // Set Bailey's debt
		let val = this.input.debt.value
		let debt = this.input.debt.value*100;
		let olddebt = SugarCube.State.variables.rentmoney;
	
		// Set the value to the input if a value was provided, otherwise just invert the debt.
		if(val!=0){
			SugarCube.State.variables.rentmoney=debt;
		} else {
			SugarCube.State.variables.rentmoney=-Math.abs(SugarCube.State.variables.rentmoney);
		}

		console.log("Debt set from £"+(olddebt*0.01)+" to £"+(SugarCube.State.variables.rentmoney*0.01));
	},
	"setVal":function(tar){
		// Debt: Integer
		// Money: Integer
		let gval = { // Game values translated for SugarCube
			"debt":"rentmoney",
			"money":"money"
		}

		// Pain: Percent 0-100.
		// Arousal: Percent 0-max.
		// Fatigue: Percent 0-2000.
		// Stress: Percent 0-max.
		// Trauma: Percent 0-max.
		// Control: Percent 0-max.
		let sval = { // Translate values for SugarCube
			"pain":"pain",
			"arousal":"arousal",
			"fatigue":"tiredness",
			"stress":"stress",
			"trauma":"trauma",
			"control":"control"
		}

		let type = "";
		if(gval.hasOwnProperty(tar)){
			type = "game";
		} else if(sval.hasOwnProperty(tar)){
			type = "stat";
		} else {
			console.error("Unknown value type for "+tar);
		}

		let oldval = SugarCube.State.variables[gval[tar] || sval[tar]];
		let val = this.input[type][tar].t.value;

		SugarCube.State.variables[gval[tar] || sval[tar]] = Math.floor(val);

		console.log(tar+" set from "+oldval+" to "+val+" and now it's "+SugarCube.State.variables[gval[tar] || sval[tar]]);
	},
	"setStat":function(stat){ // Set player stats
		// Pain 0-100
		// Arousal 0-max
		// Fatigue 0-2000
		// Stress 0-max, stressgain stresssaved??
		// Trauma 0-max, traumagain traumasaved??
		// Control 0-max controlstart??
		let vanval = { // These are values translated for Sugarcube
			"pain":"pain",
			"arousal":"arousal",
			"fatigue":"tiredness",
			"stress":"stress",
			"trauma":"trauma",
			"control":"control"
		};

		let val = this.input.stat[stat].t.value;
		let oldval = SugarCube.State.variables[vanval[stat]];

		SugarCube.State.variables[vanval[stat]] = Math.floor(val); // We floor the value to prevent a weird NaN bug.

		console.log(stat+" set from "+oldval+" to "+val+" and now it's "+SugarCube.State.variables[vanval[stat]]);

		// alert((stat.charAt(0).toUpperCase()+stat.slice(1))+": "+Math.floor(oldval)+" is now "+val);
	},
	"cleanBody":function(){ // Clean the player's body, we can update this in future
		// Set all body liquids to 0, which cleans the player of all external liquids.
		for(let area in SugarCube.State.variables.player.bodyliquid){
			// Set each value individually. This is purely so we can avoid issues if future game updates add other liquids.
			SugarCube.State.variables.player.bodyliquid[area].goo=0;
			SugarCube.State.variables.player.bodyliquid[area].semen=0;
			SugarCube.State.variables.player.bodyliquid[area].nectar=0;
		}
		
		alert("Body cleaned of all external liquids");
	},
	"setSocial":function(npc, stat){ // Set social stats
		let vanval = { // These are values translated for Sugarcube
			"harmony":"wolfpackharmony",
			"ferocity":"wolfpackferocity"
		};

		let val = 0;
		let oldval = 0;
		if (npc==="wolfpack") {
			// Pack harmony/ferocity is from 0-20+
			val = 20*(this.input.soc.wolf[stat].t.value/100);
			oldval = SugarCube.State.variables[vanval[stat]];
		}

		SugarCube.State.variables[vanval[stat]] = val;

		alert("Wolfpack "+stat+": "+Math.floor((oldval/20)*100)+"% is now "+Math.floor((val/20)*100)+"%\nValues above 100% will not display, but do affect gains/losses");
	},
	"setTF":function(tf){ // Set TF levels
		// Wolf
		// Cat
		// Cow
		// Fox
		// Bird
		// Angel
		// Fallen Angel
		// Demon
	}
};

DoLE.init(); // This call needs to be here for DoLEdit to run. Without it, nothing happens.