// Debugging Statement
console.log("Content script injected!");

// Function to open the print dialogue
function openPrintDialogue() {
    window.print();
  }
  
  // Check if the URL matches the target URL
  function checkURL() {
    console.log("Checking URL...");
    if (window.location.href.includes("https://easteregg.retail.lightspeed.app/webregister/confirmation")) {
        console.log("URL matched!");
      if (!window.printDialogueOpened) {
        window.printDialogueOpened = true;
        openPrintDialogue();
        setTimeout(() => {
          window.printDialogueOpened = false;
        }, 20000); // Set the desired timeout (in milliseconds) before allowing subsequent print dialogues
      }
    } else {
	console.log("URL didn't match.");
      window.printDialogueOpened = false; // Reset the flag if the URL doesn't match
    }
  }
  
  // Monitor URL changes using MutationObserver
  const observer = new MutationObserver(checkURL);
  const targetNode = document.querySelector('html');
  const observerConfig = { childList: true, subtree: true };
  observer.observe(targetNode, observerConfig);
  
  // Initial check when the extension is injected
  checkURL();
  