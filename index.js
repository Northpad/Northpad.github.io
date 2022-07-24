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
const LOCAL_STORAGE_WORD_TEXT_CONTENT = "word-text-content";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT1 = "planner-text-content1";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT2 = "planner-text-content2";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT3 = "planner-text-content3";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT4 = "planner-text-content4";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT5 = "planner-text-content5";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT6 = "planner-text-content6";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT7 = "planner-text-content7";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT8 = "planner-text-content8";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT9 = "planner-text-content9";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT10 = "planner-text-content10";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT11 = "planner-text-content11";
const LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT12 = "planner-text-content12";
const HTML_ELEMENT_PLANNER_ID1 = "planner-text-1";
const HTML_ELEMENT_PLANNER_ID2 = "planner-text-2";
const HTML_ELEMENT_PLANNER_ID3 = "planner-text-3";
const HTML_ELEMENT_PLANNER_ID4 = "planner-text-4";
const HTML_ELEMENT_PLANNER_ID5 = "planner-text-5";
const HTML_ELEMENT_PLANNER_ID6 = "planner-text-6";
const HTML_ELEMENT_PLANNER_ID7 = "planner-text-7";
const HTML_ELEMENT_PLANNER_ID8 = "planner-text-8";
const HTML_ELEMENT_PLANNER_ID9 = "planner-text-9";
const HTML_ELEMENT_PLANNER_ID10 = "planner-text-10";
const HTML_ELEMENT_PLANNER_ID11 = "planner-text-11";
const HTML_ELEMENT_PLANNER_ID12 = "planner-text-12";
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

const wordTextcontent = () => 
    document.getElementById(HTML_ELEMENT_DESIRED_WORD_COUNT_ID).value;

const padWordCount = () => padTextcontent().trim().split(" ").length;

const calculateProgressBar = () => padWordCount() / desiredWordCount() * 100;

const plannerTextcontent1 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID1).value;

const plannerTextcontent2 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID2).value;

const plannerTextcontent3 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID3).value;

const plannerTextcontent4 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID4).value;

const plannerTextcontent5 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID5).value;

const plannerTextcontent6 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID6).value;

const plannerTextcontent7 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID7).value;

const plannerTextcontent8 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID8).value;

const plannerTextcontent9 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID9).value;

const plannerTextcontent10 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID10).value;

const plannerTextcontent11 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID11).value;

const plannerTextcontent12 = () => 
    document.getElementById(HTML_ELEMENT_PLANNER_ID12).value;



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
    var text = document.getElementById("pad").value;

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
    document.getElementById("show").innerHTML = numWords;
}

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
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
        
        if ([ 
        KEY_CODE_BACKSPACE, KEY_CODE_LEFT_ARROW, 
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
        
        if ([ 
            KEY_CODE_BACKSPACE, KEY_CODE_LEFT_ARROW, 
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
        window.localStorage.setItem(LOCAL_STORAGE_WORD_TEXT_CONTENT, wordTextcontent());
        tempAlert2("Your text has successfully been saved to your browser",4500);
    }
    catch {
        tempAlert("OOPS! We were unable to save text to your browser",4500);
    }
}

const saveForLater2 = () => {
    try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT1, plannerTextcontent1());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT2, plannerTextcontent2());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT3, plannerTextcontent3());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT4, plannerTextcontent4());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT5, plannerTextcontent5());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT6, plannerTextcontent6());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT7, plannerTextcontent7());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT8, plannerTextcontent8());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT9, plannerTextcontent9());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT10, plannerTextcontent10());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT11, plannerTextcontent11());
        window.localStorage.setItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT12, plannerTextcontent12());

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
    
    const savedWordTextContent = window.localStorage.getItem(LOCAL_STORAGE_WORD_TEXT_CONTENT) || "";
    if (savedWordTextContent.length > 0) {
        document.getElementById(HTML_ELEMENT_DESIRED_WORD_COUNT_ID).value = savedWordTextContent;
    }
    
    const savedPlannerTextContent1 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT1) || "";
    if (savedPlannerTextContent1.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID1).value = savedPlannerTextContent1;
    }
    
        const savedPlannerTextContent2 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT2) || "";
    if (savedPlannerTextContent2.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID2).value = savedPlannerTextContent2;
    }
    
        const savedPlannerTextContent3 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT3) || "";
    if (savedPlannerTextContent3.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID3).value = savedPlannerTextContent3;
    }
    
        const savedPlannerTextContent4 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT4) || "";
    if (savedPlannerTextContent4.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID4).value = savedPlannerTextContent4;
    }
    
        const savedPlannerTextContent5 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT5) || "";
    if (savedPlannerTextContent5.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID5).value = savedPlannerTextContent5;
    }
    
        const savedPlannerTextContent6 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT6) || "";
    if (savedPlannerTextContent6.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID6).value = savedPlannerTextContent6;
    }
    
        const savedPlannerTextContent7 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT7) || "";
    if (savedPlannerTextContent1.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID7).value = savedPlannerTextContent7;
    }
    
        const savedPlannerTextContent8 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT8) || "";
    if (savedPlannerTextContent1.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID8).value = savedPlannerTextContent8;
    }
    
        const savedPlannerTextContent9 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT9) || "";
    if (savedPlannerTextContent9.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID9).value = savedPlannerTextContent9;
    }
    
        const savedPlannerTextContent10 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT10) || "";
    if (savedPlannerTextContent10.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID10).value = savedPlannerTextContent11;
    }
    
        const savedPlannerTextContent11 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT11) || "";
    if (savedPlannerTextContent11.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID11).value = savedPlannerTextContent11;
    }
    
        const savedPlannerTextContent12 = window.localStorage.getItem(LOCAL_STORAGE_KEY_PLANNER_TEXT_CONTENT12) || "";
    if (savedPlannerTextContent12.length > 0) {
        document.getElementById(HTML_ELEMENT_PLANNER_ID12).value = savedPlannerTextContent12;
    }
    
    init();
    document.getElementById("defaultOpen").click();
    document.getElementById("pad").setAttribute("spellcheck", "false");
}