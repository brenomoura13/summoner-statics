/* eslint-disable react/jsx-key */
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import Image from "next/image";
import Footer from "../../components/elements/Footer/Footer";
import Header from "../../components/elements/Header/Header";
import React from "react";
import Link from "next/link";

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
      <>
        <NextSeo
        title="Não encontrado | Summoner Statics"
        description='Estatísticas do invocador.'
        />
        <Header />
        <div className="summoner">
          <div className="summoner__icon">
            <Image 
              src={`/assets/imagens/not-found.png`} 
              alt="Icone do invocador" 
              width={"128px"}
              height={"128px"}
            />
          </div>
          <h1 className="summoner__name">Invocador não foi encontrado <b>:(</b></h1>
          <Link href={`/`} passHref>
            <button className="summoner__button">Voltar</button>
          </Link>
        </div>
       
        <Footer />
      </>
    )
    case 403:
      return (
        <>
        <NextSeo
        title="Não encontrado | Summoner Statics"
        description='Estatísticas do invocador.'
        />
        <Header />
        <div className="summoner">
          <div className="summoner__icon">
            <Image 
              src={`/assets/imagens/not-found.png`} 
              alt="Icone do invocador" 
              width={"128px"}
              height={"128px"}
            />
          </div>
          <h1 className="summoner__name">Aplicação <b>não</b> conectada à API da Riot Gomes!</h1>
          <Link href={`/`} passHref>
            <button className="summoner__button">Voltar</button>
          </Link>
        </div>
        <Footer />
      </>
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
    <>
      <NextSeo
      title={summonerName}
      titleTemplate="%s | Summoner Statics"
      description='Estatísticas do invocador.'
      />
      <Header />
      <div className="summoner">
        <div className="summoner__icon"
        style={{
          background: `no-repeat center/85% url(http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerIcon}.png)`,
          backgroundSize:`85%`
        }}>
          {summonerTier === 'UNRANKED' ? (
            ''
          ) : (
            <Image
              src={`https://opgg-static.akamaized.net/images/borders2/${summonerTier.toLowerCase()}.png`}
              alt="Borda do Elo"
              width={'120px'}
              height={'120px'}
            />
          )}
        </div>
        <div className="summoner__tier">
          {summonerTier === 'UNRANKED'
            ? 'UNRANKED'
            : summonerTier +
              ' ' +
              (summonerTier === ('CHALLENGER' || 'GRANDMASTER' || 'MASTER')
                ? ''
                : summonerRank
              )}
        <div className="summoner__tier--subinfo">
        {summonerTier === 'UNRANKED' ? "" 
        :("LP: " + summonerLeaguePoints + " - WR: " + summonerWinRate.toFixed(2) + "%")}
        </div>
        </div>
        <h1 className="summoner__name"><b>Invocador:</b> { summonerName } </h1>
        <h2 className="summoner__level"><b>Level</b>: { summonerLevel }</h2>      
          {summonerMasterys.map((champion: any) => (
            <>
              <Image
              src={`https://raw.communitydragon.org/json/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.championId}.png`}
              alt="Borda do Elo"
              width={'120px'}
              height={'120px'}
            />
            <h3>{ champion.championPoints }</h3>
            </>
          ))}        
        <Link href={`/`} passHref>
          <button className="summoner__button">Voltar</button>
        </Link>
      </div>
      <Footer />
    </>
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
  var summonerId = summoner.id
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