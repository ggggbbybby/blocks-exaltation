import React from 'react'
import _ from 'lodash'

const repeat = (array, times) => _.flatten(Array(times).fill(array))

const Swatch = ({ pattern, block_size, hrepeat, vrepeat, frameClick }) => {
  const expanded_pattern = repeat(
    pattern.map(row => repeat(row, hrepeat)),
    vrepeat
  )

  const rows = expanded_pattern.length
  const cols = expanded_pattern[0].length
  const rect = (row, col, val, size, onClick) => (
    <rect
      key={`row-${row}-col-${col}`}
      x={3 + col * size}
      y={3 + row * size}
      height={size}
      width={size}
      fill={
        val === 'frame' ? 'dodgerblue' : val === '0' ? 'transparent' : 'black'
      }
      stroke="#888"
      strokeWidth="2"
      onClick={onClick}
    />
  )

  return (
    <svg
      height={(rows + 1) * block_size + 4}
      width={(cols + 1) * block_size + 4}
    >
      {expanded_pattern.map((pick, row) =>
        pick.map((val, col) => rect(row, col, val, block_size))
      )}
      {_.times(rows, row =>
        rect(row, cols, 'frame', block_size, event => {
          event.preventDefault()
          frameClick({ row: row, del: event.ctrlKey })
        })
      )}
      {_.times(cols, col =>
        rect(rows, col, 'frame', block_size, event => {
          event.preventDefault()
          frameClick({ col: col, del: event.ctrlKey })
        })
      )}
    </svg>
  )
}

export default Swatch
