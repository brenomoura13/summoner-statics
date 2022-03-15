import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyle  from '../styles/global'
import theme from '../styles/theme'
import '../styles/Search/search.scss'
import '../styles/Summoner/summoner.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} /> 
    </ThemeProvider>
  )
}

export default MyApp
