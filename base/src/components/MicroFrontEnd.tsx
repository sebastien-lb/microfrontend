import React, { useEffect } from "react";

interface OwnProps {
  history: any;
  name: string;
  host: string;
}

type Props = OwnProps;

export const MicroFrontEnd: React.FC<Props> = ({ name, history, host }) => {
  const renderMicroFrontend = () => {
    console.log("render micro front-end");
    (window as any)[`render${name}`](`${name}-container`, history);
    // E.g.: window.renderBrowse('browse-container', history);
  };

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const promises = Object.keys(manifest["files"])
          .filter((key) => key.endsWith(".js"))
          .reduce((sum: any, key) => {
            sum.push(
              new Promise((resolve) => {
                const path = `${host}${manifest["files"][key]}`;
                const script = document.createElement("script");
                if (key === "main.js") {
                  script.id = scriptId;
                }
                script.onload = () => {
                  resolve();
                };
                script.src = path;
                document.head.appendChild(script);
              })
            );
            return sum;
          }, []);
        //@ts-ignore
        Promise.allSettled(promises).then(() => {
          renderMicroFrontend();
        });
      });

    return function cleanup() {
      (window as any)[`unmount${name}`](`${name}-container`);
    };
  });

  return <main id={`${name}-container`} />;
};
