var $ = require('jquery');
var _ = require('lodash');

var keys = {
    SHIFT: 16,
    BACKSPACE: 8,
    DELETE: 46,
    TAB: 9,
    ENTER: 13,
    END: 35,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    COMMA: 188,
    S: 83
};

var List = function(backing) {
    this.items = backing ? backing : [];
};

$.extend(List.prototype, {

    add : function (item) {
        this.items.push(item);
        $(this).trigger("addToken", [item]);
        this.notifyChanged();
    },

    remove : function (item) {
        var idx = this.indexOf(item);
        this.removeByIndex(idx);
    },

    removeByIndex : function (index) {
        var item = this.get(index);
        if (item) {
            this.items.splice(index, 1);
            $(this).trigger("remove", [{'item':item, 'index':index}]);
            this.notifyChanged();
        }
    },

    indexOf :function (item) {
        return this.items.indexOf(item);
    },

    get : function (idx) {
        return this.items[idx];
    },

    forEach : function (callback) {
        _(this.items).each(callback);
    },

    size : function () {
        return this.items.length;
    },

    contains : function (item) {
        return _(this.items).indexOf(item) != -1;
    },

    toArray : function () {
        return _(this.items).toArray();
    },

    notifyChanged : function () {
        $(this).trigger("change", this);
    },

    filter : function (callback) {
        return _(this.items).filter(callback);
    },

    find : function (callback) {
        return _(this.items).find(callback);
    },

    any : function (callback) {
        return _(this.items).any(callback);
    }
});

var Autocomplete = function ($element, legalValues, options) {
    this.$originalInput = $($element);
    this.legalValues = legalValues;
    this.options = options;

    $(this).on('change:inputValue', this.onInputValueChanged.bind(this));

    this.tokens = new List();
    $(this.tokens).on('change', this.onTokensChanged.bind(this));
    $(this.tokens).on('addToken', this.onTokenAdded.bind(this));
    $(this.tokens).on('remove', this.onTokenRemoved.bind(this));

    this.inputValue = "";

    this.selectedTokenIndex = -1;
    this.selectedResultIndex = -1;

    this.initElements();
    this.initElementListeners();
    this.initTokens();
};

$.extend(Autocomplete.prototype, {
    initElements: function() {
        this.$originalInput.hide();

        this.$tokenList = $('<ul />').attr({
            class: this.$originalInput.attr('name') + '-container autocomplete'
        });
        this.$originalInput.after(this.$tokenList);

        this.$inputToken = $('<li class="input-token"/>');
        this.$tokenList.append(this.$inputToken);

        this.$input = $('<input>').attr({
            name: this.$originalInput.attr('name') + "-autocomplete-input",
            type: "text",
            class: "autocomplete-input"
        });
        this.$inputToken.append(this.$input);

        this.$dropdown = $('<ul class="dropdown">');
        this.$dropdown.hide();
        this.$inputToken.append(this.$dropdown);

        this.updatePlaceholderText();
    },

    initElementListeners: function() {
        var _this = this;
        var $parent = this.$originalInput.parent();
        var holderClass = this.$originalInput.attr('name')+'-container'
        $parent.delegate('.'+holderClass, 'click', function() {
            _this.$input.focus();
        });

        $parent.delegate('.'+holderClass+' .token', 'click', function(event) {
            var $token = $(event.currentTarget);
            _this.setSelectedTokenIndex($token.index());
            _this.clearInput();
            _this.clearSearch();
        });

        this.$input.on('click', function() {
            _this.clearTokenSelection();
        });

        this.$input.on('focus', function() {
            _this.runSearch();
        });

        this.$input.on('blur', function() {
            _this.clearTokenSelection();

            // Need to wait a little bit before clearing the search in case a search result was clicked in the
            // dropdown. If we clear it immediately, then the click event on the search result will not be triggered.
            _this.clearSearch({delay: 200});
        });

        this.$input.on('keydown', function(event) {
            _this.keyDown = true;
            switch (event.which) {
                case keys.TAB:
                    if (_this.inputValue || _this.selectedResultIndex != -1) {
                        event.preventDefault();
                        _this.validateAndAppendSearchResultOrInputValue();
                    }
                    break;

                case keys.COMMA:
                case keys.ENTER:
                    event.preventDefault();
                    _this.validateAndAppendSearchResultOrInputValue();
                    break;

                case keys.LEFT:
                case keys.RIGHT:
                    if (!_this.inputValue) {
                        if (event.which === keys.LEFT) {
                            _this.selectPreviousToken();
                        }
                        else {
                            _this.selectNextToken();
                        }
                    }
                    break;

                case keys.DOWN:
                case keys.UP:
                    event.preventDefault();
                    if (_this.inputValue) {
                        if (event.which === keys.DOWN) {
                            _this.selectNextResult();
                        }
                        else {
                            _this.selectPreviousResult();
                        }
                    }
                    break;

                case keys.BACKSPACE:
                case keys.DELETE:
                    if (_this.hasTokenSelection()) {
                        event.preventDefault();
                        _this.removeSelectedToken();
                    } else if (!_this.inputValue) {
                        _this.selectLastToken();
                    }
                    break;
            }
        });

        this.$input.on('keyup', function() {
            _this.updateInputValue();
        });
    },

    initTokens: function() {
        var _this = this;

        _(this.splitAndTrim(this.$originalInput.val())).each(function(token) {
            _this.tokens.add(token);
        });

        if(this.options.defaultValue) {
            _this.tokens.add(this.options.defaultValue);
        }
    },

    notifyChange: function() {
        if (this.options.onChange) {
            this.options.onChange();
        }
    },

    onInputValueChanged: function() {
        if (this.inputValue) {
            this.runSearch();
            this.clearTokenSelection();
        } else {
            this.clearSearch();
        }
    },

    onTokenAdded: function(event, token) {
        this.$inputToken.before('<li class="token"><p>' + token + '</p></li>');
    },

    onTokenRemoved: function(event, data) {
        var $token = $(this.$tokenList.find('.token')[data.index]);
        $token.remove();
    },

    onTokensChanged: function() {
        this.clearInput();
        this.clearSearch();
        this.updatePlaceholderText();
        this.updateOriginalInput();
    },

    hasTokenSelection: function() {
        return this.selectedTokenIndex != -1;
    },

    clearTokenSelection: function() {
        this.setSelectedTokenIndex(-1);
    },

    setSelectedTokenIndex: function(index) {
        var $tokens = this.$tokenList.find('.token');
        if (this.selectedTokenIndex != -1) {
            $($tokens[this.selectedTokenIndex]).removeClass('token-selected');
        }
        if (index >= 0 && index < $tokens.length) {
            $($tokens[index]).addClass('token-selected');
            this.selectedTokenIndex = index;
        } else {
            this.selectedTokenIndex = -1;
        }
    },

    selectLastToken: function() {
        this.setSelectedTokenIndex(this.tokens.size() - 1);
    },

    selectNextToken: function() {
        if (this.hasTokenSelection()) {
            this.setSelectedTokenIndex(this.selectedTokenIndex + 1);
        }
    },

    selectPreviousToken: function() {
        if (!this.hasTokenSelection()) {
            this.selectLastToken();
            this.clearSearch();
        } else {
            this.setSelectedTokenIndex(Math.max(0, this.selectedTokenIndex - 1));
        }
    },

    removeSelectedToken: function() {
        var selectedIndex = this.selectedTokenIndex;
        this.tokens.removeByIndex(selectedIndex);
        this.setSelectedTokenIndex(selectedIndex);
    },

    clearSearch: function(options) {
        options = options || {};
        options = options || {};
        var _this = this;

        if (options.delay) {
            this.clearSearchTimeout = setTimeout(function() {
                _this.clearSearch();
            }, options.delay);
            return;
        }

        if (this.clearSearchTimeout) {
            clearTimeout(this.clearSearchTimeout);
            this.clearSearchTimeout = null;
        }

        this.$dropdown.hide();
        this.clearInput();
        this.clearResultSelection();
    },

    runSearch: function() {
        if (!this.inputValue) {
            return;
        }

        var _this = this;
        var query = this.inputValue;
        var regex = new RegExp('(^|\\s)' + query, "i");
        this.searchResult = _(this.legalValues).select(function(value) {
            return (value.match(regex) && !_this.tokens.contains(value));
        });

        if (this.searchResult.length) {
            this.$dropdown.empty();
            this.populateDropdown(this.searchResult);
            this.selectFirstResult();
        } else {
            if(this.options.expandable){
                this.$dropdown.html($('<li />', {
                    "class": "addNew activeResult",
                    text:'Legg til: '+this.inputValue
                }));
                this.selectFirstResult();
            }
            else {
                this.$dropdown.html($('<li />', {
                    "class": "noResult",
                    text:'Ingen resultat'
                }));
            }

        }
        this.$dropdown.show();
    },

    populateDropdown: function(values) {
        var _this = this;
        _(values).each(function(value) {
            _this.$dropdown.append($("<li class='activeResult'/>")
                .on('click', function() {
                    _this.validateAndAppendToken(value);
                }).on('mouseenter', function(){
                    _this.$dropdown.find('.activeResult.highlighted').removeClass('highlighted');
                    $(this).toggleClass('highlighted');
                }).on('mouseleave', function(){
                    $(this).toggleClass('highlighted');
                })
                .html(value));
        });
    },

    hasResultSelection: function() {
        return this.selectedResultIndex != -1;
    },

    getSelectedSearchResult: function() {
        return this.hasResultSelection() ? this.searchResult[this.selectedResultIndex] : null;
    },

    clearResultSelection: function() {
        this.setSelectedResultIndex(-1);
    },

    setSelectedResultIndex: function(index) {
        this.$dropdown.find('.activeResult.highlighted').removeClass('highlighted');
        if ((index >= 0 && index < this.searchResult.length)||this.$dropdown.find('.addNew')) {
            this.selectedResultIndex = index;
            this.$dropdown.find('.activeResult').eq(index).addClass('highlighted');
        } else {
            this.selectedResultIndex = -1;
        }
    },

    selectFirstResult: function() {
        this.setSelectedResultIndex(0);
    },

    selectPreviousResult: function() {
        this.setSelectedResultIndex(Math.max(0, this.selectedResultIndex - 1));
    },

    selectNextResult: function() {
        if (!this.hasResultSelection()) {
            this.selectFirstResult();
        }
        else {
            this.setSelectedResultIndex(Math.min(this.searchResult.length - 1, this.selectedResultIndex + 1));
        }
    },

    clearInput: function() {
        this.$input.val('');
        this.updateInputValue();
    },

    updateInputValue: function () {
        var oldInputValue = this.inputValue;
        this.inputValue = this.$input.val();
        if (this.inputValue != oldInputValue) {
            $(this).trigger('change:inputValue', [this.inputValue, oldInputValue]);
        }
    },

    updateOriginalInput: function() {
        var tokens = this.tokens.toArray();
        if (this.inputValue) {
            tokens.push(this.inputValue);
        }
        this.$originalInput.val(tokens.join(','));
        this.notifyChange();
    },

    updatePlaceholderText: function() {
        this.$input.attr('placeholder', this.tokens.size() ? '' : this.$originalInput.attr('placeholder'));
    },

    validateAndAppendInputValue: function() {
        this.validateAndAppendToken(this.inputValue);
    },

    validateAndAppendSearchResultOrInputValue: function() {
        this.validateAndAppendToken(this.getSelectedSearchResult() || this.inputValue);
    },

    validateAndAppendToken: function(value) {
        if (!value) {
            return;
        }
        var token = ''

        if(!_.contains(this.legalValues,value)){
            if(this.options.expandable)
                token = value;
            else
                return;
        }
        else {
            token = _(this.legalValues).find(function(candidate) {
                return candidate.toLowerCase() == value.toLowerCase();
            });
        }


        if (token && this.tokens.indexOf(token) == -1) {
            // TODO use a set instead of a list
            this.tokens.add(token);
        }
    },

    splitAndTrim: function(string) {
        var items = [];
        var tokens = string.split(',');
        _(tokens).each(function(token) {
            var trimmed = $.trim(token);
            if (trimmed) {
                items.push(trimmed);
            }
        });

        return items;
    }
});

module.exports =  {
    init: function($inputElement, legalValues, options) {
        new Autocomplete($inputElement, legalValues, options);
    }
}
