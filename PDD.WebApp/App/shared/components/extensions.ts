if (!(Date.prototype as any).format) {
    (Date.prototype as any).format = function() {
        (this as Date).toLocaleString(navigator.language, {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
        })
    }
}

export default {};