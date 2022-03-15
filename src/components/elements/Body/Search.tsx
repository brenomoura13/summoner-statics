import React, { useState } from 'react'

const Search: React.FC = () => {
  const [currentName, setCurrentName] = useState('')
  const url = `/summoner/${currentName}`
  return (
    <form action={url} method="post" className='searcher'>
      <input type="text" placeholder="Procurar invocador..." className='searcher__input' onChange={event => setCurrentName(event.target.value)}/>
      <div className="searcher__button"></div>
    </form>
  )
}

export default Search