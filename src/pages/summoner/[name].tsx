/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { GetServerSideProps } from "next"
import Image from "next/image";
import Footer from "../../components/elements/Footer/Footer";
import Header from "../../components/elements/Header/Header";
import React, { useEffect } from "react";
import Search from "../../components/elements/Body/Search";
import { NextSeo } from "next-seo"
import { getSummoner, getSummonerChampionsMasterys, getSummonerDetails, getSummonerMatches } from "../../api/summoner";
import getLatestLolVersion from "../../api/version";

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
      <section className="summoner__statics">
        <NextSeo
        title="Não encontrado | Summoner Statics"
        description='Estatísticas do invocador.'
        />
        <Header />
        <Search />
        <div className="summoner">
          <div className="summoner__infos">
            <div className="summoner__icon">
              <Image 
                src={`/assets/imagens/poro-cry.webp`} 
                alt="Icone do invocador" 
                width={"128px"}
                height={"128px"}
                quality={100}
              />
            </div>
            <h1 className="summoner__text--notFound">Invocador não foi encontrado <b>:(</b></h1>
          </div>
        </div>
        <Footer />
      </section>
    )
    case 403:
      return (
        <section className="summoner__statics">
          <NextSeo
          title="Ops! | Summoner Statics"
          description='Estatísticas do invocador.'
          />
          <Header />
          <Search />
          <div className="summoner">
            <div className="summoner__infos">
              <div className="summoner__icon">
                <Image 
                  src={`/assets/imagens/poro-zzz.webp`} 
                  alt="API não conectada" 
                  width={"128px"}
                  height={"128px"}
                  quality={100}
                />
              </div>
              <h1 className="summoner__text--error"><b>FALHOU</b> Aplicação não conectada à API da Rito Gomes!</h1>
            </div>
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
    <section className="summoner__statics">
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
              background: `no-repeat center/85% url(https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerIcon}.png)`,
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
                  src={`/assets/imagens/unranked.webp`}
                  alt="Borda do Elo"
                  width={'120px'}
                  height={'120px'}
                  quality={'100'}
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
                    src= {
                      champion.championLevel >= 4 
                      ? `https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_${champion.championLevel}.png`
                      : `https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_default.png`
                    }
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

export default Summoner

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { name } = context.params
  let summoner = await getSummoner(name)
  if (summoner.status?.status_code) {
    return {
      props: {
        summoner: summoner,
      }
    }
  }
  let summonerId: string = summoner.id
  let summonerPuuid: string = summoner.puuid
  let filterBySoloQueue = []
  if (summonerId) {
    let summonerDetails = await getSummonerDetails(summonerId)
    filterBySoloQueue = summonerDetails.filter((obj: { queueType: string }) => obj.queueType === 'RANKED_SOLO_5x5')
    let summonerChampionsMasterys = await getSummonerChampionsMasterys(summonerId) 
    let summonerMatchesIds = await getSummonerMatches(summonerPuuid)
    return {
      props: {
        summoner: summoner,
        summonerDetails: filterBySoloQueue[0] || { tier: 'UNRANKED', rank: '', leaguePoints: 0 },
        summonerMasterys: summonerChampionsMasterys || []
      }
    }
  }
}