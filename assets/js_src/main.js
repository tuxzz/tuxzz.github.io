var topbutton = document.getElementById("topbutton")
var navbar = document.getElementById("navbar")
var main = document.getElementById("main")
var stateIndicator = document.getElementById("state-indicator")
var scrolling = undefined;
var scrollStartTime = -1;
var navStatus = false;
var topbuttonStatus = ""
var currDevType = deviceType()

window.onresize = function()
{
    var devType = deviceType();
    if(devType != currDevType)
    {
        var lastDevType = currDevType
        currDevType = devType
        if(typeof(window.onDevTypeChanged) != 'undefined')
            window.onDevTypeChanged(devType, lastDevType)
    }
}

window.onDevTypeChanged = function(n, o)
{
    if(n == 1)
        closeNav()
}

window.onscroll = function()
{
    if(window.scrollY == 0)
        topbutton.className = "toolbutton"
    else
        topbutton.className = "toolbutton enabled"
}

function deviceType()
{
    return parseInt(window.getComputedStyle(stateIndicator).getPropertyValue('z-index'), 10)
}

function closeNav()
{
    if(navStatus)
        switchNav()
}

function switchNav()
{
    if(navStatus)
    {
        navbar.className = ""
        main.className = ""
        document.body.className = ""
        topbutton.className = topbuttonStatus
        navbar.onclick = undefined
    }
    else
    {
        navbar.className = "enabled"
        main.className = "blocked back"
        document.body.className = "no-overflow"
        topbuttonStatus = topbutton.className
        topbutton.className = "toolbutton"
        navbar.onclick = closeNav
    }
    navStatus = !navStatus
}

function toTop()
{
    smoothScroll(window.pageYOffset, 0, 1000.0)
}

function smoothScroll(from, to, time)
{
    if(typeof scrolling != 'undefined')
    {
        clearInterval(scrolling)
        scrolling = undefined
    }
    scrollStartTime = new Date().getTime();
    lastScrollPos = from;
    scrolling = setInterval(function(){
        var scrollStatus = (new Date().getTime() - scrollStartTime) / time
        if(scrollStatus > 1.0)
            scrollStatus = 1.0
        window.scrollTo(window.scrollX, from + (1.0 - Math.cos(scrollStatus * Math.PI)) / 2 * (to - from))
        if(scrollStatus >= 1.0)
        {
            clearInterval(scrolling)
            scrolling = undefined
        }
    }, 10)
}

window.onscroll()