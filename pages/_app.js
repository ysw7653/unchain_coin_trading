import 'bootstrap/dist/css/bootstrap.css'
import NavigationBar from '../components/NavigationBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
