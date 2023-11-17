ace.define("ace/mode/sql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SqlHighlightRules = function() {

//red
    var keywords = (
        "risk|war|claim|claims|deduct|time|account|a/c|acct|accnt|acc|demurrage|laytime|dem|freight|frt|deadfreight|deadfrt|demm|" +
        "deviate|deviation|costs|cost|expense|expenses|expns|exps|deductable|delays|delay|" +
        "bbb|pay|payment|paid|loi|nor|money|fuck|hire|rate|sub|subs|sanctions|sanction"
    );

//violet
    var builtinConstants = (
        "owner|owns|ows|owners|ownr|oo|oos|option|opt|optn" +
        "chrtrs|charter|charterers|charterer|charts|chrts|chrt|chr|chart|chop|chopt|charterss"
    );

//blue
    var builtinFunctions = (
        "one|two|three|four|five|six|seven|eight|nine|ten|hunded|thousand|million|millions|"+
        "mil|mio|bn|billion|billions|thousands|hunderds|min|max|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|"+
        "twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen"
    );

//blue italic
    var dataTypes = (
        "n/a|delete|insert|counter|add|replace|del|replace|a/e|ae|accept/except|accept"
    );

//yellow
    var digitale = (
        "pct|ws|usd|eur|pmt|pdpr|hr|hrs|hour|hours|us$|us|dollar|dollars|doll|per|asper|wstc|wshtc|lps|lumpsum|ls|lmps|lmpsm|wwww"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.type": dataTypes,
        "string": digitale
    }, "identifier", true);

    this.$rules = {
        "start" : [{
            token: "comment",
            start: "##.*$"
        }, {
            token : "comment",//"support.function", // "string",
            regex : '(.)\\1{3}'
        }, {
            token: "storage.type",
            start: "http",
            end: " "
        }, {
            token: "invalid",
            regex : "pls advise|pls adv|pls advice|reverting|rvrtng|to be advised|tba|tbn",
            caseInsensitive: true
            //start: "%%%",
            //end:    "%%%"

        }, {
            //yellow
            token : "support.function", // float
            regex : "[(\\d+)\\+\\\%]"
        }, {
        //yellow
            token : "support.function", // float
            regex : "min/max|min/|/max|pdpr/|nil",
            caseInsensitive: true
        }, {
            token: "variable",
            regex: "(#+[a-zA-Z0-9(_)]{1,})"
        }, {
            token: "variable",
            regex: "^(\\S*\\s*.?[a-zA-Z0-9(_).]+){3}\\s*:"
        }, {
            token: "keyword",
            regex : "letter of indemnity|notice of readiness|on subs|on sub",
            caseInsensitive: true
        }, {
            token: "constant.language",
            regex : "in oo|in chopt|"+
            "owner/|owns/|ows/|owners/|ownr/|" +
            "/owner/|/owns/|/ows/|/owners/|/ownr/|" +
            "/owner|/owns|/ows|/owners|/ownr|" +
            "owner\'|owns\'|ows\'|owners\'|ownr\'|" +
            "chrtrs/|charter/|charterers/|charterer/|charts/|chrts/|chrt/|chr/|chart/|charterss/|" +
            "/chrtrs/|/charter/|/charterers/|/charterer/|/charts/|/chrts/|/chrt/|/chr/|/chart/|/charterss/|"+
            "/chrtrs|/charter|/charterers|/charterer|/charts|/chrts|/chrt|/chr|/chart|/charterss|"+
            "chrtrs\'|charter\'|charterers\'|charterer\'|charts\'|chrts\'|chrt\'|chr\'|chart\'|charterss\'",
            caseInsensitive: true
        }, {
            token: "string",
            regex : "as per",
            caseInsensitive: true
        }, {
            token: keywordMapper,
            regex: "@{0,2}[a-zA-Z_$][a-zA-Z0-9/_$]*\\b(?!])" //up to 2 @symbols for some built in functions
        }, {

            token: "text",
            regex: "\\s+"
        }],
    };
    this.normalizeRules();
};

///^.+(?::{2,4}|;;)
oop.inherits(SqlHighlightRules, TextHighlightRules);

exports.SqlHighlightRules = SqlHighlightRules;
});

ace.define("ace/mode/myxa",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sql_highlight_rules","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = SqlHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/myxa";
}).call(Mode.prototype);

exports.Mode = Mode;

});
