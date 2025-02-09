// DoLEdit
const DoLE = {
	"el":{
		"toggle":null, // Button to open/close the menu
		"menu":null, // The menu itself
		"tab":[], // Tabs array
		"content":[] // Content for each tab
	},
	"input":{ // R=range, T=textbox
		"debt":null, // Bailey's debt
		"stat":{
			"pain":{"r":null,"t":null},
			"arousal":{"r":null,"t":null},
			"fatigue":{"r":null,"t":null},
			"stress":{"r":null,"t":null},
			"trauma":{"r":null,"t":null},
			"control":{"r":null,"t":null}
		},
		"soc":{
			"wolf":{
				"harmony":{"r":null,"t":null},
				"ferocity":{"r":null,"t":null}
			},
		},
		"tf":{
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
	"versions":{ // Tracking the game's version and our version for compatability
		"game":"0.5.3.7",
		"DoLE":"0.16"
	},
	"styles":{ // All styles, easier to have everything in one place.
		"toggle":"position:fixed; right:0em; bottom:0em; max-width:initial; width:5em;",
		"menu":"display:block; position: fixed; right:6em; bottom:0em; width:50em; height:20em; line-height:1.5em; text-align:left;",
		"titlebar":"display:flex; flex-wrap:wrap; align-items:center; padding:0.5rem; padding-bottom:0;",
		"close":"top:0.8rem",
		"content":"position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);",
		"table":"border-top:1px solid white; border-right:1px solid white; width:100%;",
		"tr":"border-bottom:1px solid white;",
		"td":"border-left:1px solid white; width:40%;",
		"textbox":"width:5%; min-width:3em",
		"button":"padding:0.3em;",
		"range":"vertical-align:middle;"
	},
	"init":function(){
		// We can conveniently copy a lot of the base-game classes
		// It allows us to copy styles and features, and it doesn't break anything!
		// We put necessary elements into variables for later usage.

		// Create the menu toggle button. Position it in the bottom right corner because it's out of the way and an unused space.
		DoLE.el.toggle = DoLE.newElement(
			"button",
			{
				"class":"link-internal macro-button",
				"style":DoLE.styles.toggle,
				"type":"button",
				"role":"button",
				"tabindex":"0",
				"onclick":"DoLE.toggleMenu(1)"
			},
			document.body,
			"DoLEdit\n"+DoLE.versions.DoLE
		);
		
		// Copy the base game overlay menu pretty much 1f1. We squish it to the bottom right, again, so it's out of the way.
		DoLE.el.menu = DoLE.newElement(
			"div",
			{
				"style":DoLE.styles.menu,
				"class":"hidden"
			},
			document.body
		);

		// The title bar is where all the tabs are put. We don't need to track it because it doesn't do much.
		let DoLETitleBar = DoLE.newElement("div", {"style":DoLE.styles.titlebar}, DoLE.el.menu);

		// The tab list is a simple container that holds all the tabs and the close button. We don't need to keep track of it.
		let tablist = DoLE.newElement("div", {"class":"tab"}, DoLETitleBar);

		// We iterate four times to create the individual tabs, and store them in a tab array.
		// Why do we iterate? Because we hate repetition!
		for(let i=0; i<4; i++){
			DoLE.el.tab.push(DoLE.newElement(
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
				DoLE.el.tab[i].classList.add("tab-selected");
			}
		}

		// The close button doesn't need to be tracked.
		// Buttons have a handy onclick attribute we use for the relevant functions.
		let DoLEClose = DoLE.newElement(
			"div",
			{
				"class":"customOverlayClose",
				"style":DoLE.styles.close,
				"onclick":"DoLE.toggleMenu(0)"
			},
			tablist
		);

		// Content
		for(let i=0; i<4; i++){
			DoLE.el.content.push(DoLE.newElement(
				"div",
				{"style":DoLE.styles.content},
				DoLE.el.menu
			));
			// First tab is always selected initially
			if(i!==0){
				DoLE.el.content[i].classList.add("hidden");
			}
		}

		DoLE.tab1();
		DoLE.tab2();
		DoLE.tab3();
		DoLE.tab4();
	},
	"tab1":function(){ // General settings
		DoLE.el.tab[0].appendChild(document.createTextNode("Game"));

		let DoLETable = DoLE.newElement("table", {"style":DoLE.styles.table}, DoLE.el.content[0]);
		
		let DoLETBody = DoLE.newElement("tbody", {}, DoLETable);
		
		let DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);
		
		// Bailey's debt
		let DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);
		
		DoLE.input.debt = DoLE.newElement(
			"input",
			{
				"name":"DoLEDebt",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"placeholder":-Math.abs(SugarCube.State.variables.rentmoney*0.01)
			},
			DoLETD
		);
		
		let DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setDebt()"
			},
			DoLETD,
			"Debt"
		);
	},
	"tab2":function(){ // Player stats
		DoLE.el.tab[1].appendChild(document.createTextNode("Stats"));

		let DoLETable = DoLE.newElement("table", {"style":DoLE.styles.table}, DoLE.el.content[1]);

		let DoLETBody = DoLE.newElement("tbody", {}, DoLETable);

		let DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);

		// Pain
		let DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.pain.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEPainRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":"100",
				"value":Math.floor(SugarCube.State.variables.pain),
				"oninput":"DoLE.input.stat.pain.t.value = this.value",
				"onchange":"DoLE.input.stat.pain.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.pain.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEPainText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.pain),
				"oninput":"DoLE.input.stat.pain.r.value = this.value",
				"onchange":"DoLE.input.stat.pain.r.value = this.value"
			},
			DoLETD
		)
		let DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('pain')"
			},
			DoLETD,
			"Pain"
		);

		// Arousal
		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.arousal.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEArousalRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":SugarCube.State.variables.arousalmax,
				"value":Math.floor(SugarCube.State.variables.arousal),
				"oninput":"DoLE.input.stat.arousal.t.value = this.value",
				"onchange":"DoLE.input.stat.arousal.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.arousal.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEArousalText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.arousal),
				"oninput":"DoLE.input.stat.arousal.r.value = this.value",
				"onchange":"DoLE.input.stat.arousal.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('arousal')"
			},
			DoLETD,
			"Arousal"
		);

		// Fatigue
		DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);

		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.fatigue.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEFatigueRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":"2000",
				"value":Math.floor(SugarCube.State.variables.tiredness),
				"oninput":"DoLE.input.stat.fatigue.t.value = this.value",
				"onchange":"DoLE.input.stat.fatigue.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.fatigue.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEFatigueText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.tiredness),
				"oninput":"DoLE.input.stat.fatigue.r.value = this.value",
				"onchange":"DoLE.input.stat.fatigue.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('fatigue')"
			},
			DoLETD,
			"Fatigue"
		);

		// Stress
		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.stress.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEStressRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":SugarCube.State.variables.stressmax,
				"value":Math.floor(SugarCube.State.variables.stress),
				"oninput":"DoLE.input.stat.stress.t.value = this.value",
				"onchange":"DoLE.input.stat.stress.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.stress.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEStressText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.stress),
				"oninput":"DoLE.input.stat.stress.r.value = this.value",
				"onchange":"DoLE.input.stat.stress.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('stress')"
			},
			DoLETD,
			"Stress"
		);

		// Trauma
		DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);

		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.trauma.r = DoLE.newElement(
			"input",
			{
				"name":"DoLETraumaRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":SugarCube.State.variables.traumamax,
				"value":Math.floor(SugarCube.State.variables.trauma),
				"oninput":"DoLE.input.stat.trauma.t.value = this.value",
				"onchange":"DoLE.input.stat.trauma.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.trauma.t = DoLE.newElement(
			"input",
			{
				"name":"DoLETraumaText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.trauma),
				"oninput":"DoLE.input.stat.trauma.r.value = this.value",
				"onchange":"DoLE.input.stat.trauma.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('trauma')"
			},
			DoLETD,
			"Trauma"
		);

		// Control
		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.stat.control.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEControlRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"max":SugarCube.State.variables.controlmax,
				"value":Math.floor(SugarCube.State.variables.control),
				"oninput":"DoLE.input.stat.control.t.value = this.value",
				"onchange":"DoLE.input.stat.control.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.stat.control.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEControlText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(SugarCube.State.variables.control),
				"oninput":"DoLE.input.stat.control.r.value = this.value",
				"onchange":"DoLE.input.stat.control.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setStat('control')"
			},
			DoLETD,
			"Control"
		)
	},
	"tab3":function(){ // Body stats, liquids, TF's
		DoLE.el.tab[2].appendChild(document.createTextNode("Body"));

		let DoLETable = DoLE.newElement("table", {"style":DoLE.styles.table}, DoLE.el.content[2]);
		
		let DoLETBody = DoLE.newElement("tbody", {}, DoLETable);
		
		let DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);
		
		// Clean Body
		let DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);
		
		// In Future: Specify levels to set body clean states
		let DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.cleanBody()"
			},
			DoLETD,
			"Clean Body"
		);
	},
	"tab4":function(){ // Social stats
		DoLE.el.tab[3].appendChild(document.createTextNode("Social"));

		let DoLETable = DoLE.newElement("table", {"style":DoLE.styles.table}, DoLE.el.content[3]);

		let DoLETBody = DoLE.newElement("tbody", {}, DoLETable);

		let DoLETR = DoLE.newElement("tr", {"style":DoLE.styles.tr}, DoLETBody);

		// Wolfpack harmony
		let DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		// Apparently harmony/ferocity is between 0-20, 0-100%, but it can go above 20
		DoLE.input.soc.wolf.harmony.r = DoLE.newElement(
			"input",
			{
				"name":"DolEWolfHarmonyRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"step":"5",
				"max":"100",
				"value":Math.floor(((SugarCube.State.variables.wolfpackharmony)/20)*100),
				"oninput":"DoLE.input.soc.wolf.harmony.t.value = this.value",
				"onchange":"DoLE.input.soc.wolf.harmony.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.soc.wolf.harmony.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEWolfHarmonyText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(((SugarCube.State.variables.wolfpackharmony)/20)*100),
				"oninput":"DoLE.input.soc.wolf.harmony.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.harmony.r.value = this.value"
			},
			DoLETD
		);
		let DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setSocial('wolfpack', 'harmony')"
			},
			DoLETD,
			"Wolf Harmony"
		);

		// Wolfpack ferocity
		DoLETD = DoLE.newElement("td", {"style":DoLE.styles.td}, DoLETR);

		DoLE.input.soc.wolf.ferocity.r = DoLE.newElement(
			"input",
			{
				"name":"DoLEWolfFerocityRange",
				"type":"range",
				"style":DoLE.styles.range,
				"min":"0",
				"step":"5",
				"max":"100",
				"value":Math.floor(((SugarCube.State.variables.wolfpackferocity)/20)*100),
				"oninput":"DoLE.input.soc.wolf.ferocity.t.value = this.value",
				"onchange":"DoLE.input.soc.wolf.ferocity.t.value = this.value"
			},
			DoLETD
		);
		DoLE.input.soc.wolf.ferocity.t = DoLE.newElement(
			"input",
			{
				"name":"DoLEWolfFerocityText",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":DoLE.styles.textbox,
				"value":Math.floor(((SugarCube.State.variables.wolfpackferocity)/20)*100),
				"oninput":"DoLE.input.soc.wolf.ferocity.r.value = this.value",
				"onchange":"DoLE.input.soc.wolf.ferocity.r.value = this.value"
			},
			DoLETD
		);
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":DoLE.styles.button,
				"onclick":"DoLE.setSocial('wolfpack', 'ferocity')"
			},
			DoLETD,
			"Wolf Ferocity"
		);
	},
	"newElement":function(type, attrs, appendTo, text=null){
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
	"toggleMenu":function(toggle){
		if(toggle){
			// Reveal the overlay
			DoLE.el.menu.classList.remove("hidden");
		
			// Change the function on the button to close instead of open
			DoLE.el.toggle.setAttribute("onclick","DoLE.toggleMenu(0)");
		
			// Highlight the button
			DoLE.el.toggle.classList.add("macro-button-selected");
		} else {
			// Hide the overlay
			DoLE.el.menu.classList.add("hidden");
		
			// Set the button back to open
			DoLE.el.toggle.setAttribute("onclick","DoLE.toggleMenu(1)");
		
			// Remove the button highlight
			DoLE.el.toggle.classList.remove("macro-button-selected");
		}
	},
	"switchTab":function(tab){
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
	},
	"setDebt":function(){
		let debt = DoLE.input.debt.value*100;
		let olddebt = SugarCube.State.variables.rentmoney;
	
		// Set the value to the input if a value was provided, otherwise just invert the debt.
		if(val!=0){
			SugarCube.State.variables.rentmoney=debt;
		} else {
			SugarCube.State.variables.rentmoney=-Math.abs(SugarCube.State.variables.rentmoney);
		}
		
		alert("Bailey Debt: £"+(olddebt*0.01)+" is now £"+(SugarCube.State.variables.rentmoney*0.01));
	},
	"setStat":function(stat){
		// Pain 0-100
		// Arousal 0-max
		// Fatigue 0-2000
		// Stress 0-max, stressgain stresssaved??
		// Trauma 0-max, traumagain traumasaved??
		// Control 0-max controlstart??
	},
	"cleanBody":function(){
		// let bl = SugarCube.State.variables.player.bodyliquid;
	
		// Set all body liquids to 0, which cleans the player of all external liquids.
		for(let area in SugarCube.State.variables.player.bodyliquid){
			// Set each value individually. This is purely so we can avoid issues if future game updates add other liquids.
			SugarCube.State.variables.player.bodyliquid[area].goo=0;
			SugarCube.State.variables.player.bodyliquid[area].semen=0;
			SugarCube.State.variables.player.bodyliquid[area].nectar=0;
		}
		
		alert("Body cleaned of all external liquids");
	},
	"setSocial":function(npc, stat){
		let val = 0;
		let vanval = { // These are values translated for Sugarcube
			"harmony":"wolfpackharmony",
			"ferocity":"wolfpackferocity"
		};
		if (npc==="wolfpack") {
					// Pack harmony/ferocity is from 0-20+
			val = 20*(DoLE.input.soc.wolf[stat].t.value/100);
		}
			
		SugarCube.State.variables[vanval[stat]] = val;

		alert("Wolfpack stat changed");
	},
	"setTF":function(tf){}
};

DoLE.init();