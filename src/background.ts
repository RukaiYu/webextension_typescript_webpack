import { happy } from "./util"

// the state of the background script is permanent.
let numberContentScripts = 0;


function main(){
    browser.runtime.onMessage.addListener((message, sender, sendResponse)=>{
      numberContentScripts++;
      sendResponse(`wow, you have executed the content_script for ${numberContentScripts} times`);
    });
}

main();