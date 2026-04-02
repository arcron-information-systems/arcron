/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const Page = () => {
  return (
    <div className="relative m-12 bg-transparent">
      <div className="relative z-[1] flex w-full flex-col gap-8 text-[var(--primarydark)]">
        <h2 className="font-['MixCase'] text-[2.75rem] uppercase tracking-[1px] text-transparent [-webkit-text-stroke:1px_var(--primarydark)]">
          // How can your business leverage AI?
        </h2>

        <div>
          <h4 className="mb-8 text-2xl text-[var(--primarydark)]">
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
          <h4 className="mb-6 text-2xl text-[var(--primarydark)]">
            For a free discovery meeting, scan the QR code
          </h4>
          <div />
          <div className="font-normal">
            Arcron Information Systems is your Denver-based AI, web, and
            software partner. We help businesses reach market faster, streamline
            operations, and reduce costs through tailored, AI-driven
            integrations and custom web and software solutions.
            <p className="mt-4">Arcron: Begin boundlessly.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 z-0 w-1/4 -translate-y-1/2">
        <QRCodeSVG
          value="https://blinq.me/kU77ykyabSbg"
          size={250}
          level="H"
          imageSettings={{
            src: "/images/arcronsymbolblack.png",
            width: 90,
            height: 90,
            excavate: true,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
