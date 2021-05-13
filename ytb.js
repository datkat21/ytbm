/*

YouTube Banner Modifier — © Kat21 2021

Hope you enjoy using this!

*/

// Settings in JSON format.
var ytbSettings = {
    "channelLogoWidth": "125",
    "useRGBAgradient": true,
    "alerts": true,
    "rgbaGradient1": {
        "color": "0, 0, 0", // rgb color
        "opacity": "0.2" // from 0 to 1
            // this creates the rgba(0, 0, 0, 0.2) below
    },
    "rgbaGradient2": {
        "color": "0, 0, 0", // rgb color
        "opacity": "0.5" // from 0 to 1
            // this creates the rgba(0, 0, 0, 0.5) below
    },
    "fixButtonStyle": true,
    "tabsOnBanner": true,
    "consoleColor": "lightblue"
};

// assign vars
var ytbCurrent = { "applied": false };
var ytbPrevElement = undefined;

function ytbUpdate() {
    if (confirm("Are you sure you want to do this?\n\nThe current settings are:\n" + JSON.stringify(ytbSettings))) {
        try {
            var style1 = `color:${ytbSettings.consoleColor}`;
            var style2 = `color:unset`;
        } catch {
            console.error("%cytbm: %cAn error occured with the colors. Please set a valid CSS color value in the settings.", 'color:lightblue', 'color: unset;')
        }
        try {
            if (ytbPrevElement === undefined) {
                ytbPrevElement = document.getElementById('channel-header').parentElement;
                $('div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer').append(document.getElementById("channel-header"));
            } else {
                $(ytbPrevElement).append(document.getElementById("channel-header"));
            }
        } catch {
            console.info("%cytbm: %cPrevious element exists, not using it again.", style1, style2);
        }
        try {
            document.getElementById('channel-header').style = 'background-color: transparent !important;padding:10px 40px;width:95%;vertical-align: middle;display: inline;';
            document.querySelector('#channel-header').children[0].children[0].style = 'width: unset !important; height: unset !important';
            document.querySelector('#channel-header').children[0].children[0].children[0].style = `width:${ytbSettings.channelLogoWidth}px !important`;
        } catch (err) {
            console.error("An error occured. Is it running on your channel? If so, let's try again and make it work this time.");
            document.querySelector('#channel-header').children[0].children[1].children[0].children[1].style = 'width: unset !important; height: unset !important';
            document.querySelector('#channel-header').children[0].children[1].children[0].children[1].children[0].style = `width:${ytbSettings.channelLogoWidth}px !important`;
        }
        console.info("%cytbm: %cSetting properties", style1, style2);
        if (ytbSettings.useRGBAgradient) {
            $('div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer').style = `background: linear-gradient( rgba(${ytbSettings.rgbaGradient1.color}, ${ytbSettings.rgbaGradient1.opacity}), rgba(${ytbSettings.rgbaGradient1.color}, ${ytbSettings.rgbaGradient2.opacity}) ), var(--yt-channel-banner);background-size: cover;background-position: center;`;
            console.info("%cytbm: %cuseRGBAgradient is enabled", style1, style2);
        }
        if (ytbSettings.fixButtonStyle) {
            try {
                console.info("%cytbm: %cBeginning to fix button style", style1, style2);
                if (document.documentElement.attributes.dark.value) {
                    // its dark
                    document.querySelector('tp-yt-paper-button.style-scope.ytd-subscribe-button-renderer').style = 'background: #3d3d3d !important;';
                    console.info("%cytbm: %cDark mode detected, setting colors", style1, style2);
                    // #3d3d3d
                }
            } catch (err) {
                // assume its not dark
                document.querySelector('tp-yt-paper-button.style-scope.ytd-subscribe-button-renderer').style = 'background: #ececec !important;';
                console.info("%cytbm: %cLight mode detected, setting colors", style1, style2);
                // #ececec
            }
        }
        if (ytbSettings.tabsOnBanner) {
            if (confirm("WARNING: tabsOnBanner is experimental and has weird properties!\nAre you sure you would like to enable it?")) {
                document.querySelector('tp-yt-app-toolbar.style-scope.ytd-c4-tabbed-header-renderer').style = "bottom:41px !important";
            }
        }
        ytbCurrent.applied = true;
    } else {
        ytbCurrent.applied = false;
    }
}

ytbUpdate();