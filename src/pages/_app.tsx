import { AppProps } from 'next/app'
import '../styles/theme.scss'
import '../styles/main.scss'
import '../styles/cabecalho.scss'
import '../styles/rodape.scss'
import '../styles/searcher.scss'
import '../styles/summoner.scss'
import '../styles/sobre.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <Component {...pageProps} /> 
  )
}

export default MyApp