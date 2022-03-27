const apiKey:string = process.env.RIOT_KEY

const getSummoner = async (summonerName: string | string[]) => {
  const res = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
  const data = await res.json()
  return data
}

const getSummonerDetails = async (summonerId: string) => {
  const res = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`)
  const data = await res.json()
  return data
}

const getSummonerChampionsMasterys = async (summonerId: string) => {
  const res = await fetch(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`)
  const data = await res.json()
  var summonerMasterys = data.map((obj: { championId: number, championLevel: number, championPoints: number, lastPlayTime: number }) => {
    return {
      championId: obj.championId,
      championLevel: obj.championLevel,
      championPoints: obj.championPoints,
      lastPlayTime: obj.lastPlayTime
    }
  })
  return summonerMasterys.slice(0, 3)
}

const getSummonerMatches = async (summonerPuuid: string) => {
  const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=5&api_key=${apiKey}`)
  const data = await res.json()
  const matchesDetails = await getSummonerMatchesDetails(summonerPuuid, data)
  return matchesDetails
}

const getSummonerMatchesDetails = async (summonerPuuid: string, matchId: string[]) => {
  // for (let i = 0; i < matchId.length; i++) {
  //   const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId[i]}?api_key=${apiKey}`)
  //   const data = await res.json()
  //   console.log(data.info.perks);
  // }
  const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId[1]}?api_key=${apiKey}`)
  const data = await res.json()
  return data
}

export {
  getSummoner,
  getSummonerDetails,
  getSummonerChampionsMasterys,
  getSummonerMatches
}