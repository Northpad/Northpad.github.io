let isEditEnabled = false;

const KEY_CODE_BACKSPACE = 8;
const KEY_CODE_LEFT_ARROW = 37;
const KEY_CODE_UP_ARROW = 38;
const KEY_CODE_RIGHT_ARROW = 39;
const KEY_CODE_DOWN_ARROW = 40;
const HTML_ELEMENT_DESIRED_WORD_COUNT_ID = "desired-word-count";
const HTML_ELEMENT_PAD_ID = "pad";
const HTML_ELEMENT_PROGRESS_BAR_ID = "progress-bar";
const HTML_ELEMENT_SHAKE_ANIMATION_CLASS = "shake-animation";
const CSS_DISABLE_TEXTAREA_SELECTION = "textarea::selection { background-color: transparent; }";
const LOCAL_STORAGE_KEY_PAD_TEXT_CONTENT = "pad-text-content";
const SYSTEM_MSG_SUCCESS_SAVE_PAD_TEXT_CONTENT = "Successfully saved the text for later!";
const SYSTEM_MSG_ERROR_SAVE_PAD_TEXT_CONTENT = "Oops! We were unable to save the text!";
const SYSTEM_MSG_ERROR_COPY_PAD_TEXT_CONTENT = "Oops! We were unable to copy the text!";
const SYSTEM_MSG_SUCCESS_COPY_PAD_TEXT_CONTENT = "Successfully copied to clipboard!"
const SYSTEM_MSG_ERROR_DELETE_PAD_TEXT_CONTENT = "Oops! We were unable to delete the text!";
const SYSTEM_MSG_EDIT = "It's time to edit. Congrats! ";
const SET_TIMEOUT_DELAY_SHAKE_ANIMATION = 3000;

const desiredWordCount = () => 
    document.getElementById(HTML_ELEMENT_DESIRED_WORD_COUNT_ID).value;

const padTextcontent = () => 
    document.getElementById(HTML_ELEMENT_PAD_ID).value;

const padWordCount = () => padTextcontent().trim().split(" ").length;

const calculateProgressBar = () => padWordCount() / desiredWordCount() * 100;

var alerted = localStorage.getItem('alerted') || '';

const enabledEditing = () => {
    isEditEnabled = true;
}

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("class","customAlert");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

function tempAlert2(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("class","customAlert2");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

document.getElementById('desired-word-count').addEventListener("click", function () {
    
    if(document.getElementById("pad").value == '')
    {
        document.getElementById("desired-word-count").setAttribute("onkeydown", "return true"); 
    } else if (padWordCount() > desiredWordCount()) {
        document.getElementById("desired-word-count").setAttribute("onkeydown", "return true"); 
        localStorage.setItem('alerted','no');
    } else {
        document.getElementById("desired-word-count").setAttribute("onkeydown", "return false"); 
        tempAlert("OOPS! It seems you've started writing but have not yet reached your goal",4500);
    }
    
});

function onClickFocus(element){
    const textarea = document.getElementById('pad');
    const end = textarea.value.length;

    textarea.setSelectionRange(end, end);
    textarea.focus();
}

var observe;
if (window.attachEvent) {
 observe = function (element, event, handler) {
  element.attachEvent('on'+event, handler);
 };
}
else {
 observe = function (element, event, handler) {
  element.addEventListener(event, handler, false);
 };
}
function init () {
 var text = document.getElementById('pad');
 function resize () {
   var scrollLeft = window.pageXOffset ||
   (document.documentElement || document.body.parentNode || document.body).scrollLeft;

   var scrollTop  = window.pageYOffset ||
   (document.documentElement || document.body.parentNode || document.body).scrollTop;

   text.style.height = "auto";
   text.style.height = text.scrollHeight + 'px';

   window.scrollTo(scrollLeft, scrollTop);
 }
 /* 0-timeout to get the already changed text */
 function delayedResize () {
  window.setTimeout(resize, 0);
 }
 observe(text, 'change',  resize);
 observe(text, 'cut',     delayedResize);
 observe(text, 'paste',   delayedResize);
 observe(text, 'drop',    delayedResize);
 observe(text, 'keydown', delayedResize);

 text.focus();
 text.select();
 resize();
}

init(); 

		function countWords() {

			// Get the input text value
			var text = document
				.getElementById("pad").value;

			// Initialize the word counter
			var numWords = 0;

			// Loop through the text
			// and count spaces in it
			for (var i = 0; i < text.length; i++) {
				var currentCharacter = text[i];

				// Check if the character is a space
				if (currentCharacter == " ") {
					numWords += 1;
				}
			}

			// Add 1 to make the count equal to
			// the number of words
			// (count of words = count of spaces + 1)
			numWords += 1;

			// Display it as output
			document.getElementById("show")
				.innerHTML = numWords;
		}

const onKeyDown = (e) => { 
    

    countWords();
    
    const keyCode = e.keyCode || e.which;
                
    if (padWordCount() == desiredWordCount()) {
        
        enabledEditing();
        document.getElementById("pad").setAttribute("spellcheck", "true");
          
        var key = event.keyCode || event.charCode;
        
        if( key == 8 || key == 46 ) {
            tempAlert("OOPS! You have gone below your desired goal",4500);
        } else {
            tempAlert2("Congratulations! You have reached your goal and may now edit",4500);
        }
        
        if ([KEY_CODE_BACKSPACE, 
        KEY_CODE_LEFT_ARROW, 
        KEY_CODE_UP_ARROW, 
        KEY_CODE_RIGHT_ARROW, 
        KEY_CODE_DOWN_ARROW].includes(keyCode)) {
            return true;
        }
        
        if (isEditEnabled) {
            return true;
        }
    
    }
    
     if (padWordCount() <= desiredWordCount()) {
                  
        onClickFocus();
        document.getElementById("pad").setAttribute("spellcheck", "false");

        if ([KEY_CODE_BACKSPACE, 
        KEY_CODE_LEFT_ARROW, 
        KEY_CODE_UP_ARROW, 
        KEY_CODE_RIGHT_ARROW, 
        KEY_CODE_DOWN_ARROW].includes(keyCode)) {
            return false;
        }
         
    }
}

const copyToClipboard = () => {
    try {
        navigator.clipboard.writeText(padTextcontent());
        tempAlert2("Your text has successfully been copied to your clipboard",4500);

    }
    catch {
        tempAlert("OOPS! We were unable to copy text to your clipboard",4500);
    }
}

const saveForLater = () => {
    try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PAD_TEXT_CONTENT, padTextcontent());
        tempAlert2("Your text has successfully been saved to your browser",4500);
    }
    catch {
        tempAlert("OOPS! We were unable to save text to your browser",4500);
    }
}

const deleteSaveForLater = () => {
    try {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY_PAD_TEXT_CONTENT);
        document.getElementById(HTML_ELEMENT_PAD_ID).value = "";
    }
    catch {
        tempAlert("OOPS! We were unable to delete your text",4500);
    }
}

window.onload = () => {
    
    const savedPadTextContent = window.localStorage.getItem(LOCAL_STORAGE_KEY_PAD_TEXT_CONTENT) || "";
    if (savedPadTextContent.length > 0) {
        document.getElementById(HTML_ELEMENT_PAD_ID).value = savedPadTextContent;
    }
}