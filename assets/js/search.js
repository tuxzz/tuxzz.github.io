var dataUrl = undefined
var searchObj = undefined
var searchNode = undefined

function initSearch(du, so)
{
    dataUrl = du
    searchObj = so
}

function updateCache(callback)
{
    if(typeof(searchNode) == 'undefined')
    {
        var req = new XMLHttpRequest()
        req.onreadystatechange = function()
        {
            if (req.readyState == 4)
            {
                if (req.status == 200)
                {
                    try
                    {
                        searchNode = JSON.parse(req.responseText)
                    }
                    catch(e)
                    {
                        callback(false, e)
                    }
                    callback(true)
                }
                else
                    callback(false, "HTTP" + req.status.toString())
            }
        }
        req.open("GET", dataUrl, true)
        req.send()
    }
    else
        callback(true)
}

function searchCore(str, callback)
{
    updateCache(function(success, error)
    {
        if(!success)
            callback(false, error)
        else
        {
            var tags = []
            var reProp = /\s*(\w+)\s*:\s*(\S+)\s*/g
            reProp.compile(reProp)
            for(var matched = reProp.exec(str); matched != null; matched = reProp.exec(str))
            {
                var propName = matched[1]
                var propVal = matched[2]
                if(propName == "tag" || propName == "tags")
                    tags[tags.length] = propVal
            }
            toSearch = str.replace(reProp, '###')
        }
    })
}