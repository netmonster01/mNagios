# MNagios

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

Mobile friendly Angular 7 Frontend for Nagios Core.

![alt text](https://github.com/netmonster01/mNagios/blob/master/screenshot.png)

![alt text](https://github.com/netmonster01/mNagios/blob/master/screenshot2.png)

Clone this repository to /var/www/mNagios.

Modify apache and add the following to the nagios.conf file.

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