import { happy } from "./util";

// communicate with the background script
browser.runtime.sendMessage({message: "content script executed"}).then( response => {
  console.log(response);
  
  // see comments in background.ts
  // webpack will not include the util.ts sources, unless we actually use that module
  console.log(happy());
})
