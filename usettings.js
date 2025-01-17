// DoLEdit
const DoLE = {
	"el": {
		"toggle":null,
		"menu":null,
		"tablist":null,
		"tab":[],
		"content":[]
	},
	"inputs": {
		"debt":null,
		"wolfharmony":null,
		"wolfferocity":null
	},
	"versions": {
		"game":"0.5.3.7",
		"DoLE":"0.15"
	},
	"styles":{
		"table": {"style":"border-top:1px solid white; border-right:1px solid white; width:100%;"},
		"tbody": {},
		"tr": {"style":"border-bottom:1px solid white;"},
		"td": {"style":"border-left:1px solid white; width:40%;"}
	},
	"init":function(){
		// Create button, copy base game UI, but position it in the bottom right.
		DoLE.el.toggle = DoLE.newElement(
			"button",
			{
				"class":"link-internal macro-button",
				"style":"position:fixed; right:0em; bottom:0em; max-width:initial; width:5em;",
				"type":"button",
				"role":"button",
				"tabindex":"0",
				"onclick":"DoLE.openMenu()"
			},
			document.body,
			"DoLEdit\n"+DoLE.versions.DoLE
		);
		
		// Create menu
		DoLE.el.menu = DoLE.newElement(
			"div",
			{
				"style":"display:block; position: fixed; right:6em; bottom:0em; width:50em; height:20em; line-height:1.5em; text-align:left;",
				"class":"hidden"
			},
			document.body
		);

		// Title bar
		let DoLETitleBar = DoLE.newElement("div", {"style":"display:flex; flex-wrap:wrap; align-items:center; padding:0.5rem; padding-bottom:0;"}, DoLE.el.menu);

		// Tab list
		DoLE.el.tablist = DoLE.newElement("div", {"class":"tab"}, DoLETitleBar);

		// Tabs
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
				DoLE.el.tablist
			));
		
			// First tab is always selected initially
			if(i===0){
				DoLE.el.tab[i].classList.add("tab-selected");
			}
		}

		// Tab names
		DoLE.el.tab[0].appendChild(document.createTextNode("Game"));
		DoLE.el.tab[1].appendChild(document.createTextNode("Stats"));
		DoLE.el.tab[2].appendChild(document.createTextNode("Body"));
		DoLE.el.tab[3].appendChild(document.createTextNode("Social"));

		// Close button
		let DoLEClose = DoLE.newElement(
			"div",
			{
				"class":"customOverlayClose",
				"style":"top:0.8rem",
				"onclick":"DoLE.closeMenu()"
			},
			DoLE.el.tablist
		);

		// Content
		for(let i=0; i<4; i++){
			DoLE.el.content.push(DoLE.newElement(
				"div",
				{"style":"position:relative; padding:0.5rem; margin:0.5em; margin-top:0; z-index:0; border:1px solid var(--150); border-top:0; background-color:var(--850); overflow-y:scroll; height:calc(100% - 60px);"},
				DoLE.el.menu
			));
			// First tab is always selected initially
			if(i!==0){
				DoLE.el.content[i].classList.add("hidden");
			}
		}

		// Tab 1 - General
		let DoLETable = DoLE.newElement("table", DoLE.styles.table, DoLE.el.content[0]);
		
		let DoLETBody = DoLE.newElement("tbody", DoLE.styles.tbody, DoLETable);
		
		let DoLETR = DoLE.newElement("tr", DoLE.styles.tr, DoLETBody);
		
		// Bailey's debt
		let DoLETD = DoLE.newElement("td", DoLE.styles.td, DoLETR);
		
		DoLE.inputs.debt = DoLE.newElement(
			"input",
			{
				"name":"DoLEDebt",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":"width:5%; min-width:3em",
				"placeholder":-Math.abs(SugarCube.State.variables.rentmoney*0.01)
			},
			DoLETD
		);
		
		let DoLEButton = DoLE.newElement(
			"button",
			{
				"style":"padding:0.3em;",
				"onclick":"DoLE.setDebt()"
			},
			DoLETD,
			"Debt"
		);
		
		// Tab 2 - Stats
		
		// Tab 3 - Body
		DoLETable = DoLE.newElement("table", DoLE.styles.table, DoLE.el.content[2]);
		
		DoLETBody = DoLE.newElement("tbody", DoLE.styles.tbody, DoLETable);
		
		DoLETR = DoLE.newElement("tr", DoLE.styles.tr, DoLETBody);
		
		// Clean Body
		DoLETD = DoLE.newElement("td", DoLE.styles.td, DoLETR);
		
		// In Future: Specify levels to set body clean states
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":"padding:0.3em",
				"onclick":"DoLE.cleanBody()"
			},
			DoLETD,
			"Clean Body"
		);

		// Tab 4 - Social
		DoLETable = DoLE.newElement("table", DoLE.styles.table, DoLE.el.content[3]);

		DoLETBody = DoLE.newElement("tbody", DoLE.styles.tbody, DoLETable);

		DoLETR = DoLE.newElement("tr", DoLE.styles.tr, DoLETBody);

		// Wolfpack harmony
		DoLETD = DoLE.newElement("td", DoLE.styles.td, DoLETR);

		// Set these to slides, because they're constrained between 0-22
		DoLE.inputs.wolfharmony = DoLE.newElement(
			"input",
			{
				"name":"DoLEWolfHarmony",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":"width:5%; min-width:3em",
				"placeholder":"0-22"
			},
			DoLETD
		);

		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":"padding:0.3em",
				"onclick":"DoLE.setWolfHarmony()"
			},
			DoLETD,
			"Wolf Ferocity"
		);

		// Wolfpack ferocity
		DoLETD = DoLE.newElement("td", DoLE.styles.td, DoLETR);

		DoLE.inputs.wolfferocity = DoLE.newElement(
			"input",
			{
				"name":"DoLEWolfFerocity",
				"type":"text",
				"inputmode":"text",
				"tabindex":"0",
				"class":"macro-textbox",
				"style":"width:5%; min-width:3em",
				"placeholder":"0-22"
			},
			DoLETD
		);
		
		DoLEButton = DoLE.newElement(
			"button",
			{
				"style":"padding:0.3em",
				"onclick":"DoLE.setWolfFerocity()"
			},
			DoLETD,
			"Wolf Harmony"
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
	"openMenu":function(){
		// Reveal the overlay
		DoLE.el.menu.classList.remove("hidden");
	
		// Change the function on the button to close instead of open
		DoLE.el.toggle.setAttribute("onclick","DoLE.closeMenu()");
	
		// Highlight the button
		DoLE.el.toggle.classList.add("macro-button-selected");
	},
	"closeMenu":function(){
		// Hide the overlay
		DoLE.el.menu.classList.add("hidden");
	
		// Set the button back to open
		DoLE.el.toggle.setAttribute("onclick","DoLE.openMenu()");
	
		// Remove the button highlight
		DoLE.el.toggle.classList.remove("macro-button-selected");
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
		let val = DoLE.inputs.debt.value*100;
		let debt = SugarCube.State.variables.rentmoney;
	
		// Set the value to the input if a value was provided, otherwise just invert the debt.
		if(val!=0){
			SugarCube.State.variables.rentmoney=val;
		} else {
			SugarCube.State.variables.rentmoney=-Math.abs(SugarCube.State.variables.rentmoney);
		}
		
		alert("Bailey Debt: £"+(debt*0.01)+" is now £"+(SugarCube.State.variables.rentmoney*0.01));
	},
	"setWolfHarmony":function(){
		//DoLEdits.wolfpackferocity=SugarCube.State.variables.wolfpackferocity;
		// DoLEdits.wolfpackharmony=SugarCube.State.variables.wolfpackharmony;
		// SugarCube.State.variables.wolfpackferocity=21;
		// SugarCube.State.variables.wolfpackharmony=21;
		// alert("Wolf Ferocity/Harmony: "+DoLEdits.wolfpackferocity+"/"+DoLEdits.wolfpackharmony+" is now "+SugarCube.State.variables.wolfpackferocity+"/"+SugarCube.State.variables.wolfpackharmony);
	},
	"setWolfFerocity":function(){},
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
	}
};

DoLE.init();
