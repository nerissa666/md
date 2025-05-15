跨域转发请求 只能获取get 需要设置SameSite=None 才可以正常使用全部
这里采用nginx 反向代理配置 解决问题

server {
listen 443 ssl;
server_name localhost www.nerissa666.xyz nerissa666.xyz;

        ssl_certificate /etc/nginx/nerissa666.xyz_nginxs/nerissa666.xyz.pem;
        ssl_certificate_key /etc/nginx/nerissa666.xyz_nginxs/nerissa666.xyz.key;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;


        # Load configuration files for the default server block.
        # include /etc/nginx/default.d/*.conf;


        location / {
            proxy_pass https://localhost:8081;  # 后端服务的地址和端口
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cookie_path / "/; httponly; secure; SameSite=None";
        }
        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
