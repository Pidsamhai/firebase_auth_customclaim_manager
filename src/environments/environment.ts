// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: "auth-custom-claim-manager",
    appId: "1:831416126337:web:8603fe95a28b2b85597680",
    databaseURL: "https://auth-custom-claim-manager-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "auth-custom-claim-manager.appspot.com",
    apiKey: "AIzaSyCDxL6-SMOMRGWGi_ziYlepIllI_9wt9_Y",
    authDomain: "auth-custom-claim-manager.firebaseapp.com",
    messagingSenderId: "831416126337",
    measurementId: "G-YRJSK81ZTR"
  },
  production: false,
  useEmulators: true,
  recaptcha3SiteKey: "",
  baseApiEndpoint: "http://localhost:5001/auth-custom-claim-manager/asia-southeast2/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
