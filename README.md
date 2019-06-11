## __Google Maps React Demo__

### Technologies used:
• Google Maps API

• React

• Parcel - a lightweight boilerplate (alternative to create-react-app)

• react-google-maps - provides component versions of built in Google Maps features.

• Emotion (React)

### __Instructions to use:__

clone this repo
```
git clone git@github.com:nmcgregor-orange/google-map-demo.git
```

cd into the directory
```
cd google-map-demo
```
install npm packages
```
npm install
```
in the root directory go to the example.env file, from there put your Google Map API key in the spot where it says 'API_KEY_GOES_HERE' then rename the file to just .env
```
REACT_APP_GOOGLE_MAPS_API_KEY="https://maps.googleapis.com/maps/api/js?key=API_KEY_GOES_HERE"
```

if you don't have an API key you can sign up for one [here](https://developers.google.com/maps/documentation/embed/get-api-key)

run the app
```
npm start
```
app should be running on localhost:1234


![alt text](https://media.giphy.com/media/9Jz6hH95w72IOJNVAX/giphy.gif "map demo")