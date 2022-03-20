/* eslint-disable react/jsx-key */
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import Image from "next/image";
import Footer from "../../components/elements/Footer/Footer";
import Header from "../../components/elements/Header/Header";
import React from "react";
import Search from "../../components/elements/Body/Search";

const apiKey = process.env.RIOT_KEY

interface summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  status?: {
    status_code?: number | null;
  }
}

interface summonerDetails {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

interface summonerMasteryInfos {
  map?: any;
  championId: number,
  championLevel: number,
  championPoints: number,
  lastPlayTime: number 
}

interface summonerProps {
  summoner: summoner;
  summonerDetails: summonerDetails;
  summonerMasterys: summonerMasteryInfos;
}

const Summoner = ({ summoner, summonerDetails, summonerMasterys } : summonerProps) => {
  if (summoner.status?.status_code) {
    switch (summoner.status.status_code) {
    case 404:
    return (
      <section className="summoner_statics">
        <NextSeo
        title="Não encontrado | Summoner Statics"
        description='Estatísticas do invocador.'
        />
        <Header />
        <Search />
        <div className="summoner">
          <div className="summoner__icon">
            <Image 
              src={`/assets/imagens/not-found.png`} 
              alt="Icone do invocador" 
              width={"128px"}
              height={"128px"}
            />
          </div>
          <h1 className="summoner__text">Invocador não foi encontrado <b>:(</b></h1>
        </div>
       
        <Footer />
      </section>
    )
    case 403:
      return (
        <section className="summoner_statics">
        <NextSeo
        title="Não encontrado | Summoner Statics"
        description='Estatísticas do invocador.'
        />
        <Header />
        <Search />
        <div className="summoner">
          <div className="summoner__icon">
            <Image 
              src={`/assets/imagens/not-found.png`} 
              alt="Icone do invocador" 
              width={"128px"}
              height={"128px"}
            />
          </div>
          <h1 className="summoner__text">Aplicação <b>não</b> conectada à API da Riot Gomes!</h1>
        </div>
        <Footer />
      </section>
      )
    }
  }

  let summonerName: string = summoner.name
  let summonerLevel: number = summoner.summonerLevel
  let summonerIcon: number = summoner.profileIconId
  let summonerRank: string = summonerDetails.rank
  let summonerLeaguePoints: number = summonerDetails.leaguePoints
  let summonerTier: string = summonerDetails.tier
  let summonerWins: number = summonerDetails.wins
  let summonerLosses: number = summonerDetails.losses
  let summonerWinRate: number = ((summonerWins / (summonerWins + summonerLosses)) * 100)

  return (
    <section className="summoner_statics">
      <NextSeo
      title={summonerName}
      titleTemplate="%s | Summoner Statics"
      description='Estatísticas do invocador.'
      />
      <Header />
      <div className="summoner">
      <Search />
        <div className="summoner__infos">
          <div className="summoner__infos--details">
            <div className="summoner__icon"
            style={{
              background: `no-repeat center/85% url(http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerIcon}.png)`,
              backgroundSize:`85%`
            }}>
              <h2 className="summoner__level">{ summonerLevel }</h2>
              <h3 className="summoner__tier">
              {summonerTier === 'UNRANKED'
                ? 'UNRANKED'
                : summonerTier +
                  ' ' +
                  (summonerTier === ('CHALLENGER' || 'GRANDMASTER' || 'MASTER')
                    ? ''
                    : summonerRank
                  )}
              <h4 className="summoner__tier--details">
                {summonerTier === 'UNRANKED' ? "" 
                :("LP: " + summonerLeaguePoints + " - WR: " + summonerWinRate.toFixed(2) + "%")}
              </h4>
              </h3>
                {summonerTier === 'UNRANKED' ? (
                <Image
                  src={`/assets/imagens/unranked.png`}
                  alt="Borda do Elo"
                  width={'120px'}
                  height={'120px'}
                />
                ) : (
                  <Image
                    src={`https://opgg-static.akamaized.net/images/borders2/${summonerTier.toLowerCase()}.png`}
                    alt="Borda do Elo"
                    width={'120px'}
                    height={'120px'}
                  />
                )}
              <h1 className="summoner__name">{ summonerName }</h1>
            </div>
          </div>
          <div className="summoner__championsMasterys">
            {summonerMasterys.map((champion: any) => (
              <div className="summoner__championsMasterys--champion" key={champion}>
                <div className="summoner__championsMasterys--champion--icon">
                  <Image
                  src={`https://raw.communitydragon.org/json/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.championId}.png`}
                  alt="Borda do Elo"
                  width={'120px'}
                  height={'120px'}
                  />
                  <div className="summoner__championsMasterys--champion--level">
                    <Image 
                    src= {`https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_${champion.championLevel}.png`}
                    alt= "Nivel da maestria"
                    width={'120px'}
                    height={'120px'}
                    />
                  </div>
                </div>           
              <h2 className="summoner__championsMasterys--champion--points">{ champion.championPoints.toLocaleString('pt-BR') }</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  var { name } = context.params
  var searchSummonerReq = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`)
  var summoner = await searchSummonerReq.json()
  if (summoner.status?.status_code) {
    return {
      props: {
        summoner: summoner,
      }
    }
  }
  var summonerId: string = summoner.id
  var summonerPuuid: string = summoner.puuid
  var filterBySoloQueue = []
  if (summonerId) {
    var requestSumDetailsReq = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`)
    var dataSumDetails = await requestSumDetailsReq.json()
    filterBySoloQueue = dataSumDetails.filter((obj: { queueType: string }) => obj.queueType === 'RANKED_SOLO_5x5')
    var summonerMasterysReq = await fetch(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`)
    var summonerMasterysRes = await summonerMasterysReq.json()
    var summonerMasterys = summonerMasterysRes.map((obj: { championId: number, championLevel: number, championPoints: number, lastPlayTime: number }) => {
      return {
        championId: obj.championId,
        championLevel: obj.championLevel,
        championPoints: obj.championPoints,
        lastPlayTime: obj.lastPlayTime
      }
    })
    var matchesHistory = await fetch (`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=5&api_key=${apiKey}`)
    var matchesHistoryRes = await matchesHistory.json()
  }
  return {
    props: {
      summoner: summoner,
      summonerDetails: filterBySoloQueue[0] || { tier: 'UNRANKED', rank: '', leaguePoints: 0 },
      summonerMasterys: summonerMasterys.slice(0, 3) || []
    }
  }
}
  
export default Summoner