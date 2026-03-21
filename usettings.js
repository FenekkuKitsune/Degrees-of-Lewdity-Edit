// DoLEdit
const DoLE = {
	"el":{ // DOM elements for usage.
		"input": {} // Input elements, for grabbing values.
	},
	"input":{ // R=range, T=textbox
		"soc":{
			"wolf":{ // Wolfpack harmony/ferocity. Displays under "Black Wolf" in the game.
				"harmony":{"r":null,"t":null},
				"ferocity":{"r":null,"t":null}
			},
		}
	},
	"versions":{
		"game":"0.5.8.10", // Supported game version
		"DoLE":"0.22" // DoLE Version
	},
	"_init":function(){ // Init, run on page load.
		// Version checking
		let thisVersion = SugarCube.State.variables.saveVersions[SugarCube.State.variables.saveVersions.length-1];

		if(this.versions.game >= thisVersion){
			// We're confirmed to support this version
			console.log("DoLEdit supports "+this.versions.game+" and onwards. Game version is "+thisVersion+". Have fun!");
		} else {
			// Warn the player about the unsupported version
			console.warn("DoLEdit supports "+this.versions.game+" and onwards. Game version is "+thisVersion+". This version is not supported and errors may occur!\nCheck https://github.com/FenekkuKitsune/Degrees-of-Lewdity-Edit for updates.");

			// Add exclamations to the DoLE version to indicate it's not fully supported
			this.versions.DoLE = "!"+this.versions.DoLE+"!";
		}

		// Add our stylesheet to the document head.
		this.newElement(
			"link",
			{
				"type":"text/css",
				"rel": "stylesheet",
				"href": "ustyles.css"
			},
			document.head
		);

		// Create the menu toggle button in the bottom right corner, as it's an unused space.
		this.el.toggle = this.newElement(
			"button",
			{
				"id":"DoLEToggle",
				"class":"macro-button", // We use base game classes for styling consistency.
				"type":"button",
				"role":"button",
				"onclick":"DoLE.toggleMenu(1)"
			},
			document.body,
			"DoLEdit\n"+this.versions.DoLE
		);

		// Copy the base game overlay for styling consistency. We don't copy it fully, as the funtionality is different and we don't need the extra elements.
		this.el.menu = this.newElement(
			"div",
			{
				"id":"DoLEMenu",
				"class":"hidden" // Start with the menu hidden.
			},
			document.body
		)

		// Titlebar and tab list. We only track these elements temporarily so we can append elements to them.
		let DoLETitleBar = this.newElement("div", {"id":"DoLETitleBar"}, this.el.menu);
		let tablist = this.newElement("div", {"class":"tab"}, DoLETitleBar); // tab class for styling consistency

		let tabs = [];

		for(let i=0; i<4; i++){
			tabs.push(this.newElement(
				"button",
				{
					"class":"link-internal macro-button",
					"type":"button",
					"role":"button",
					"onclick":"DoLE.switchTab("+i+")"
				},
				tablist
			));
		}
		// First tab is always selected initially
		tabs[0].classList.add("tab-selected");

		this.el.tabs = tabs;

		// Close button
		this.newElement(
			"div",
			{
				"id":"DoLEClose",
				"class":"customOverlayClose",
				"onclick":"DoLE.toggleMenu(0)"
			},
			DoLETitleBar,
		);

		let contents = [];

		// Content
		for(let i=0; i<4; i++){
			contents.push(this.newElement(
				"div",
				{"class":"dole-content"},
				this.el.menu
			));

			if(i !== 0){
				contents[i].classList.add("hidden");
			}
		}

		this.el.contents = contents;

		// Initialise each tab's contents.
		this.tab1();
		this.tab2();
		this.tab3();
		this.tab4();
	},
	"tab1":function(){ // General settings
		this.el.tabs[0].appendChild(document.createTextNode("Game"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.contents[0]);
		let DoLETBody = this.newElement("tbody", {}, DoLETable);
		let DoLETRow = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		// Bailey's debt.
		let DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);

		this.el.input.debt = this.newElement(
			"input",
			{
				"name":"DoLEDebt",
				"type":"text",
				"inputmode":"text",
				"class":"macro-textbox dole-textbox dole-textbox-wide",
				"placeholder":-Math.abs(SugarCube.State.variables.rentmoney/100)
			},
			DoLETData
		);
		this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setDebt(DoLE.el.input.debt.value)"
			},
			DoLETData,
			"Debt"
		)

		// Player's money
		DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);

		this.el.input.money = this.newElement(
			"input",
			{
				"name":"DoLEMoney",
				"type":"text",
				"inputmode":"text",
				"class":"macro-textbox dole-textbox dole-textbox-wide",
				"placeholder":Math.abs(SugarCube.State.variables.money/100)
			},
			DoLETData
		);
		this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setMoney(DoLE.el.input.money.value)"
			},
			DoLETData,
			"Money"
		);
	},
	"tab2":function(){ // Player stats
		this.el.tabs[1].appendChild(document.createTextNode("Stats"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.contents[1]);
		let DoLETBody = this.newElement("tbody", {}, DoLETable);

		let statlist = [
			"Pain",
			"Arousal",
			"Tiredness",
			"Stress",
			"Trauma",
			"Control"
		]

		let DoLETRow;
		let DoLETData;
		let max;

		for(let i=0; i<statlist.length; i++){
			// Every other cell after the first should be on a new row (1,3,5...)
			if(i % 2 === 0){
				DoLETRow = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);
				DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);
			} else {
				DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);
			}
			
			if(statlist[i].toLowerCase() === "pain"){ // Pain is 0-100
				max = 100
			} else if(statlist[i].toLowerCase() === "tiredness"){ // Tiredness is 0-2000
				max = 2000
			} else { // All other stat's max values are specified as vars
				max = SugarCube.State.variables[statlist[i].toLowerCase()+"max"]
			}

			this.el.input[statlist[i].toLowerCase()] = this.newElement(
				"input",
				{
					"name":"DoLE"+statlist[i],
					"type":"range",
					"class":"dole-range",
					"min":"0",
					"step":"1",
					"max":max,
					"value":Math.floor(SugarCube.State.variables[statlist[i].toLowerCase()])
				},
				DoLETData
			);
			this.newElement(
				"button",
				{
					"class":"dole-button",
					"onclick":"DoLE.setStat('"+statlist[i].toLowerCase()+"', DoLE.el.input."+statlist[i].toLowerCase()+".value)"
				},
				DoLETData,
				statlist[i] === "Tiredness" ? "Fatigue" : statlist[i]
			);
		}
	},
	"tab3":function(){ // Body stats, liquids, TF's
		this.el.tabs[2].appendChild(document.createTextNode("Body"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.contents[2]);
		let DoLETBody = this.newElement("tbody", {}, DoLETable);

		let tflist = [
			"Wolf",
			"Cat",
			"Cow",
			"Harpy",
			"Fox",
			"Angel",
			"Demon"
		];

		let DoLETRow;
		let DoLETData;
		let tf;

		for(let i=0; i<tflist.length; i++){
			// Every other cell after the first should be on a new row (1,3,5...)
			if(i % 2 === 0){
				DoLETRow = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);
				DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);
			} else {
				DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);
			}

			if(tflist[i].toLowerCase() === "cow"){
				tf = "Bovinity";
			} else if(tflist[i].toLowerCase() === "cat"){
				tf = "Cattiness";
			} else if(tflist[i].toLowerCase() === "harpy"){
				tf = "Harpyness";
			} else if(tflist[i].toLowerCase() === "angel" || tflist[i].toLowerCase() === "demon"){
				tf = tflist[i] + "icness";
			} else {
				tf = tflist[i] + "iness";
			}

			this.el.input[tflist[i].toLowerCase()] = this.newElement(
				"input",
				{
					"name":"DoLE"+tflist[i],
					"type":"text",
					"inputmode":"text",
					"class":"macro-textbox dole-textbox",
					"placeholder":Math.floor(SugarCube.State.variables[(tflist[i].toLowerCase() === "harpy" ? "bird" : tflist[i].toLowerCase())+"build"])
				},
				DoLETData
			);
			this.newElement(
				"button",
				{
					"class":"dole-button",
					"onclick":"DoLE.setTF('"+tflist[i].toLowerCase()+"', DoLE.el.input."+tflist[i].toLowerCase()+".value)"
				},
				DoLETData,
				tf
			)
		}
	},
	"tab4":function(){ // Social stats
		this.el.tabs[3].appendChild(document.createTextNode("Social"));

		let DoLETable = this.newElement("table", {"class":"dole-table"}, this.el.contents[3]);

		let DoLETBody = this.newElement("tbody", {}, DoLETable);

		let DoLETRow = this.newElement("tr", {"class":"dole-tr"}, DoLETBody);

		// Wolfpack harmony
		let DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);

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
			DoLETData
		);
		this.input.soc.wolf.harmony.t = this.newElement(
			"input",
			{
				"name":"DoLEWolfHarmonyText",
				"type":"text",
				"inputmode":"text",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(((SugarCube.State.variables.wolfpackharmony)/20)*100),
				"oninput":"DoLE.input.soc.wolf.harmony.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.harmony.r.value = this.value"
			},
			DoLETData
		);
		let DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setSocial('wolfpack', 'harmony')"
			},
			DoLETData,
			"Wolf Harmony"
		);

		// Wolfpack ferocity
		DoLETData = this.newElement("td", {"class":"dole-td"}, DoLETRow);

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
			DoLETData
		);
		this.input.soc.wolf.ferocity.t = this.newElement(
			"input",
			{
				"name":"DoLEWolfFerocityText",
				"type":"text",
				"inputmode":"text",
				"class":"macro-textbox dole-textbox",
				"value":Math.floor(((SugarCube.State.variables.wolfpackferocity)/20)*100),
				"oninput":"DoLE.input.soc.wolf.ferocity.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.ferocity.r.value = this.value"
			},
			DoLETData
		);
		DoLEButton = this.newElement(
			"button",
			{
				"class":"dole-button",
				"onclick":"DoLE.setSocial('wolfpack', 'ferocity')"
			},
			DoLETData,
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
		let tabs = this.el.tabs;
		let contents = this.el.contents;
	
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
	"confirm":function(el, val, text=false){
		if(text){
			el.value = "";
			el.placeholder = val;
		}

		el.style.animation = "2s linear dole-confirm";
		setTimeout(() => { el.style.animation = ""; }, 2000);
	},
	"setDebt":function(debt){ // Set Bailey's debt
		debt = debt*100;
		let olddebt = SugarCube.State.variables.rentmoney;
	
		// Set the value to the input if a value was provided, otherwise just invert the debt.
		if(debt!=0){
			SugarCube.State.variables.rentmoney=debt;

			console.log("Debt set from £"+(olddebt*0.01)+" to £"+(debt*0.01)+" and now it's £"+(SugarCube.State.variables.rentmoney*0.01));
		} else {
			SugarCube.State.variables.rentmoney=-Math.abs(SugarCube.State.variables.rentmoney);

			console.log("Debt inverted from £"+(olddebt*0.01)+" to £"+(SugarCube.State.variables.rentmoney*0.01));
		}

		this.confirm(this.el.input.debt, -Math.abs(SugarCube.State.variables.rentmoney/100));
	},
	"setMoney":function(money){
		money = money*100;
		let oldmoney = SugarCube.State.variables.money;

		SugarCube.State.variables.money=money;

		console.log("Money set from £"+(oldmoney*0.01)+" to £"+(SugarCube.State.variables.money*0.01));

		this.confirm(this.el.input.money, Math.abs(SugarCube.State.variables.money/100));
	},
	"setStat":function(stat, value){
		let oldval = SugarCube.State.variables[stat];
		
		SugarCube.State.variables[stat] = Math.floor(value);

		console.log(stat+" set from "+oldval+" to "+value+" and now it's "+SugarCube.State.variables[stat]);

		this.confirm(this.el.input[stat], value);
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
	"setTF":function(tf, value){ // Set TF levels
		let tfval = {
			"wolf":"wolfbuild",
			"cat":"catbuild",
			"cow":"cowbuild",
			"fox":"foxbuild",
			"bird":"birdbuild",
			"angel":"angelbuild",
			"fallen":"fallenbuild",
			"demon":"demonbuild"
		 };

		 let oldval = SugarCube.State.variables[tfval[tf]];

		 SugarCube.State.variables[tfval[tf]] = Math.floor(value);

		 console.log(tf+" set from "+oldval+" to "+value+" and now it's "+SugarCube.State.variables[tfval[tf]]);

		 this.confirm(this.el.input[tf], value, true);
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
	}
};

DoLE._init();