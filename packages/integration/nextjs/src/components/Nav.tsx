import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Home</span>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <Link href='/' className='text-sm font-semibold leading-6 text-gray-900'>
            Home
          </Link>
          <Link href='/features' className='text-sm font-semibold leading-6 text-gray-900'>
            Features
          </Link>
          <Link href='/marketplace' className='text-sm font-semibold leading-6 text-gray-900'>
            Marketplace
          </Link>
          <Link href='/company' className='text-sm font-semibold leading-6 text-gray-900'>
            Company
          </Link>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'></div>
      </nav>
      <div className='lg:hidden' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 z-50'></div>
        <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Home</span>
            </Link>
            <button type='button' className='-m-2.5 rounded-md p-2.5 text-gray-700'>
              <span className='sr-only'>Close menu</span>
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <Link
                  href='/'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Home
                </Link>
                <Link
                  href='/features'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Features
                </Link>
                <Link
                  href='/marketplace'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Marketplace
                </Link>
                <Link
                  href='/company'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Company
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
