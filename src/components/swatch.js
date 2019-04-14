import React from 'react'
import _ from 'lodash'

const repeat = (array, times) => _.flatten(Array(times).fill(array))

const onFrameClick = ({row, col, del, pattern}) => {
  const clickAt = (arr, idx) =>
    del
      ? arr.slice(0, idx).concat(arr.slice(idx + 1))
      : arr.slice(0, idx + 1).concat(arr.slice(idx))
  if (row != null) {
    const length = pattern.length
    return clickAt(pattern, row % length)
  }

  if (col != null) {
    const width = pattern[0].length
    return pattern.map(row => clickAt(row, col % width))
  }
}


const Swatch = ({ pattern, block_size, hrepeat, vrepeat, updatePattern }) => {
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
          updatePattern(onFrameClick({ pattern, row, del: event.ctrlKey }))
        })
      )}
      {_.times(cols, col =>
        rect(rows, col, 'frame', block_size, event => {
          event.preventDefault()
          updatePattern(onFrameClick({ pattern, col, del: event.ctrlKey }))
        })
      )}
    </svg>
  )
}

export default Swatch
