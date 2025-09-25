import $ from 'jquery'

const loadHtmlSuccessCbs = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCbs.includes(callback)){
        loadHtmlSuccessCbs.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url, 
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')
                loadHtmlSuccessCbs.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()