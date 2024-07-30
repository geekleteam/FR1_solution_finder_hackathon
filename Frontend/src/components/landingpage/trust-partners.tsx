import React from 'react'

const TrustPartners = () => {
  return (
    <div className="w-full">
    <div className="container flex flex-col items-center gap-8 mx-auto my-32">
      <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
        Trusted by the world best companies
      </p>
      <div className="flex flex-wrap items-center justify-center w-full gap-6 lg:gap-0 lg:flex-nowrap lg:justify-between">
        <span>
          <img src="/logo.png" className="w-[155px]" />
        </span>
        <span>
          <img src="/logo.png" className="w-[155px]" />
        </span>
        <span>
          <img src="/logo.png" className="w-[155px]" />
        </span>
        <span>
          <img src="/logo.png" className="w-[155px]" />
        </span>
        <span>
          <img src="/logo.png" className="w-[155px]" />
        </span>
      </div>
    </div>
  </div>

  )
}

export default TrustPartners