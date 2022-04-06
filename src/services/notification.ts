import PushNotification from 'react-native-push-notification';

const Configure = () => {
  return null;
};

const ClearAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const LocalNotification = (title: string, message: string) => {
	console.log("======== Notification 1 ========");
	console.log(title);
	console.log(message);
	console.log("======== Notification 2 ========");
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'sound-channel-id',
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: false, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    actions: [], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

	allowWhileIdle: true,

    when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    title: title, // (optional)
    message: message, // (required)
    userInfo: {screen: 'home'}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  });
};

export {Configure, LocalNotification, ClearAllNotifications};
