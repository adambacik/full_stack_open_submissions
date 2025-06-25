``` mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
    participant JavaScript
    
    user->>browser: writes into the text field
    user->>browser: clicks Save button

    JavaScript->>JavaScript: document.getElementById('notes_form')
    JavaScript->>JavaScript: e.preventDefault()
    JavaScript->>JavaScript: creates note object
    JavaScript->>JavaScript: notes.push(note)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: HTTP status code 201
    deactivate server


```