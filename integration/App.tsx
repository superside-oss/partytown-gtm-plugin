import React from 'react';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">GTM Partytown Plugin</h1>
          <p className="text-lg text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container flex justify-center mx-auto p-4">
          <div className="flex flex-col gap-8 max-w-full md:max-w-prose">

            <div className="flex flex-row gap-8 items-center">
              <div className="h-32 w-32 bg-slate-200 rounded"></div>
              <div className='flex flex-col'>
                <h3 className="text-lg font-bold mb-2">Feature 1</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div className="flex flex-row-reverse gap-8 items-center">
              <div className="h-32 w-32 bg-slate-200 rounded"></div>
              <div className='flex flex-col'>
                <h3 className="text-lg font-bold mb-2">Feature 1</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">News Title 1</h3>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a
                href="#"
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">News Title 2</h3>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a
                href="#"
                className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-bold mb-2">News Title 3</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a
                  href="#"
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-bold mb-2">News Title 4</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a
                  href="#"
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default App;
