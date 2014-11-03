console.log("inside squirrel.js");

var squirrelController = (function (){

    var TIMEOUT = 100;

    /* css locators */
    var FILES = "div.file.js-details-container";
    var BLOCK_IN_FILE = "tr.file-diff-line.js-file-line.gi";
    var CODE_IN_BLOCK = "pre.diff-line-pre";
    var COMMIT_REF = "span.commit-ref.current-branch.css-truncate.js-selectable-text.expandable";
    var COMMIT_REF_TARGET_USER = "span.css-truncate-target.user";
    var COMMIT_REF_TARGET = "span.css-truncate-target:not(.user)";
    var REPO_NAME = "a.js-current-repository.js-repo-home-link";
    var ADD_COMMENT = "b.add-line-comment.octicon.octicon-comment-add";
    var EMPTY_CELL = "td.diff-line-num.empty-cell span.line-num-content";

    var createSquirrel = function (message) {
        var img = document.createElement("img");
        img.className = "emoji";
        img.title = message;
        img.alt = message;
        img.src = "/images/icons/emoji/shipit.png";
        img.height = "20";
        img.width = "20";
        img.align = "absmiddle";
        return img;
    };

    var createAddLineCommentLink = function (block, message) {
        var cell = block.querySelector(EMPTY_CELL);
        cell.onclick = function () {
            var addCommentButton = block.querySelector(ADD_COMMENT);
            addCommentButton.click();
            var callback = function() {
                var activeElement = document.activeElement;
                if (typeof(activeElement.value) != "undefined" && activeElement.tagName == "TEXTAREA") {
                    activeElement.value = message;
                } else {
                    setTimeout(callback, TIMEOUT);
                }
            };
            setTimeout(callback, TIMEOUT);
        };
        cell.innerHTML = "";
        cell.style.cursor = "pointer";
        cell.appendChild(createSquirrel(message));
    };

    var checkErrors = function (block) {
        var code = block.querySelector(CODE_IN_BLOCK).innerText.trim().toLowerCase();
        for (var i = 0; i < configuration.errors.length; i++) {
            var errorInfo = configuration.errors[i];
            var regularExpression  =  new RegExp(errorInfo.regexp.toLowerCase());
            if (regularExpression.test(code)) {
                  createAddLineCommentLink(block, errorInfo.message);
            }
        }
    };

    var runCheckStyleForFile = function (file) {
        var blocks = file.querySelectorAll(BLOCK_IN_FILE);
        for (var i = 0; i < blocks.length; i++) {
            checkErrors(blocks[i]);
        }
    };

    var runCheckStyle = function () {
        var files = document.querySelectorAll(FILES);
        for(var i = 0; i < files.length ; i++) {
            runCheckStyleForFile(files[i])
        }
    };

    var addCommitRefLink = function (commitRef, repoName) {
        var targetUser = commitRef.querySelector(COMMIT_REF_TARGET_USER);
        var targetUserLink = document.createElement("a");
        targetUserLink.innerText = targetUser.innerText.trim();
        targetUserLink.href = "/" +  targetUserLink.innerText + "/" + repoName;
        targetUser.innerHTML = "";
        targetUser.appendChild(targetUserLink);

        var target = commitRef.querySelector(COMMIT_REF_TARGET);
        var targetLink = document.createElement("a");
        targetLink.innerText = target.innerText.trim();
        targetLink.href = targetUserLink.href + "/tree/" + targetLink.innerText;

        target.innerHTML = "";
        target.appendChild(targetLink);
    };

    var addCommitRefLinks = function() {
        var commitRef = document.querySelectorAll(COMMIT_REF);
        var repoName =  document.querySelector(REPO_NAME).innerText;
        for(var i = 0; i < commitRef.length; i++) {
            addCommitRefLink(commitRef[i], repoName);
        }
    };

    var isGitHub = function () {
        return true;
    };

    return {
        check: function () {
            console.log("check: entry point");
            if (isGitHub()) {
                addCommitRefLinks();
                runCheckStyle();
            }
        }
    }
})();

squirrelController.check();
