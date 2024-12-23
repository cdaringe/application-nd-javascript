import React from "react";

interface DevToolsProps {
  commands: string[];
  downloads: { name: string; status: string | null; type: string }[];
}

const DevTools: React.FC<DevToolsProps> = ({ commands, downloads }) => {
  return (
    <div className="hidden md:block w-1/3 bg-gray-900 text-white p-4 overflow-scroll">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Network</h3>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left pr-2">Name</th>
              <th className="text-left pr-2">Status</th>
              <th className="text-left pr-2">Type</th>
            </tr>
          </thead>
          <tbody>
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
          <h4 className="text-md font-semibold mb-2">nd-javascript stream</h4>
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
