import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import Image from "next/image";
import Footer from "../../components/elements/Footer/Footer";
import Header from "../../components/elements/Header/Header";
import React from "react";

const ApiKey = 'RGAPI-139463b7-5302-40f9-992d-a513edbea58d'

type Summoner = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  status?: {
    status_code: number | undefined;
  }
}

type SummonerProps = {
  summoner: Summoner;
}

const Summoner = ({ summoner } : SummonerProps) => {
  const summonerName = summoner.name
  const summonerLevel = summoner.summonerLevel
  const summonerIcon = summoner.profileIconId

  if (summoner.hasOwnProperty("status_code") || summoner.status.status_code === 404) {
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
        <div className="summoner__icon">
          <Image 
            src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerIcon}.png`} 
            alt="Icone do invocador" 
            width={"128px"}
            height={"128px"}
          />
        </div>
        <h1 className="summoner__name"><b>Invocador:</b> { summonerName }</h1>
        <h2 className="summoner__level"><b>Level</b>: { summonerLevel }</h2>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params
  const res = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${ApiKey}`)
  const data = await res.json()
  return {
    props: {
      summoner: data,
    }
  }
}
  
export default Summoner