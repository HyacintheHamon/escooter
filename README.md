# escooter
Prototype / Playground for the escooter app

```
git clone https://github.com/HyacintheHamon/escooter.git
npm install or yarn install
react-native link
react-native run-ios or react-native run-android
```

## APIs

### VOI

VOI is a scooter sharing company founded in Sweden. They have electric scooters available at several locations in Europe, including cities in Sweden, Spain, Italy, France and others. A simple GET request to get scooters available for rental nearby a location (specified with latitude/longtitude parameters) looks like this:

https://api.voiapp.io/v1/vehicle/status/ready?lat=59.329323&lng=18.068581

(no authentication is needed)

The request will return data about scooters in a list with JSON objects. 

### TIER

VOI is a scooter sharing company founded in Berlin, Germany. A simple GET request to get scooters available for rental nearby a location (specified with latitude/longtitude parameters) looks like this:

https://tier.frontend.fleetbird.eu/api/prod/v1.06/map/cars/?lat=59.329323&lng=18.068581

(no authentication is needed)

The request will return data about scooters in a list with JSON objects. 

## Generating an .ipa file

Products->Scheme->Edit scheme -> Change build configuration to RELEASE

Step 1. Generate a main.jsbundle

Run `npm run bundle:ios`.

Step 2. Make iOS load bundle from local.

- Open iOS/AppDelegate.m
- Comment out `jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];`
- Uncomment `jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`

Step 3. Build .ipa file

In XCode:

- Change device -> Generic iOS device

- Product -> Clean

- Product -> Build

.app file can be found at

~/Library/Developer/Xcode/DerivedData/< APP NAME >/Build/Products/Release-iphoneos/< APP NAME >
Create folder Payload.

- Paste .app file into Payload folder. **The name has to be Payload**

- Compress the Payload folder.

- Change the name you want and put extension as .ipa
