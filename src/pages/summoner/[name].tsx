import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import Image from "next/image";
import Footer from "../../components/elements/Footer/Footer";
import Header from "../../components/elements/Header/Header";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ApiKey = process.env.RIOT_KEY

type Summoner = {
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

type SummonerDetails = {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

type SummonerProps = {
  summoner: Summoner;
  summonerDetails: SummonerDetails;
}

const Summoner = ({ summoner, summonerDetails } : SummonerProps) => {
  let summonerName: string = summoner.name
  let summonerLevel: number = summoner.summonerLevel
  let summonerIcon: number = summoner.profileIconId
  let summonerRank: string = summonerDetails.rank
  let summonerLeaguePoints: number = summonerDetails.leaguePoints
  let summonerTier: string = summonerDetails.tier
  let summonerWins: number = summonerDetails.wins
  let summonerLosses: number = summonerDetails.losses

  if (summoner.status?.status_code && summoner.status.status_code === 404) {
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
  }

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
        :("LP: " + summonerLeaguePoints + " - WR: " + ((summonerWins/(summonerWins+summonerLosses))*100).toFixed(2) + "%")}
        </div>
        </div>
        <h1 className="summoner__name"><b>Invocador:</b> { summonerName } </h1>
        <h2 className="summoner__level"><b>Level</b>: { summonerLevel }</h2>
        <Link href={`/`} passHref>
          <button className="summoner__button">Voltar</button>
        </Link>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params
  const requestSummoner = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${ApiKey}`)
  const dataSummoner = await requestSummoner.json()
  const summonerId = dataSummoner.id
  var filterBySoloQueue = []
  if (summonerId) {
    var requestSumDetails = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${ApiKey}`)
    var dataSumDetails = await requestSumDetails.json()
    filterBySoloQueue = dataSumDetails.filter((obj: { queueType: string }) => obj.queueType === 'RANKED_SOLO_5x5')
  }
  return {
    props: {
      summoner: dataSummoner,
      summonerDetails: filterBySoloQueue[0] || { tier: 'UNRANKED', rank: '', leaguePoints: 0 }
    }
  }
}
  
export default Summoner