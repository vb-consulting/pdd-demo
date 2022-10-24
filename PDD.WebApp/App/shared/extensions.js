if (!Date.prototype.format) {
    Date.prototype.format = function() {
        this.toLocaleString(navigator.language, {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
        })
    }
}

if (!String.prototype.urlToHandle) {
    String.prototype.urlToHandle = function() {
        let split = this.split("/").filter(s => s != "");
        return "@" + split[split.length-1];
    }
}

if (!String.prototype.take) {
    String.prototype.take = function(n) {
        if (!this) {
            return this;
        }
        let len = this.length;
        if (len <= n) {
            return this;
        }
        return this.substring(0, n) + "...";
    }
}
