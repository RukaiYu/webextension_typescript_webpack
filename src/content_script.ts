import { happy } from "./util";

browser.runtime.sendMessage({message: "content script executed"}).then( response => {
  console.log(response);
})
