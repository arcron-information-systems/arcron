/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import ArcronSymbol from "@/src/components/ArcronSymbol";

const Page = () => {
  return (
    <div className="relative m-12 bg-[var(--primarydark)]">
      <div className="relative z-[1] flex w-full flex-col gap-8">
        <h2 className="font-['MixCase'] text-[2.75rem] uppercase tracking-[1px] text-transparent [-webkit-text-stroke:1px_white]">
          // How can your business leverage AI?
        </h2>

        <div>
          <h4 className="mb-8 text-2xl">
            Supercharge your business with AI-powered solutions:
          </h4>
          <ul>
            <li>
              <span className="font-bold">Automation:</span>
              <p className="font-normal">
                Automate repetitive tasks to free up time for high-impact
                strategic work.
              </p>
            </li>
            <li>
              <span className="font-bold">Insights:</span>
              <p className="font-normal">
                Unlock actionable data insights to make confident decisions.
              </p>
            </li>
            <li>
              <span className="font-bold">Delivery:</span>
              <p className="font-normal">
                Accelerate delivery, improve quality, and reduce costs.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-8 text-2xl">
            For a free consultation, visit <u>arcron.systems</u> or call (309)
            242-6968.
          </h4>
          <div className="font-normal">
            Proudly made in the USA and headquartered in Denver, Colorado,
            Arcron Information Systems is an AI-powered web and software
            partner. We merge your vision with code to help your business reach
            market faster, streamline operations, and reduce costs through
            tailored integrations, automation, and custom software.
            <p className="mt-4">Arcron: Begin boundlessly.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 z-0 w-1/2 -translate-y-1/2">
        <ArcronSymbol color="green" />
      </div>
    </div>
  );
};

export default Page;
