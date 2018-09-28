import { happy } from "./util";
//import browser from "webextension-polyfill"
import browser = require("webextension-polyfill");

// communicate with the background script
browser.runtime.sendMessage({message: "content script executed"}).then( response => {
  console.log(response);
  
  // see comments in background.ts
  // webpack will not include the util.ts sources, unless we actually use that module
  console.log(happy());
})