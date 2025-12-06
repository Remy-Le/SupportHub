"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ title, subtitle, description, buttonText, buttonLink }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">{title}</span>
        <span className="block text-indigo-600">{subtitle}</span>
      </h1>
      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
        {description}
      </p>
      <div className="mt-5 sm:mt-8 flex justify-center">
        <div className="rounded-md shadow">
          <a
            href={buttonLink}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

function StoryComponent() {
  return (
    <div>
      <MainComponent
        title="Manage your support group"
        subtitle="without integrating Stripe yourself"
        description="The all-in-one solution for support group creators. Manage your members, organize your sessions, and grow your community effortlessly."
        buttonText="Get Started Now"
        buttonLink="https://tally.so/r/wazMLv"
      />
    </div>
  );
});
}