var topbutton=document.getElementById("topbutton");var navbar=document.getElementById("navbar");var main=document.getElementById("main");var stateIndicator=document.getElementById("state-indicator");var scrolling=undefined;var scrollStartTime=-1;var navStatus=false;var topbuttonStatus="";var currDevType=deviceType();window.onresize=function(){var a=deviceType();if(a!=currDevType){var b=currDevType;currDevType=a;if(typeof(window.onDevTypeChanged)!="undefined"){window.onDevTypeChanged(a,b)}}};window.onDevTypeChanged=function(b,a){if(b==1){closeNav()}};window.onscroll=function(){if(window.scrollY==0){topbutton.className="toolbutton"}else{topbutton.className="toolbutton enabled"}};function deviceType(){return parseInt(window.getComputedStyle(stateIndicator).getPropertyValue("z-index"),10)}function closeNav(){if(navStatus){switchNav()}}function switchNav(){if(navStatus){navbar.className="";main.className="";document.body.className="";topbutton.className=topbuttonStatus;navbar.onclick=undefined}else{navbar.className="enabled";main.className="blocked back";document.body.className="no-overflow";topbuttonStatus=topbutton.className;topbutton.className="toolbutton";navbar.onclick=closeNav}navStatus=!navStatus}function toTop(){smoothScroll(window.pageYOffset,0,1000)}function smoothScroll(c,b,a){if(typeof scrolling!="undefined"){clearInterval(scrolling);scrolling=undefined}scrollStartTime=new Date().getTime();lastScrollPos=c;scrolling=setInterval(function(){var d=(new Date().getTime()-scrollStartTime)/a;if(d>1){d=1}window.scrollTo(window.scrollX,c+(1-Math.cos(d*Math.PI))/2*(b-c));if(d>=1){clearInterval(scrolling);scrolling=undefined}},10)}window.onscroll();