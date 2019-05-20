# escooter
Prototype / Playground for the escooter app

```
git clone https://github.com/HyacintheHamon/escooter.git
npm install or yarn install
react-native link
react-native run-ios or react-native run-android
```

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
