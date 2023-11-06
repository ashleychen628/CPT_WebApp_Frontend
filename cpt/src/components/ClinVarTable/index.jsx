import React, { useState, useEffect, useMemo } from 'react';
import TableContents from './TableContents';
import './ClinVarTable.scss';

function createData(mutant, label, score, mutant_sort, label_sort) {
  return {mutant, label, score, mutant_sort, label_sort};
}

const getRows = (data, scores) => {
  let rows = [];
  
  data.map((d) => {
    let aminoAcid = d.mutant.slice(-1);
    let position = parseInt(d.mutant.replace(/[^0-9]/g, '')) - 1;
    let score = 0;
    for (var key in scores[position]) {
      score = scores[position][key][aminoAcid].toFixed(3)
    }
    rows.push(createData(d.mutant, d.label, score, d.mutant_sort, d.label_sort))
  })
  return rows;
}

export default function ClinVarTable(props) {
  const [data, setData] = useState();
  let rows = []
  if (data && props.cptScores) {
    rows = getRows(data, props.cptScores);
  }

  useEffect(() => {
    fetch('https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getTableContents/' + props.proteinId, {
      method: "GET"
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data["all_one_star"]);
      })
  }, []);
  
  return (
    <div>
      <p style={{fontSize: 20,
                  color: "black",
                  textAlign: "left",
                  fontFamily: "Helvetica",
                  fontWeight: "bold"
                }}>
                    ClinVar Variants Table
      </p>
      <p style={{fontSize: 13,
                  color: "#808080",
                  textAlign: "left",
                  fontFamily: "Helvetica"
                }}>
        (* Variants labeled N/A are either VUS or 0-star annotations)
      </p>
        <div className='TableContents'>
          {rows && < TableContents rows={rows} />}
        </div>
    </div>
  )
}