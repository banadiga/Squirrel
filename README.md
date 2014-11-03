Squirrel
========
Chrome plugin for increase performance of code review on GitHub.

Features
--------
* On the top of Pull Request page, makes target repo name, source repo name and branches clickable 
* Code style check - on the Files changed tab of Pull Request page checks the code and adds an Squirrel icon at a line if one of the predefined rules is violated.
  On the icon click the comment form with appropriate comment suggestion is opened.

Code style check
----------------
Line by line.

Built in checks
---------------
* TODO check - if there is an TODO but there is no jira ticket reference - "Add jira ticket!".
* Tense check - if the comment is not in present tense - "Please use present tense!".
* FIXME check - "Do not use FIXME!".
* XXX check - "Do not use XXX!".

Planned for future versions
---------------------------
* Add button "Show ALL outdated diff".
* Multi line checks.