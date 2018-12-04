# MNagios

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

Mobile friendly Angular 7 Frontend for Nagios Core.

![alt text](https://github.com/netmonster01/mNagios/blob/master/screenshot.png)

![alt text](https://github.com/netmonster01/mNagios/blob/master/screenshot2.png)

Edit the apache2.conf /etc/apache2/apache2.conf file and add the following to allow cors.

```
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
Header always set Access-Control-Max-Age "1000"
Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type,$
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200]
```

Clone this repository to /var/www/mNagios.

Create a config file to hold our alias. /etc/apache2/sites-enabled/mNagios.cfg and add the following.

```
Alias /mNagios "/var/www/mNagios"

<Directory "/var/www/mNagios">
#  SSLRequireSSL
   Options None
   AllowOverride None
   <IfVersion >= 2.3>
      <RequireAll>
         Require all granted
#        Require host 127.0.0.1

         AuthName "Nagios Access"
         AuthType Basic
         AuthUserFile /usr/local/nagios/etc/htpasswd.users
      #   Require valid-user
      </RequireAll>
   </IfVersion>
   <IfVersion < 2.3>
      Order allow,deny
      Allow from all
#     Order deny,allow
#     Deny from all
#     Allow from 127.0.0.1

      AuthName "Nagios Access"
      AuthType Basic
      AuthUserFile /usr/local/nagios/etc/htpasswd.users
     # Require valid-user
   </IfVersion>
</Directory>
```