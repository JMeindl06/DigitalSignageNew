let socket;

document.addEventListener('DOMContentLoaded', function() {
    // WebSocket-Verbindung herstellen
    //const socket = new WebSocket('ws://192.168.2.209:3000'); // daham
    socket = new WebSocket('ws://10.13.242.80:3000'); // schui
    var clientID = null;

    socket.onopen = () => {
        console.log('Connected to the WebSocket server');
    };

    socket.onerror = function(error) {
        console.log('WebSocket-Fehler: ' + error);
    };

    socket.onmessage = function(e) {
        let message = JSON.parse(e.data);

        if (message.status === 'success') {
            clientID = message.clientID;
            console.log('ClientID: ' + clientID);

            // Eingabefeld für die ClientID ausblenden, nachdem eine ID registriert wurde
            document.querySelector("#inputs").classList.remove("shown");
            document.querySelector("#inputs").classList.add("hidden");

            //style setzen 
            
        } else if (message.status === 'error') {
            alert('ClientID schon vergeben! Gib eine andere ClientID ein!');
        }

        //video anzeigen lassen
        if (message.action === 'showVideo') {

            //input felder ausblenden
            document.querySelector("#inputs").classList.remove("shown");
            document.querySelector("#inputs").classList.add("hidden");

            //DATEIPFAD MIT BASE64
            const videoSrc = ;


            let content = document.querySelector("#content");

            // content-div Einblenden
            content.classList.remove("hidden");
            content.classList.add("shown");
            //alle vorherigen inhalte von content löschen(überschreiben)
            content.innerHTML = "";

            // Video und Source tag erzeugen
            let vid = document.createElement("video");
            let source = document.createElement("source");
            source.src = videoSrc;

            //an content binden
            vid.appendChild ( source );
            content.appendChild ( vid );

            //Video laden und abspielen
            vid.load();
            vid.play();
        }

        if (message.action === 'showDia') {

            //inputfelder entfernen
            document.querySelector("#inputs").classList.remove("shown");
            document.querySelector("#inputs").classList.add("hidden");

            //source in console ausgeben
            console.log('Diashow Bild:', message.currentImage);
            
            //DATEIPFAD MIT BASE64
            const imageSrc = ;



            //content div 
            let content = document.querySelector("#content");

            // Einblenden
            content.classList.remove("hidden");
            content.classList.add("shown");
            content.innerHTML = "";

            // Bild erzeugen
            let img = document.createElement("img");
            img.src = imageSrc;
            //bild hinzufügen
            content.appendChild ( img );
        }
    };

    document.getElementById('sendButton').onclick = function() {
        const enteredID = document.getElementById('ClientIDInput').value;

        // Client-ID senden, wenn noch keine vorhanden ist
        if (!clientID && enteredID) {
            const message = {
                clientID: enteredID
            };
            socket.send(JSON.stringify(message));
        }
        // Nachricht mit der bereits registrierten Client-ID senden
        else if (clientID) {
            const message = {
                clientID: clientID
            };

            socket.send(JSON.stringify(message));
        }
    };
});