import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

body {
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font: 400 1.2rem Montserrat, sans-serif;
}

.cabecalho {
  background: ${props => props.theme.colors.header};
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  width: 100%
}

.cabecalho__logo {
  margin: 5% 0;
  widht: 128px !important;
  height: 128px !important;
}

.cabecalho__nav {
  align-items: center;
  display: flex;
  justify-content: right;
  text-transform: lowercase;
  width: 50%
}

.cabecalho__lista {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style:none;
}

.cabecalho__lista--linha {
  padding-left: 20%;
}

.cabecalho__lista--link {
  color: ${props => props.theme.colors.nav};
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.1s;
}

.cabecalho__lista--link:hover {
  color: ${props => props.theme.colors.linkHover};
  font-size: 1.3rem;
  text-decoration: none;
}

.rodape {
  background: ${props => props.theme.colors.footer};
  bottom:0;
  left:0;
  height: 20px;
  padding: 3% 0;
  position: absolute;
  width: 100%;
}

.rodape__texto {
  color: ${props => props.theme.colors.nav};
  font-size: 0.8rem;
  text-transform: lowercase;
  text-align: center;
}

.negrito {
  color: ${props => props.theme.colors.bold};
  font-weight: bold;
  transition: all 0.2s
}

.negrito:hover {
  cursor: normal;
  transform: scale(0.9)
}
`