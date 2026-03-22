# DoLEdit

Degrees of Lewdity Editor

Please note the contents of this repo and the game it edits is 18+

This is a JavaScript file that adds a menu to the game [Degrees of Lewdity](https://www.vrelnir.com/), allowing the user to easily edit stats in the game. I made this script as I wanted to have fun and mess around in the game without activating the in-game cheats, which will disable the ability to get Feats.

The script is open-source via this repo and easily added to the game via the inbuilt usettings.js file that the game loads by itself. It requires no script injection, does not pull from external libraries, and does not interfere with the game itself outside of accessing and altering the game's variables and HTML.

I plan to work on the script for a good long while, adding things as I find them. I originally created this script for myself, and only decided to put it online for others to use a short while ago. So, the majority of the features will come from me wanting to alter various things about the game. If you want any features added, feel free to add a feature request on the Issues page on this github, and I'll see about figuring it out.

## How to Use

Degrees of Lewdity provides inbuilt functionality for custom JavaScript loading, via a specific file called "usettings.js". As a result, all that needs to be done to add this script to your game is download the "usettings.js" file from this repo, and place it alongside the Degrees of Lewdity html file. If done correctly, you simply need to reload the page in your web browser and the menu button should appear in the bottom right.

For GitHub users, an alternative version of downloading the script would be to clone this repo. A bonus to this method is that the script can easily be updated by pulling from the repo. This would also allow you to contribute to the script, if you so wished.

If you already have a usettings.js file, then you'll need to copy/paste the code into that file instead. Open the usettings.js file on this repo, then click the copy button next to "Raw" on the file's banner. This will put the code into your clipboard. Open your usettings.js file, scroll to the very bottom of the file, and paste the code. Save, then reload Degrees of Lewdity, and the button should appear in the bottom right.

Ensure you've loaded into a game/save before trying to use anything in the DoLEdit menu, as while the menu will still work, none of the changes you make in the menu will apply until a game is loaded.

If you experience any errors, report them on this repo and I'll take a look.

Please note that this script was built for PC first, and as such is untested on mobile or other devices. While the functions themselves should still work as it's simple HTML and JavaScript with a sprinkle of CSS, the menu is unlikely to appear correctly and may thusly be unusable.

## Disclaimer

This game operates by directly altering game variables. Such actions are not without risk, and while I test every change I make before implementation to ensure they are working, I cannot fully test everything. As with any modification to games - cheats or otherwise - there is every possibility that while using this script your save game may break. As such, try to ensure you are saving often. In addition, ensure you are using the most up-to-date version of DoLEdit, and that the version of the game you are playing on is supported by that version.

This script cannot and will not interfere with any game files, and cannot interfere with any exported saves. This script cannot and will not interfere with your computer or browser in any way, shape, or form. I take no responsibility for misuse of this script. I take no responsibility for any usage of this script outside of supported versions.

This script currently does not support mods, and likely will not into the future unless requested. Use this script on modded versions of the game at your own risk.

As a final note, any changes to your game using this script will count as save editing. As such, please do not report any bugs you encounter after using this script in the official Degrees of Lewdity Discord.
