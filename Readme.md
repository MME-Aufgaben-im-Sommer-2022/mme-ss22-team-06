# Vorlage für MME-Projekte

Dieses Repository bildet die Grundlage für Ihre Projektarbeit und wurde über die Annahme der _Classroom_-Aufgabe automatisch erstellt. Hinweise zum Aufbau der vorgegebenen Struktur und Hilfswerkzeuge finden Sie im [Dev Guide](./DevGuide.md). **Achten Sie während der Entwicklung stets darauf, dass der Code in Ihrem Repository zu jeder Zeit über `npm run build` fehlerfrei gebaut und veröffentlicht werden kann.**

**Ergänzen Sie im Laufe der Entwicklung die folgenden Punkte in dieser Readme-Datei!**

## Projekt

Unsere Anwendung bietet die Möglichkeit die auf der Plattform verfügbaren Bücher in einer Liste darzustellen, eigene Wunschlisten zu erstellen und die Wunschlisten und Profile von den anderen Nutzern aufzufrufen. Und somit kann der Nutzer Tauschvorgänge durchführen.
Unsere Zielgruppe sind hauptsächlich Leute die gerne und viel Lesen. Dabei auf Umwelt und Geldbeutel zu achten ist einfach nur eine positive Nebensache, denn es geht hauptsächlich um die Freude am Lesen. In Hinblick auf die Nachhaltigkeit trägt unsere Anwendung zur Umwelt- und Resourcenschonung bei,
da gebrauchte Bücher wiederverwendet werden und dies den Druck neuer Bücher reduzieren kann. Zudem können auch die Ausgaben der einzelnen Personen, durch den Tausch statt den Kauf von Büchern, gesenkt werden. Die Bücher-Tausch Plattform erlaubt somit eine gezielte und somit auch zeitsparende Suche nach den gewünschten Büchern. [Release](https://book-temple.software-engineering.education/)

## Beschreibung & Anleitung
### Login/Registrierung
Auf der Login-Seite hat der Nutzer die Möglichkeit sich registrieren bzw. einloggen. Für die Registrierung gibt man E-Mail-Adresse, Passwort ein und zum Schluss kann man sich einloggen. Ist man eingeloggt, sieht man somit die Seiten wie Feed, meine Bücher, Wunschliste, Anfragen, Profil und Einstellungen. Nach dem erfolgreichen Login kann der Nutzer sich ausloggen. Dafür benutzt er das Ausloggen-Zeichen rechts oben.

![Login](https://user-images.githubusercontent.com/82600042/193231724-64bd745b-a2c4-40d0-b49c-497b23219278.png)
![Registrierung](https://user-images.githubusercontent.com/82600042/193231886-bf58e490-7106-4260-baf6-4b2112e1617e.png)

### Feed
Ist man bei Book-Temple eingeloggt, kommt man zur Hauptseite. Auf der Hauptseite bzw. Feed hat man die Möglichkeit, die zum Tausch verfügbaren Bücher in einer Liste zu sehen.
Um nähere Informationen über das Buch zu erfahren, kann man auf dem Buch klicken. Somit hat man die Liste der Nutzer, die das Buch im Besitz haben. Interessiert man sich für das Buch, hat man die Möglichkeit dem Nutzer eine Nachricht schreiben. Die Nachrichten sind dann in den Anfragen zu sehen.
Man hat die Möglichkeit die aufgelisteten Bücher nach Datum und nach meist getauscht sortieren. 

![Feed](https://user-images.githubusercontent.com/82600042/193231945-53713c07-a42a-4b8d-b441-57ecddd4be1d.png)
![Buch-Info](https://user-images.githubusercontent.com/82600042/193232124-849c6f16-8b8f-40c8-96eb-98436592b123.png)

### Meine Bücher
Auf der Seite „Meine Bücher“ sind die für Tausch verfügbaren Bücher des Nutzers dargestellt. Mit einem Klick auf „Neues Buch hinzufügen“, öffnet sich ein Pop-up-Fenster, wo man nach Büchern suchen kann. Nach der erfolgreichen Suche kann man mit dem Plus-Zeichen das Buch zu seiner Liste hinzufügen. Mit dem Minus-Zeichen hat man die Möglichkeit die Bücher aus der Liste zu entfernen.
Außerdem wird eine weitere Liste angezeigt, mit Büchern, die bereits getauscht worden sind. 

![MeineBuecher](https://user-images.githubusercontent.com/82600042/193232578-6686168e-9640-4e47-9d47-13616060a68b.png)
![BuchHinzufuegen](https://user-images.githubusercontent.com/82600042/193232796-d0caa893-c6a4-45d9-b9f6-e35c8ec69c72.png)

### Wunschliste
In der Wunschliste speichert der Nutzer die Bücher, die er nicht im Besitz hat. Somit können die anderen Nutzer sehen, ob sie die Bücher haben und ob sie anbieten können. Mit einem Klick auf „Neues Buch hinzufügen“ öffnet sich ein Pop-up-Fenster, wo man nach einem Buch suchen kann. War die Suche erfolgreich, kann man mit dem Herz-Zeichen die Bücher zu Favoriten hinzufügen. Mit einem Klick auf das rote Herz entfernt man das Buch aus den Favoriten.

![Wunschliste](https://user-images.githubusercontent.com/82600042/193232921-bed2e4ae-5ce8-4705-9031-1e416447b587.png)


### Anfragen
In den Anfragen sind die aktuellen Tauschanfragen dargestellt. Ist irgendein Nutzer an einem Buch des Nutzers interessiert, kann er eine Anfrage schicken. Der Nutzer hat dabei die Möglichkeit die Anfrage annehmen oder löschen. Nach der Annahme kann man dem Nutzer Nachrichten schicken. Über den Button „Mehr Infos“, können weitere Details zu den jeweiligen Nutzern eingesehen werden.

![Anfragen](https://user-images.githubusercontent.com/82600042/193233052-45df7b20-c777-4fef-99d5-7da7650dd539.png)
![Infos Benutzer](https://user-images.githubusercontent.com/82600042/193233075-91e3e702-fa2b-4a2a-9517-58762c6d3e39.png)


### Profil
Im Profil hat der Nutzer die Möglichkeit Foto, Vorname und Nachname zu bearbeiten. Außerdem kann man zu seinem Profil Beschreibung hinzufügen. Somit können andere Nutzer wissen, welche Bücher sie dem Nutzer anbieten können. Klickt man auf Button „Speichern“, sind die Daten aktualisiert.

![Profil](https://user-images.githubusercontent.com/82600042/193233151-e3099b6e-745f-484a-a3fd-8091249ac8d8.png)


### Einstellungen
Bei den Einstellungen hat der Nutzer die Möglichkeit Profil zu bearbeiten, das aktuelle Passwort ändern und Profil endgültig löschen. Für das Löschen des Profils braucht man das aktuelle Passwort.

![Einstellungen](https://user-images.githubusercontent.com/82600042/193233166-1fa9a9cc-fdcb-409b-86ee-f04e3985e73a.png)



## Team


| Name               | E-Mail-Adresse                          | Github-Nutzer| Foto   | Teilbereich der Anwendung |
| ------------------ |:---------------------------------------:| ------------:|-------:| --------------------------|
| Alisa Friedmann    | Alisa.Friedmann@stud.uni-regensburg.de  | alisa-fr     |![AlisaFriedmann](https://user-images.githubusercontent.com/82600042/193230416-55810649-2af2-40f3-a1ca-ba6a1667d3bc.jpg)                                                                     | Appwrite                  |
| Elisabeth Philipp  | Elisabeth.Philipp@stud.uni-regensburg.de| TrashCoon    |![ElisabethPhilipp](https://user-images.githubusercontent.com/82600042/193230516-d5ca9ad0-3015-4b71-884c-d410fdfbdb08.JPG)                                                                   | UI                        |
| Lianna Aleksanyan  | Lianna.Aleksanyan@stud.uni-regensburg.de| liannaaleks  |![LiannaAleksanyan](https://user-images.githubusercontent.com/82600042/193230639-54145f6f-64d2-4ffa-ad01-31427bff4438.JPG)
| API                       |
