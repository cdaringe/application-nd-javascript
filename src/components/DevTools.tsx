import React from "react";

interface DevToolsProps {
  commands: string[];
  downloads: { name: string; status: string; type: string }[];
}

const DevTools: React.FC<DevToolsProps> = ({ commands, downloads }) => {
  return (
    <div className="hidden md:block w-1/3 bg-gray-900 text-white p-4 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Network</h3>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Status</th>
              <th className="text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="bg-blue-800">
              <td>ndjavascript.cdaringe.com</td>
              <td>200</td>
              <td>nd-javascript</td>
            </tr> */}
            {downloads.map((download, index) => (
              <tr
                key={index}
                className={
                  download.status === "200" ? "bg-green-800" : "bg-gray-400"
                }
              >
                <td className="whitespace-nowrap">{download.name}</td>
                <td className="whitespace-nowrap">{download.status}</td>
                <td className="whitespace-nowrap">{download.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {commands.length ? (
        <div>
          <h4 className="text-md font-semibold mb-2">nd-javascript</h4>
          <div className="bg-gray-800 p-2 overflow-x-auto whitespace-nowrap">
            {commands.map((command, index) => (
              <div
                key={index}
                className="py-1 border-b border-gray-700 last:border-b-0"
              >
                {command}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DevTools;
