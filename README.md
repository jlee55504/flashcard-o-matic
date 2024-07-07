Completed Chegg Skills "Flashcard-o-matic" "Qualified" project.

I'm only going to be listing the 'files' I had to create/edit.

src/Layout/index.js
The "Layout" 'function/component' diplays the "Header" 'component' and the 
"Home.js", "Study.js", "CreateDeck.js", "Deck.js", "EditDeck.js", "AddCard.js", 
and "EditCard.js" screens depending on the 'URL'. When the 'URL' is "/", the 
"Home" page is displayed, which diplays a 'button' JSX 'element' with the 'text' 
"Create Deck", all the "decks" on the local server along with the "view", "Study" 
and a 'button' JSX 'element' to delete the specific "deck".

src/Layout/style.css
CSS styling for all the 'files' to replicate Chegg Skill's example web page.

src/decks/EditDeck.js
The "EditDeck" 'function/component' displays the "nav-bar" 'div', (which 
contains 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" (which 
displays the specified "decks" info), and a 'form' allowing users to 'edit' and 
'update' the info of the specified "deck" on the 'local server'.

src/decks/Deck.js
The "Deck" 'function/component' displays the the "nav-bar" 'div' (which 
    contains a 'link' to the "Home page" ('src/Layout/index.js')), the info for 
    the specified "deck", 'button' JSX 'elements' to 'edit' ('EditDeck.js'), 
    'study' ('Study.js'), 'add cards to the specified "deck"' ('AddCards.js'), the
     info from every "card" in the specified "deck", and 'button' JSX 'elements' 
     to 'edit' ('EditCard.js') or 'delete' the specified "card" from the specified "deck".

 src/decks/CreateDeck.js
The "CreateDeck" 'function/component' displays the "nav-bar" 'div' containing 
a 'link' to the "Home page" ('src/Layout/index.js') and a 'form' allowing users 
to 'create' a new "deck" and add it to the 'local server'.

src/cards/Study.js
The "Study" 'function/component' displays the "nav-bar" 'div' which (contains
 a 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" (which 
  displays the specified "decks" info) and the data of the "front" and "back" 
  'keys' of the specified "deck" 'object', with the ability to 'redisplay' the 
  "cards" after all the "cards" have been displayed or to go back to the "Home 
  page" ('src/Layout/index.js').

  src/cards/EditCard.js
  The "EditCard" 'function/component' displays the "nav-bar" 'div'. which 
(contains a 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" 
(which displays the specified "decks" info) and a 'form' which allows users to 
'edit' and update the 'text' of the specified "card" in the specified "deck".

src/cards/AddCard.js
The "AddCard" 'function/component' allows users to add a "card" to the 
specific "deck" and 'local server'.