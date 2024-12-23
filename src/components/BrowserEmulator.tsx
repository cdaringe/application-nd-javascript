"use client";

import React from "react";
import DevTools from "./DevTools";

interface BrowserEmulatorProps {
  title: string;
  content: React.ReactNode;
  className?: string;
  commands: string[];
  downloads: { name: string; status: null | string; type: string }[];
  url: string;
}

const BrowserEmulator = React.forwardRef<HTMLDivElement, BrowserEmulatorProps>(
  (
    {
      title = "NDJavaScript Emulator - Please load a page",
      content,
      className = "",
      commands,
      downloads,
      url,
    },
    ref
  ) => {
    return (
      <div
        className={`w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden ${className}`}
      >
        <div className="flex h-[calc(60vh-8rem)]">
          <div className="flex flex-col w-full md:w-2/3">
            {/* macOS-like window controls */}
            <div className="bg-gray-200 px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm font-medium text-gray-700 flex-grow text-center">
                {title}
              </div>
            </div>

            {/* Address bar */}
            <div className="bg-white border-t border-b border-gray-300 px-4 py-2">
              <div className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-800">
                {url || "https://ndjavascript.cdaringe.com/"}
              </div>
            </div>

            {/* Content area */}
            <div
              ref={ref}
              className="emulator-main bg-white flex-grow overflow-auto "
            >
              {content}
            </div>
          </div>
          <DevTools commands={commands} downloads={downloads} />
        </div>
      </div>
    );
  }
);

BrowserEmulator.displayName = "BrowserEmulator";

export default BrowserEmulator;
