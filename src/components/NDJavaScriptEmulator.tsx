"use client";

import React, { createRef, useEffect, useState } from "react";
import BrowserEmulator from "./BrowserEmulator";
import StepExplanation from "./StepExplanation";
import SuperMorioFace from "./SuperMorioFace";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import ScreenToSmallModal from "./ScreenTooSmallModal";

const NDJavaScriptEmulator: React.FC = () => {
  const nextButtonRef = createRef<HTMLButtonElement>();
  const contentWindowRef = createRef<HTMLDivElement>();
  const [currentStep, setCurrentStep] = useState(0);
  const [pageTitle, setPageTitle] = useState(
    "NDJavaScript Emulator - Follow steps below to begin"
  );
  const [pageUrl, setPageUrl] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<
    { name: string; status: null | string; type: string }[]
  >([]);

  useEffect(() => {
    const isAutoMode =
      new URL(window.location.href).searchParams.get("auto") === "1";
    if (!isAutoMode) {
      return;
    }
    const timeout = setTimeout(() => {
      const el = nextButtonRef.current;
      if (!el) {
        return;
      }
      el.click();
    }, 10);
    return () => clearTimeout(timeout);
  }, [nextButtonRef]);

  const ndJavaScriptCommands = [
    {
      name: "Start loading a page",
      description:
        "Simulate starting a page load. On large viewports, you'll see the network request in the simulated devtools",
      type: "user-action",
      code: "GET https://ndjavascript.cdaringe.com/",
      execute: () => {
        setPageUrl("https://ndjavascript.cdaringe.com/");
        setDownloads((prev) => [
          ...prev,
          {
            name: "ndjavascript.cdaringe.com",
            status: null,
            type: "",
          },
        ]);
      },
    },
    {
      name: "Page stream begins",
      description: (
        <>
          The HTTP handshake will succeed, and we are now streaming the page
          instructions. Specifically, instead of a{" "}
          <pre className="inline">content-type: text/html</pre>, we have a
          stream of{" "}
          <pre className="inline">content-type: application/nd-javascript</pre>!
        </>
      ),
      type: "event",
      code: "GET https://ndjavascript.cdaringe.com/",
      execute: () => {
        setDownloads([
          {
            name: "ndjavascript.cdaringe.com",
            status: "200",
            type: "nd-javascript",
          },
        ]);
      },
    },
    {
      name: "Set page title",
      description: (
        <>
          Here we see our first nd-javascript command in our HTTP stream.
          Historically, we would use HTML to set a title, a la{" "}
          <pre className="inline">{"<title>some boring page</title>"}</pre>. Who
          needs HTML!? We have JavaScript!
        </>
      ),
      type: "application/nd-javascript",
      code: 'document.title = "Super Morio Adventure"',
      execute: () => {
        setPageTitle("Super Morio Adventure");
        setExecutedCommands((prev) => [
          ...prev,
          'document.title = "Super Morio Adventure"',
        ]);
      },
    },
    (() => {
      const code = `var style=document.createElement('style'); style.textContent='...'; document.head.appendChild(styleElement);`;
      return {
        name: "Set initial styles",
        description:
          "Immediately inline some styles. We want to see something while the rest of our program streams in.",
        type: "application/nd-javascript",
        code,
        execute: () => {
          setPageContent(
            (prevContent) => `
            ${prevContent}
            <style>
              .emulator-main {
                background-color: lightblue;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            </style>
          `
          );
          setExecutedCommands((prev) => [...prev, code]);
        },
      };
    })(),
    (() => {
      const code =
        'var m = document.createElement("main"); document.body.appendChild(m); /* create SVG face, append it */';
      return {
        name: "Create initial DOM nodes",
        code,
        description:
          "Create the initial DOM nodes for the page. Again, we used to use HTML for this. We could even continue to do so! However, our application doesn't deal in HTML--it deals in JavaScript, including the window and its APIs! Once content is on the screen, it is not immediately interactable. If a proposal like this were ever be adopted, it is not yet clear when interactability would be granted. Nonetheless, we have not bound behavior yet--just visual nodes.",
        type: "application/nd-javascript",
        execute: () => {
          const basicFaceSVG = renderToString(<SuperMorioFace />);
          setPageContent(
            (
              prevContent
            ) => `${prevContent}<main><div id='root'>${basicFaceSVG}</div></main>
        `
          );
          setExecutedCommands((prev) => [...prev, code]);
        },
      };
    })(),

    {
      name: "Start downloading styles",
      description:
        "Perhaps our application needs some external CSS. Sure--go grab it! We used to use <link /> for such an operation.",
      type: "application/nd-javascript",
      code: 'import("styles.css", { assert: { type: "css" } })',
      execute: () => {
        setDownloads((prev) => [
          ...prev,
          { name: "styles.css", status: null, type: "text/css" },
        ]);
        setExecutedCommands((prev) => [
          ...prev,
          'import("styles.css", { assert: { type: "css" } })',
        ]);
      },
    },
    (() => {
      const code = 'import("./super-morio").then(() => boot()))';
      return {
        name: "Start downloading assets",
        description:
          "We are streaming nd-javascript because we are fundamentally building an application, not a simple document. Thus, let us fetch the javascript powering our interactive application. For small applications, it may be common to not make external requests at all, and instead continue stream in code within this open stream.",
        type: "application/nd-javascript",
        code,
        execute: () => {
          setDownloads((prev) => [
            ...prev,
            { name: "super-morio.js", status: null, type: "javascript" },
          ]);
          setExecutedCommands((prev) => [...prev, code]);
        },
      };
    })(),
    (() => {
      const code = `const meta = document.createElement('meta'); meta.name = 'description'; meta.content = 'This is a tutorial for the application/nd-javascript MIME type.';`;
      return {
        name: "Set page metadata",
        description:
          "We want bots and crawlers to know what this application is about--prepare metadata for them.",
        type: "application/nd-javascript",
        code,
        execute: () => {
          setExecutedCommands((prev) => [...prev, code]);
        },
      };
    })(),
    {
      name: "Event: CSS loaded",
      type: "event",
      description:
        "This event is fired when the CSS file has been loaded. We make it a descrete step in this tutorial so you can observe the effects.",
      code: "stylesheet#onLoad",
      execute: () => {
        setDownloads((prev) =>
          prev.map((it) => {
            if (it.name === "styles.css") it.status = "200";
            return it;
          })
        );
        setPageContent(
          (prevContent) =>
            `<style>
            .emulator-main {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;

              background-image: url('super-morio.webp');
              background-size: calc(4% + 200px) calc(4% + 200px);
              background-repeat: repeat;
            }
          </style>
          ${prevContent}
        `
        );
      },
    },
    (() => {
      const code = `const boot = () => ReactDOM.hydrateRoot(document.getElementById("root"), <SuperMorioFace />)`;
      return {
        name: "React hydration",
        description:
          "Prepare a boot function. This function will be invoked per the above code when our remote javascript finishes loading.",
        type: "application/nd-javascript",
        code,
        execute: () => {
          setExecutedCommands((prev) => {
            return [...prev, code];
          });
        },
      };
    })(),
    {
      name: "Event: JS loaded",
      type: "event",
      description: (
        <>
          This event is fired when the JS file has been loaded. Notice that in
          the current state, the devtools show the JS file as a gray color, thus
          still loading. Also observe that the face in the GUI is non
          interactable. Let us simulate the JS file loading. Afterwards, the
          boot function will have completed and the app should be interactable!{" "}
          <b>Press Next and then play with Super Morio{"'"}s face!</b>
        </>
      ),
      code: "importScript#onLoad",
      execute: () => {
        setDownloads((prev) =>
          prev.map((it) => {
            if (it.name === "super-morio.js") it.status = "200";
            return it;
          })
        );
        setTimeout(() => {
          const el = document.getElementById("root");
          hydrateRoot(
            el!,
            <React.StrictMode>
              <SuperMorioFace />
            </React.StrictMode>
          );
        }, 50);
      },
    },
  ];

  const handleNext = () => {
    if (currentStep < ndJavaScriptCommands.length) {
      ndJavaScriptCommands[currentStep].execute();
      setCurrentStep((prev) => prev + 1);

      setTimeout(() => {
        const steps = document.querySelectorAll(".step");
        if (steps[currentStep + 1]) {
          steps[currentStep + 1].scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 10);
    }
  };

  return (
    <>
      <ScreenToSmallModal targetRef={contentWindowRef} />
      <div className="min-h-screen bg-gray-100">
        <div className="w-full bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-12 pb-4">
              <h1 className="text-4xl font-bold mb-4">
                application/nd-javascript tutorial
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                This tutorial demonstrates how the proposed
                application/nd-javascript MIME type works. It simulates a stream
                of newline-delimited JavaScript statements and shows how they
                build & update a web application.
              </p>
              <p className="mb-4">
                application/nd-javascript itself is not the interesting part of
                this demonstration. Avoiding usage of text/html is the
                interesting part. Sadly, because this capability does not
                actually exist in browsers, the demonstration is only faked.
                Whether a real implementation uses application/binary,
                application/wasm, or some other similar MIME--any or all would
                be welcome. application/nd-javascript is used for simplicity and
                because it has parity with existing behavior supported by
                browsers for text/html.
              </p>
              <p className="mb-4">
                <b>Why do this at all?</b> In many applications, our executables
                generate DOM. Why is it then, that we must also generate HTML,
                distribute complex artifacts,only to then switch back to
                generating DOM in the browser? Can we not just generate DOM from
                the start? HTML is wonderful, but there is no need for it, in
                the server or in the browser, if the browser simply would allow
                us. Converting from {"DOM => HTML => DOM"} adds complexity to
                our applications and also does not give us full control of our
                application!
              </p>
              <p className="mb-4">
                <b>Let{"'"}s explore a HTML-free web application load. </b>
              </p>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-10 w-full bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border border-b-gray-200 relative ">
            <BrowserEmulator
              ref={contentWindowRef}
              title={pageTitle}
              content={
                <>
                  <div dangerouslySetInnerHTML={{ __html: pageContent }} />
                </>
              }
              commands={executedCommands}
              downloads={downloads}
              url={pageUrl}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
          <div>
            {ndJavaScriptCommands.map((command, index) => {
              const isVisible = index <= currentStep;
              if (!isVisible) {
                return null;
              }
              return (
                <div
                  key={index}
                  className="mb-4 last:mb-0 pt-4 first:pt-0 border-t first:border-t-0 border-gray-200"
                >
                  <StepExplanation
                    step={index}
                    name={command.name}
                    type={command.type}
                    code={command.code}
                    // instruction={command.name}
                    description={command.description}
                  />
                  {index === currentStep &&
                    index < ndJavaScriptCommands.length && (
                      <div className="float-end mt-1">
                        <button
                          ref={nextButtonRef}
                          onClick={handleNext}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Next
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NDJavaScriptEmulator;
