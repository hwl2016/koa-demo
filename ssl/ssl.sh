#1、生成私钥key文件：
openssl genrsa -out privatekey.pem 1024

#2、通过私钥生成CSR证书签名  （需要填一些信息、可直接回车）
openssl req -new -key privatekey.pem -out certrequest.csr

#3、通过私钥和证书签名生成证书文件 
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem