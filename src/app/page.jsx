"use client";
import React, { useState } from "react";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                SupportHub
              </span>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <a
                href="/account/signin"
                className="text-gray-500 hover:text-gray-700"
              >
                Sign In
              </a>
              <a
                href="https://tally.so/r/wazMLv"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="/account/signin"
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                Sign In
              </a>
              <a
                href="https://tally.so/r/wazMLv"
                className="block px-3 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started Now
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Manage your support group</span>
                  <span className="block text-indigo-600">in 3 clicks</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  The all-in-one solution for support group creators. Manage
                  your members, organize your sessions, and grow your community
                  effortlessly.
                </p>
                <div className="mt-5 sm:mt-8 flex justify-center">
                  <div className="rounded-md shadow">
                    <a
                      href="https://tally.so/r/wazMLv"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started Now
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Easy to use
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Manage your support group with just a few clicks, no technical
                skills required
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No technical hassle
              </h3>
              <p className="mt-2 text-base text-gray-500">
                We handle all the technical aspects for you, focus on your
                community
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                All-in-one
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Member management, sessions, and payments all in one platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple and transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500"></p>
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
            <div className="px-6 py-8 lg:flex-shrink-1 lg:p-12">
              <h3 className="text-2xl font-extrabold text-gray-900">Premium</h3>
              <p className="mt-6 text-base text-gray-500">
                Everything you need to manage your support group professionally
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <h4 className="flex-shrink-0 pr-4 text-4xl font-extrabold text-gray-900">
                    $19.99
                  </h4>
                  <div className="flex-shrink-0 text-gray-400">/month</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-base text-gray-500">
                    Unlimited members
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-base text-gray-500">
                    Unlimited group sessions
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-base text-gray-500">
                    Advanced management tools
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-base text-gray-500">
                    Priority support
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://tally.so/r/wazMLv"
                  className="block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Get started now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;