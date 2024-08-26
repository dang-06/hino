echo "Pull branch develop"
git pull origin develop

echo "Building app.."
yarn build

#echo "Copy file to server..."
#cp -r dist/* /var/www/cloud-tms

echo "Reload nginx"
systemctl reload nginx

echo "Done!"
