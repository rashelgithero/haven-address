import useDocumentTitle from "../newHooks/useDocumentTitle"
import Banner from "./Banner"
import EstatesSection from "./EstateSection"

function Home() {
      useDocumentTitle('Exclusive Luxury Residences');

  return (
    <div>
        <Banner></Banner>
        <EstatesSection></EstatesSection>
    </div>
  )
}

export default Home