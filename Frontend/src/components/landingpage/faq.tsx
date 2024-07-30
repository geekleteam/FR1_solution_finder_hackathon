import React from 'react'

const Faq = () => {
  return (
    <div id='FAQ' className="w-full">
    <div className="container flex flex-col items-center gap-16 mx-auto my-32">
      <div className="flex flex-col w-8/12 gap-2">
        <h2 className="text-3xl font-extrabold text-center md:text-4xl text-dark-grey-900">
          FAQ
        </h2>
        <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
          Our dedicated team has compiled a comprehensive list of frequently
          asked questions to provide you with the information you need.
        </p>
      </div>
      {/* <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2">
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">How long does it typically take to process an order? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">Processing times for orders can vary, but we aim to get your order processed as quickly as possible.</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">Is there an estimated time frame for order processing? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">Our team strives to process orders efficiently. While exact processing times may differ, we work diligently to fulfill your order promptly.</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">Can you tell me about your return policy? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">Of course! Our return policy is designed to provide you with a hassle-free experience. You can review the details of our return policy on our website, and if you have any specific questions, feel free to ask.</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">How do I contact your customer support team? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">Contacting our customer support team is easy. You can reach out to us through the contact form on our website, send an email to our dedicated support address, or call our customer support hotline. We're here to assist you.</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">What payment methods do you accept for online orders? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">We accept a variety of payment methods to make your online shopping experience convenient. You can use major credit cards, PayPal, and other secure payment options at checkout.</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start col-span-1 gap-6 px-8 py-10 rounded-2xl bg-grey-200">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"></path>
                    </svg>
                </span>
                <div className="flex flex-col items-start gap-2">
                    <p className="text-xl font-extrabold text-dark-grey-900">Are there any discounts or promotions currently available? </p>
                    <p className="text-base font-medium leading-7 text-dark-grey-600">We regularly run promotions and discounts to provide our customers with value. To stay updated on our current offers, please visit our promotions page on the website or subscribe to our newsletter.</p>
                    <p>
                    </p>
                </div>
            </div>
        </div> */}
      <div className="space-y-8 flex flex-wrap items-start justify-center ">
        <details className="min-w-[400px] flex-1 group border-s-4 border-pink-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque
            aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="min-w-[400px] flex-1 group border-s-4 border-pink-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque
            aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="min-w-[400px] flex-1 group border-s-4 border-pink-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque
            aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="min-w-[400px] flex-1 group border-s-4 border-pink-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque
            aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>
      </div>
    </div>
  </div>
  )
}

export default Faq