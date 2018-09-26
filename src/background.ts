import { happy } from "./util"

// the state of the background script is permanent.
let numberContentScripts = 0;


function main(){
    // here we communicate with the content script
    browser.runtime.onMessage.addListener((message, sender, sendResponse)=>{
      numberContentScripts++;
      sendResponse(`wow, you have executed the content_script for ${numberContentScripts} times`);
    });
}

// we use the module util
// if this is not done, webpack will not include the code for util
// at least not for the background script
// that means if you debug the background, you don't see sources for util
// if you debug the content_script, the util sources might still be there
console.log(happy());

// set it all up
main();