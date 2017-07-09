# Install Tools

```
sudo apt-get install -y nodejs npm
sudo ln -s `which nodejs` /usr/bin/node

npm install -g gulp
npm install -g jshint
npm install -g browserify
```

# Local Setup


```
git clone git@github.com:Trinovantes/Quest-Schedule-Exporter.git
cd Quest-Schedule-Exporter
npm install
gulp debug
```

# Deploy to Production

These instructions are for deploying to a clean VPS host (e.g. DigitalOcean). This allows me to push changes to my website via the git command `git push prod master`.

First on the remote server:
```
mkdir questscheduleexporter.xyz.git && cd questscheduleexporter.xyz.git
git init --bare
```

Then create the `post-receive` hook:
```
cd hooks
touch post-receive
chmod +x post-receive
vim post-receive
```

Add the following to the `post-receive` file:
```
#!/bin/bash

GIT_REPO=$HOME/questscheduleexporter.xyz.git
TMP_GIT_CLONE=/tmp/questscheduleexporter.xyz
PUBLIC_WWW=/var/www/questscheduleexporter.xyz

git clone $GIT_REPO $TMP_GIT_CLONE
cd $TMP_GIT_CLONE

npm install
gulp build
rsync -a --delete $TMP_GIT_CLONE/dist/ $PUBLIC_WWW/

rm -Rf $TMP_GIT_CLONE
exit
```

Update the nginx configuration file (`/etc/nginx/sites-available/default`):
```
#-------------------------------------------------------------------------------
# questscheduleexporter.xyz
#-------------------------------------------------------------------------------

server {
    listen 80;
    server_name questscheduleexporter.xyz; 
    
    include /etc/nginx/snippets/letsencrypt.conf;

    location / {
        return 301 https://www.questscheduleexporter.xyz$request_uri;
    }
}

server {
    listen      443;
    server_name www.questscheduleexporter.xyz;
    autoindex   off;
    
    ssl_certificate /etc/letsencrypt/live/questscheduleexporter.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/questscheduleexporter.xyz/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/questscheduleexporter.xyz/fullchain.pem;
    include /etc/nginx/snippets/ssl.conf;

    location / {
        root /var/www/questscheduleexporter.xyz/;
    }
}
```

Common nginx File (`/etc/nginx/snippets/ssl.conf`):
```
ssl on;

# certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

# modern configuration. tweak to your needs.
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL;
ssl_prefer_server_ciphers on;

# HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
add_header Strict-Transport-Security max-age=15768000;
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

# OCSP Stapling ---
# fetch OCSP records from URL in ssl_certificate and cache them
ssl_stapling on;
ssl_stapling_verify on;
```

Common nginx File (`/etc/nginx/snippets/letsencrypt.conf`):
```
location ^~ /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /var/www/letsencrypt;
}
```

Finally on the local machine:
```
git remote add prod user@example.org:questscheduleexporter.xyz.git
```
