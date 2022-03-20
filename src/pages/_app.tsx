import { AppProps } from 'next/app'
import '../styles/theme.scss'
import '../styles/main.scss'
import '../styles/cabecalho.scss'
import '../styles/rodape.scss'
import '../styles/searcher.scss'
import '../styles/summoner.scss'
import '../styles/Summoner/summoner-infos.scss'
import '../styles/sobre.scss'
import '../styles/jinx.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <Component {...pageProps} /> 
  )
}

export default MyApp