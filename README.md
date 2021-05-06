## Deploying to koirank.com server

*If you are editing the values of .env please do the instructions below*

### Editing .env in client folder

After editing the .env file in client folder do the following:

Note: What we need to upload on server is the files in build folder.

1. Need to compile the changes by running:
`yarn build`

2. After building login to server via SFTP, please input the credentials.

3. Once logged in, upload the files inside "client/build" to "public" folder in main server.