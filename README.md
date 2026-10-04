## Journaling App

This mobile application is for people who wants to begin journaling but don't have the motivation to use pen and paper.

## Tools and packages

This app is built with components from React-Native and Expo. The components that are used in this project is:

#### React-Native

- Text: headings, dates, ratings and journal thoughts.
- View: groups content in forms, pills and cards.
- TextInput: writes a thought about the day.
- Pressable: adds and removes thoughts, saves entries, opens cards and deletes entries.
- FlatList: displays the saved entries in History.
- ScrollView: makes longer forms and entries scrollable.
- KeyboardAvoidingView: keeps the journal form accessible when the keyboard is open.

StyleSheet is used for styling and Platform checks which operating system is running. These are APIs, not components. Button has been replaced by Pressable.

#### Expo

- Haptics (expo-haptics): vibrations when the value changes in the slider.
- SQLite (expo-sqlite): saves, loads and deletes journal entries with key-value storage.
- Crypto (expo-crypto): creates a unique ID for each entry with randomUUID.
- StatusBar (expo-status-bar): keeps the phone's status bar text light against the dark background.
- Expo Router (expo-router): Stack and Tabs organise screens, Link and router navigate, and useLocalSearchParams reads the selected entry's ID.
- Feather and FontAwesome (@expo/vector-icons): icons in the tab bar and the cross on each thought pill.

Haptics, SQLite, Crypto and StatusBar are the four SDK modules used for the assignment. Router and the icon library are listed separately from that count.

#### Third-party libraries

- Slider (@react-native-community/slider): lets the user rate the day from 1 to 10.
- SafeAreaView (react-native-safe-area-context): keeps content clear of the phone's notch and system areas.

These components are imported from separate packages, not from react-native. The app does not use react-native-paper. The lists above describe what the app code uses directly; package.json also contains dependencies used by Expo and navigation.

## How to run the project

1. Install Node.js 22.13 or newer and Git on your computer.
2. Clone the project and open its folder:

```bash
git clone https://github.com/Coolastelammetcodes/assignment-mobile-app.git
cd assignment-mobile-app
npm ci
npx expo start
```

3. Install Expo Go with support for SDK 57 on your phone.
4. Connect the phone and computer to the same Wi-Fi network.
5. Scan the QR code with Expo Go on Android, or the Camera app on iPhone.

This starts the app in Expo Go. You do not need to build a separate native app for these features.

## Using the journal

Open Journal, give your day a rating from 1 to 10 and write a thought. Use "Lägg till tanke" if you want several thoughts in the same entry. "Spara inlägg" saves both the added thoughts and any text still in the input.

History shows saved entries as cards, newest first. Tap a card to read the full entry or delete it with "Ta bort inlägg" and confirm. The date on Journal follows the phone's local date.

Entries are saved locally on the phone with SQLite. There is no account or cloud backup. Removing the app or its data can remove the journal. A browser preview uses localStorage instead; it does not share entries with the phone.

## Component details

The React-Native components listed above are used for:

- Text: headings, dates, ratings and journal thoughts.
- View: groups content in forms and cards.
- TextInput: writes a thought about the day.
- Pressable: adds a thought to the current draft and replaces the earlier Button component.

Additional React-Native components:

- Pressable: also saves entries, opens cards and deletes an entry after confirmation.
- FlatList: displays history cards as they are needed.
- ScrollView: makes longer forms and entries scrollable.
- KeyboardAvoidingView: keeps the journal form accessible with the keyboard open.

## Expo SDK modules in use

- expo-haptics: gives vibration feedback when the rating changes, where supported.
- expo-sqlite: saves and loads journal entries with its simple key-value storage API.
- expo-crypto: creates a unique ID for each saved entry.
- expo-status-bar: keeps the phone's status bar text readable against the dark background.

Expo Router handles the tabs and navigation. The route `src/app/(tabs)/history/[id].tsx` receives an ID with `useLocalSearchParams` to find the selected entry. Router is separate from the four SDK modules above.

## Project structure

- `src/app/`: screens and navigation.
- `src/components/`: journal form, date, cards and shared journal state.
- `src/types/`: the TypeScript type for a saved entry.
- `src/utils/`: local storage, with a separate browser version.

The journal provider shares entries between screens using React Context. Small English comments explain storage, shared state and route parameters in the code.

## Checks

```bash
npx expo lint
npx tsc --noEmit
```

To check the app on a phone:

1. Try saving an empty entry: the save button should be disabled.
2. Save a rating and several thoughts, including text left in the input.
3. Check that History shows the entry and that its card opens the correct details.
4. Open an entry, press "Ta bort inlägg" and cancel. Check that the entry remains.
5. Close and reopen the app: the saved entry should still be there.
6. Write a longer entry and check scrolling with the keyboard open.

## Assignment checklist

- [x] Built with React Native, Expo and TypeScript.
- [x] Uses at least four React Native components.
- [x] Uses at least four Expo SDK modules.
- [x] Uses Expo Router for useful navigation between screens.
- [x] A detail screen receives a route parameter.
- [x] README includes title, description, setup and component/module lists.
- [x] The project uses Git and has a GitHub remote.
- [ ] Before submission: check that all changes are committed and pushed, and that the GitHub repository is public.
- [ ] Before submission: test the flow on a phone with Expo Go.
- [ ] Submit a zip without node_modules, but keep the .git folder.

Keep committing during development so the Git history shows the work over time.

## Updated history features

History cards now show "Tankar för dagen" and a bullet list, just like the detail screen. Copying has been removed. Open an entry and press "Ta bort inlägg", then "Ja, ta bort" to delete it from local storage. "Avbryt" keeps it.

The earlier Clipboard instructions no longer apply. The four SDK modules now used are expo-haptics, expo-sqlite, expo-crypto and expo-status-bar. StatusBar keeps the phone's status text light against the dark background. Buttons now use Pressable, including adding thoughts and deleting entries.

To test deletion: first cancel and check that the entry remains. Then confirm deletion and restart the app. The deleted entry should stay removed, while other entries remain.

## Reading the code

Start with journal-form.tsx: it stores the draft with useState and saves it when the button is pressed. InputPills receives the draft through props. History displays saved entries, and the detail screen finds one entry by its ID.

journal-provider.tsx shares entries between screens using React Context. It also loads, saves and deletes entries. async/await waits for storage, and try/catch shows errors without losing the draft. A ref prevents two storage changes at the same time.

Conditions use ordinary if statements and named booleans. map displays lists, filter removes an item, and styles are written one setting per line. Comments explain these parts in English. The features and saved data format are unchanged.
