# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## Wir bauen uns eine Wetter-App und verwenden dafür useReducer und Context

1. Für die Wetter-App benötigen wir folgende Komponenten:
- components/SearchBar.jsx
- components/UnitToggle.jsx
- components/WeatherDisplay.jsx
- context/WeatherContext.jsx
- utils/weatherCode.js

2. In der App.jsx werden zunächst folgende Komponenten benötigt:
- SearchBar
- WeatherDisplay
- UnitToggle
- Die Komponente gibt ein div zurück mit einer h1 und dem Text "Weather Dashboard" sowie den drei importierten Komponenten

3. Die SearchBar.jsx gibt einen div-Container zurück mit einem label sowie input und einem button (Suche).
- Das Input soll von React kontrolliert und in einer lokalen state-Variablen 
- gespeichert werden. Es dient dazu, nach einem Ort zu suchen
- Der button soll beim Klicken eine Funktion "handleSearch" aufrufen
- Zur Feier des Tages, lasst und für das Input-Feld useId benutzen.

4. An dieser Stelle soll schon einmal der Context vorbereitet werden.
- Anstatt von useState soll unser Context useReducer benutzen.
- Für die Reducer-Funktion kann erstmal das Grundgerüst erstellt werden.
- Der initiale Wert von useReducer kann zunächst ein leeres Objekt sein.
- Der Context stellt unserer App als value "state" und "dispatch" bereit.
- Denkt daran den Context als Wrapper an der passende Stelle in unserer App einzubinden

5. In der SearchBar.jsx benötigen wir die Daten aus dem Context
In der handleSearch-Funktion soll die dispatch-Funktion aufgerufen werden und als Argument ein Objekt mit dem type "SET_LOADING" übergeben werden.

6. Der Context soll so erweitert werden, dass der initiale Wert jetzt "loading:false" sowie "error:null" enthält.
Die reducer-Funktion soll in einem switch/case den state für loading auf true setzen sowie error auf null, wenn der type "SET_LOADING" ist.

7. Weiter in der SearchBar.jsx. Die handleSearch-Funktion benötigt einen try/catch-Block. 
- Darin soll ein fetch auf folgende Adresse durchgeführt werden: https://geocoding-api.open-meteo.com/v1/search?name=
- Hinter "name" soll der Inhalt des input-Feldes eingetragen werden
- Tritt ein Fehler auf und keine Stadt mit dem Eintrag wird gefunden, dann soll ein Error geworfen werden ("Stadt wurde nicht gefunden"), der im catch-Block aufgefangen werden muss.
- Der catch-Block soll die dispatch-Funktion aufrufen mit folgendem Objekt: "type: "SET_ERROR", payload: error.message

8. Im Context muss die Reducer-Funktion so erweitert werden, dass der abgefangene Fehler im state gespeichert wird (loading: false und die payload soll unter dem Schlüssel "error" gespeichert werden).

9. In SearchBar.jsx müssen die Daten aus dem 1. Fetch weiterverarbeitet werden. Die folgenden Eigenschaften werden benötigt:

- latitude, longitude, name
- name soll als payload unter dem type "SET_CITY" als Argument and die dispatch-Funktion übergeben werden.
- latitude und longitude werden für einen weiteren Fetch an diese Adresse benötigt: https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true
- Die Daten aus diesem 2. Fetch sollen ebenfalls als payload unter dem key "SET_WEATHER" an die dispatch-Funktion übergeben werden.

10. Jetzt den Context weiter ausbauen und in der reducer-Funktion die Fälle für "SET_CITY" und "SET_WEATHER" integrieren. Der initiale State bekommt zwei weitere Eigenschaften: city: "" und weather: null

11. Die Komponente UnitToggle.jsx gibt einen button zurück und benötigt Zugriff auf den Context.

- Der button soll auf Klick die Einheiten Fahrenheit und Celsius umschalten.
- Dazu soll dispatch mit dem type "TOGGLE_UNITS" aufgerufen werden
- Der button soll als Text "Einheit ändern (aktuell:(hier soll dynamisch "Fahrenheit" oder "Celsius" stehen))" haben


12. Der Context muss erneut erweitert werden, der initiale State soll eine weitere Eigenschaft erhalten: units: "celsius"
Die reducer-Funktion soll für den Fall TOGGLE_UNITS die Eigenschaft units zwischen Celsius und Fahrenheit umschalten

13. Jetzt ist die WeatherDisplay.jsx dran. Die Komponente benötigt Zugriff auf den Context, ebenso auf die Datei weatherCode.js aus dem utils-Ordner.
Die Komponente gibt einen div-Container zurück in dem sich weitere Elemente befinden:
Eine h2, die die Stadt anzeigt
Drei zunächst leere p-Tags

14. Der 1. p-Tag soll das aktuelle Wetter anzeigen. Dazu muss die Datei weatherCode.js zusammen mit der Eigenschaft weathercode aus dem Context genutzt werden.

15. Der 2. p-Tag soll die Temperatur anzeigen, dazu soll eine Funktion benutzt werden (convertTemp), die Celsius in Fahrenheit umrechnet, abhängig von der Eigenschaft units aus dem Context

16. Der 3. p-Tag soll die Windgeschwindigkeit anzeigen, die aus der weather-Eigenschaft aus dem Context geholt werden kann

17. Abschließend sollen die Eigenschaften loading, error, weather aus dem Context benutzt werden um Elemente bedingt zu rendern.

Ist loading true soll ein p-Tag returned werden (
...Loading

)
Ist error true soll ebenfalls ein p-Tag returned werden, das den Fehler in roter Textfarbe anzeigt
Ist weather falsy soll null zurückgegeben werden