import React from "react";

const PreI = ({ children }: { children: React.ReactNode }) => (
  <pre className="inline text-wrap break-words">{children}</pre>
);

const appndjson = (
  <>
    {" "}
    <PreI>application/nd-javascript</PreI>{" "}
  </>
);

export const Spiel: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{appndjson} tutorial</h1>

      <div className="text-xl text-gray-700 mb-4">
        This tutorial demonstrates how the {appndjson}
        {" MIME"} type could work. It simulates a stream of newline-delimited
        JavaScript statements and shows how they build & update a web
        application.
      </div>

      <a href="#demo-start" className="block text-blue-500 mb-4">
        Jump right to the demo.
      </a>

      <div className="mb-4">
        {appndjson} <i>itself</i> is not interesting.
        {appndjson} is a means to discuss evolving beyond <PreI>text/html</PreI>{" "}
        {" for transmitting applications."} Sadly, because this capability does
        not actually exist in browsers, the following demonstration is faked.
        Whether a real implementation uses
        <PreI>{" application/binary"}</PreI>, <PreI>application/wasm</PreI>, or
        another similar MIME--any or all would be welcome. {appndjson} is used
        for simplicity and because of its proximity to existing browser APIs.
      </div>
      <div className="mb-4">
        <b>Why do this at all?</b> For many applications, we build executables
        whose core function is an interplay of generating DOM, responding to the
        user, and updating the DOM. Consider web application runtimes, such as{" "}
        <PreI>react</PreI>, <PreI>svelte</PreI>, <PreI>solid</PreI>, etc. These
        toolkits are for building applications--and ultimately, DOM nodes.
        Indeed, they can generate HTML, but that is an important{" "}
        <i>{" secondary "}</i>
        feature. Their primary objective is to make application development
        easier by applying tools that result in a predictable and maintainable
        DOM. Thus, if we have established that our primary application toolkits
        excel at <PreI>DOM-ops</PreI>, why is it then that we commonly burden
        ourselves with also generating HTML? Most senior web-devs have all heard
        of <PreI>VirtualDOM</PreI> by this point. Why is there no{" "}
        <PreI>VirtualHTML</PreI> (/s)? For server side rendering, why do we use
        DOM-first libraries, convert to HTML, then post-hydration, go right back
        to DOM? The answer is that we have to, not that we want to. Can we cut
        out the HTML middleman and operate with DOM from start to finish? HTML
        is wonderful DSL for documents, but for applications it is pure
        overhead. For applications, our community would likely operate on DOM
        directly if the browser would allow us. Imagine if all of the power
        backing browser{"'"}s HTML engines were actually APIs that we could tap
        into at boot time!
      </div>
      <div className="mb-4">
        <b>Let{"'"}s explore a HTML-free web application load!</b>
      </div>
    </>
  );
};
