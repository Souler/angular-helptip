var HelptipConfig = function() {
    this._className = 'helptip'
    this._useTranslate = true
    this._timeout = 500
}

HelptipConfig.prototype.className = function(val) {
    if (val !== undefined)
        this._className = String(val)
    return this._className
}

HelptipConfig.prototype.useTranslate = function(val) {
    if (val !== undefined)
        this._useTranslate = !!val
    return this._useTranslate
}

HelptipConfig.prototype.timeout = function(val) {
    if (val !== undefined && !isNaN(val))
        this._timeout = Number(val)
    return this._timeout
}

HelptipConfig.prototype.$get = function() {
    return this
}

module.exports = new HelptipConfig()