grouptopics.org
===============

A web app to help user groups run more efficiently

Setting up your development environment
---------------------------------------

- Create a github account if you don't have one
- Fork a copy of the sdphp / grouptopics.org / master branch
- Clone to your computer
- You need to install composer http://getcomposer.org/download/
- Run "php composer.phar install", this will install required modules
- Create a mysql database, and give a user permission to it
- Copy app/config/database.php.inc to app/config/database.php
- Edit the mysql section of app/config/database.php, entering your personal information
- Run "php artisan migrate", this will create/update your mysql 

Committing To GroupTopics.org
-----------------------------

In your directory, create a branch "git checkout -b BRANCH_NAME_OF_YOUR_CHOICE", code, commit (often).
When you are ready to share with others, simply run "git push" to send your updates to GitHub.
When you are ready to share with GroupTopics.org, log into GitHub, choose your branch, and click "Pull Request"
