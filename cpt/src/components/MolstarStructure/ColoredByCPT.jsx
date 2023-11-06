import React from 'react';
import { useEffect } from "react";
import { Helmet } from "react-helmet";


export default function ColoredByCPT(props) {
//     useEffect(() => {
//     const script = document.createElement("script")

//     script.src =
//       "/./pdbe-molstar/pdbe-molstar-component-3.1.2.js"
    
//     script.type = "text/javascript"

//     document.body.appendChild(script)

//     return () => {
//       // clean up the script when the component in unmounted
//       document.body.removeChild(script)
//     }
//   }, [])
  function isRegistered(name) {
      return document.createElement(name).constructor.__proto__ !== window.HTMLElement;
    }

    var allElems = document.getElementsByTagName('*');
    var nodeNames = [].map.call(allElems, el => el.nodeName.toLowerCase())
      .filter((value, index, self) => self.indexOf(value) === index)

    console.log('all elements', nodeNames);
    console.log('registered, custom elements', nodeNames.filter(isRegistered))
    
    return (
        <div>
             {/* <Helmet>
                <script type="text/javascript" src="/./pdbe-molstar/pdbe-molstar-component-3.1.2.js"></script>
            </Helmet> */}
             <ashley-cpt id="pdbeMolstarComponent-cpt" custom-data-url={props.custom_data_url}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                    bg-color-r="255" bg-color-g="255" bg-color-b="255" color-by-cpt="true"></ashley-cpt>
              
        </div>
    )
}