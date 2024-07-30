import Menu from '~/components/landingpage/menu'
// import Slider from '../components/landingpage/Slider'
import HeroSection from '~/components/landingpage/hero-section'
import TrustPartners from '~/components/landingpage/trust-partners'
import Productivity from '~/components/landingpage/productivity'
import HowItWorks from '~/components/landingpage/howt-it-works'
import Faq from '~/components/landingpage/faq'
import Footer from '~/components/landingpage/footer'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from '~/components/Loader'
import SliderPage from '~/components/landingpage/slider-page'

const LandingPage = () => {

  const {isLoading} = useAuth0();

  if(isLoading){
    return <Loader/>
  }
  
    return (
        <>
        <div className="flex flex-col w-full">
        <Menu />
        {/* <HeroSection /> */}
        <SliderPage />
        </div>
        {/* <TrustPartners />
        <Productivity />
        <HowItWorks />
        <Faq />
        <Footer /> */}
      </>

    )
}

export default LandingPage