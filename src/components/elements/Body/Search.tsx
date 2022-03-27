import React, { useState } from 'react'

const Search: React.FC = () => {
  const [currentName, setCurrentName] = useState('')
  const url = `/summoner/${currentName}`
  return (
    <section className="searcher">
      <form action={url} method="post">
        <input 
          type="search" 
          className="searcher__input" 
          maxLength={16}
          placeholder="procurar por invocador..."
          onChange={event => setCurrentName(event.target.value)}
        />
        <span className="searcher__button">
          <span className="searcher__icon"></span>
        </span>
      </form>
    </section>
  )
}


export default Search
