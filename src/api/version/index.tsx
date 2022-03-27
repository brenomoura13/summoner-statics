const getLatestLolVersion = async () => {
  const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
  const versions = await response.json()
  return versions[0]
}

export default getLatestLolVersion