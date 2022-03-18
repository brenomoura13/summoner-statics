import React, { useState } from 'react'

const Search: React.FC = () => {
  const [currentName, setCurrentName] = useState('')
  const url = `/summoner/${currentName}`
  return (
    <div className="searcher">
      <form action={url} method="post" className='searcher__box'>
      <input type="text" placeholder="Procurar invocador..." maxLength={16} onChange={event => setCurrentName(event.target.value)} />
      <span></span>
      </form>
    </div>

  )
}

export default Search