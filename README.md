# DoLEdit

Degrees of Lewdity Editor

Please note the contents of this repo and the game it edits is 18+

This is a JavaScript file that adds a menu to the game [Degrees of Lewdity](https://www.vrelnir.com/), allowing the user to easily edit stats in the game. I made this script as I wanted to have fun and mess around in the game without activating the in-game cheats, which will disable the ability to get Feats.

The script is open-source via this repo and easily added to the game via the inbuilt usettings.js file that the game loads by itself. It requires no script injection, does not pull from external libraries, and does not interfere with the game itself outside of accessing and altering the game's variables and HTML.

I plan to work on the script for a good long while, adding things as I find them. I originally created this script for myself, and only decided to put it online for others to use a short while ago. So, the majority of the features will come from me wanting to alter various things about the game. If you want any features added, feel free to add a feature request on the Issues page on this github, and I'll see about figuring it out.

## How to Use

Degrees of Lewdity provides inbuilt functionality for custom JavaScript loading, via a specific file called "usettings.js". As a result, all that needs to be done to add this script to your game is download the "usettings.js" file from this repo, and place it alongside the Degrees of Lewdity html file. If done correctly, you simply need to reload the page in your web browser and the menu button should appear in the bottom right.

If you already have a usettings.js file, then you'll need to copy/paste the code into that file instead. Open the usettings.js file on this repo, then click the copy button next to "Raw" on the file's banner. This will put the code into your clipboard. Open your usettings.js file, scroll to the very bottom of the file, and paste the code. Save, then reload Degrees of Lewdity, and the button should appear in the bottom right.

If you experience any errors, report them on this repo and I'll take a look.

Please note that this script was built for PC first, and as such is untested on mobile or other devices. While the functions themselves should still work as it's simple HTML and JavaScript with a sprinkle of CSS, the menu is unlikely to appear correctly and may thusly be unusable.
