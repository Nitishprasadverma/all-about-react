import { useState } from 'react';
import { initialLetters } from './Data.js';
import Letter from './Letter.jsx'

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId] = useState(null);

  function handleHover(letter) {
    setHighlightedId(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedId
              
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}