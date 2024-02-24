flux-cart-app Assignment: 

I have created 3 Apis and I am adding here curl here - 

1. curl --location 'http://localhost:5050/api/addNewContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone_number":"1235507687",
    "email":"kittu@gmail.com"
}'  

2. curl --location --request PUT 'http://localhost:5050/api/updatePrimaryContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone_number":"1235507687",
    "email":"kittu@gmail.com"
}'

3. curl --location --request GET 'http://localhost:5050/api/identify?phone_number=1235507687&email=kittu%40gmail.com' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone_number":"12345676898",
    "email":"email@gmail.com"
}'
