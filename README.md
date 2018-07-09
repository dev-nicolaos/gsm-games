# Glenwood Student Ministries Games Center

This project was generated with the [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Future Project Location

[http://games.glenwoodcc.org](http://games.glenwoodcc.org/)

## Creating a Build
Run `ng build` from the project root to create a build. Add the `--prod` flag to compress for production. If deploying to a sub (non-root) folder on a domain, add the `--base-href` flag with the path to that folder as a parameter. Copy all the files from the dist folder to wherever you are deploying.

#### Important!
If deploying on apache/nginx add the following code to a `.htaccess` file and place it with the other files in the deployed project root. This tells the server to redirect url's to the project root where the angular router can handle them.

```
<IfModule mod_rewrite.c>
  Options Indexes FollowSymLinks
  RewriteEngine On
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
