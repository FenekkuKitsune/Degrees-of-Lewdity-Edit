# DoLEdit

Degrees of Lewdity Editor

Please note the contents of this repo and the game it edits is 18+

This is a JavaScript file that adds a menu to the game [Degrees of Lewdity](https://www.vrelnir.com/), allowing the user to easily edit stats in the game. I made this script as I wanted to have fun and mess around in the game without activating the in-game cheats, which will disable the ability to get Feats.

The script is open-source via this repo and easily added to the game via the inbuilt usettings.js file that the game automatically loads. It requires no script injection and does not pull from external libraries.

I plan to work on the script for a good long while, adding things as I find them. I originally created this script for myself, and only decided to put it online for others to use a short while ago. So, the majority of the features will come from me wanting to alter various things about the game. If you want any features added, feel free to add a feature request on the Issues page on this github, and I'll see about figuring it out.

## How to Use

Degrees of Lewdity automatically loads a custom usettings.js file for custom JavaScript. All that's needed from this repo is said usettings.js file and the ustyles.css file. Place both files alongside the Degrees of Lewdity HTML file. If done correctly, then the menu will appear within the game window when opening/reloading the game.

For GitHub users, an alternative version of downloading the script would be to clone this repo. This method has the added bonus of being able to easily update the script by simply pulling from this repo. Contributions can be made via this method as well.

If you already have a usettings.js file, then there are two alternative methods to adding this script to your game. You can simply copy/paste the usettings.js file's code from this repo into your usettings.js file manually, or rename this repo's usettings.js file to `dole.js`, then add to your usettings.js file this code:

```js
let el = document.createElement("script");
el.setAttribute("type", "text/javascript");
el.setAttribute("src", "dole.js");
document.head.appendChild(el);
```

Please note that the script will not work correctly without the ustyles.css file, ensure you have both files together! In addition, the script was built for PC first. As such, it is untested on mobile devices. While the functions themselves will still work, the menu is unlikely to appear correctly and may thusly be unusable. If requested, I can attempt to fix this.

## Disclaimer

This game operates by directly altering game variables. Such actions are not without risk, and while I test every change I make before implementation to ensure they are working, I cannot fully test everything. As with any modification to games - cheats or otherwise - there is every possibility that while using this script your save game may break. As such, try to ensure you are saving often. In addition, ensure you are using the most up-to-date version of DoLEdit, and that the version of the game you are playing on is supported by that version.

This script cannot and will not interfere with any game files, and cannot interfere with any exported saves. This script cannot and will not interfere with your computer or browser in any way, shape, or form. I take no responsibility for misuse of this script. I take no responsibility for any usage of this script outside of supported versions.

This script currently does not support mods, and likely will not into the future unless requested. Use this script on modded versions of the game at your own risk.

As a final note, any changes to your game using this script will count as save editing. As such, please do not report any bugs you encounter after using this script in the official Degrees of Lewdity Discord.
