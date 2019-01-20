import React from 'react'
import _ from 'lodash'

const repeat = (array, times) => _.flatten(Array(times).fill(array));

const Swatch = ({pattern, block_size, hrepeat, vrepeat}) => {
  const expanded_pattern = repeat(pattern.map(row => repeat(row, hrepeat)), vrepeat);

  const height = expanded_pattern.length;
  const width = expanded_pattern[0].length;

  return (
    <svg height={height * block_size + 5} width={width * block_size + 5}>
      {expanded_pattern.map((pick, row) =>
        pick.map((val, col) => (
          <rect
            key={`row-${row}-col-${col}`}
            x={col * block_size}
            y={row * block_size}
            height={block_size}
            width={block_size}
            fill={val === "0" ? "transparent" : "black"}
            stroke="#888"
            strokeWidth="2"
          />
        )
        ))
      }
    </svg>
  )
}

export default Swatch;