import React from 'react'
import _ from 'lodash'

import Swatch from './swatch'

const mirror = array =>
  array.slice().concat(
    array
      .slice()
      .reverse()
      .slice(1)
  )

const threebythree = symmetrical => {
  // generate a binary number between "0000" and "1111"
  const seed = symmetrical
    ? _.sample([0, 1, 6, 7, 14, 15])
    : _.sample(_.range(16))
  const binary = Array.from(seed.toString(2).padStart(4, '0'))

  // reflect that 4 bit number in a 9 bit grid
  const row1 = mirror(binary.slice(0, 2))
  const row2 = mirror(binary.slice(2, 4))
  return [row1, row2, row1]
}

class Motif extends React.Component {
  constructor(props) {
    super(props)
    const block_count = props.block_count || 3
    this.state = {
      block_count: block_count,
      pattern: this.generatePattern(block_count),
      hrepeat: 1,
      vrepeat: 1,
      block_size: 10,
    }
  }

  generatePattern(block_count) {
    // a motif is a square pattern of blocks that follows certain symmetrical rules
    // blocks along the diagonal (numbers) must exhibit 4-way symmetry while other blocks can have either 2- or 4-way symmetry.

    // generalized pattern
    // s0 f0 f1 f2
    // *0 s1 f3 f4
    // *1 *3 s2 f5
    // *2 *4 *5 s3

    const filler_count = (block_count ** 2 - block_count) / 2
    const filler = _.times(filler_count, threebythree)
    const diagonals = _.times(block_count, () => threebythree(block_count > 1))

    const blocks = []
    for (let i = 0; i < block_count; i++) {
      const row = []
      for (let j = 0; j < block_count; j++) {
        if (i < j) row[j] = filler.pop()
        if (i === j) row[j] = diagonals.pop()
        if (i > j) row[j] = blocks[j][i]
      }
      blocks[i] = mirror(row)
    }
    const flat_blocks = mirror(blocks).map(block_row => {
      // block_row is a row of 3x3s
      // it should return a three element array
      return _.times(3, idx => _.flatMap(block_row, block => block[idx]))
    })

    return _.flatten(flat_blocks)
  }

  incrementBlockCountAndRefresh(delta = 1) {
    const block_count = Math.max(1, this.state.block_count + delta)
    this.setState({
      ...this.state,
      block_count,
      pattern: this.generatePattern(block_count),
    })
  }

  increment(field, delta = 1) {
    this.setState({
      ...this.state,
      [field]: Math.max(1, this.state[field] + delta),
    })
  }

  onFrameClick({ row, col, del }) {
    const clickAt = (arr, idx) =>
      del
        ? arr.slice(0, idx).concat(arr.slice(idx + 1))
        : arr.slice(0, idx + 1).concat(arr.slice(idx))
    if (row != null) {
      const length = this.state.pattern.length
      const pattern = clickAt(this.state.pattern, row % length)
      this.setState({ ...this.state, pattern: pattern })
    }

    if (col != null) {
      const width = this.state.pattern[0].length
      const pattern = this.state.pattern.map(row => clickAt(row, col % width))
      this.setState({ ...this.state, pattern: pattern })
    }
  }

  render() {
    // a motif is a square pattern of blocks that follows certain symmetrical rules
    // blocks along the diagonal (numbers) must exhibit 4-way symmetry while other blocks can have either 2- or 4-way symmetry.

    // generalized pattern
    // s0 f0 f1 f2
    // f0 s1 f3 f4
    // f1 f3 s2 f5
    // f2 f4 f5 s3

    return (
      <div>
        <div>
          <Swatch {...this.state} frameClick={pos => this.onFrameClick(pos)} />
        </div>

        <div>
          <div>
            Block Count:{' '}
            <button onClick={() => this.incrementBlockCountAndRefresh(-1)}>
              -
            </button>{' '}
            {this.state.block_count * 2}{' '}
            <button onClick={() => this.incrementBlockCountAndRefresh()}>
              +
            </button>
          </div>{' '}
          <div>
            hrepeat:{' '}
            <button onClick={() => this.increment('hrepeat', -1)}>-</button>{' '}
            {this.state.hrepeat}{' '}
            <button onClick={() => this.increment('hrepeat')}>+</button>
          </div>{' '}
          <div>
            vrepeat:{' '}
            <button onClick={() => this.increment('vrepeat', -1)}>-</button>{' '}
            {this.state.vrepeat}{' '}
            <button onClick={() => this.increment('vrepeat')}>+</button>
          </div>{' '}
          <div>
            block_size:{' '}
            <button onClick={() => this.increment('block_size', -1)}>-</button>{' '}
            {this.state.block_size}{' '}
            <button onClick={() => this.increment('block_size')}>+</button>
          </div>
          <button
            onClick={() =>
              this.setState({
                ...this.state,
                pattern: this.generatePattern(this.state.block_count),
              })
            }
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }
}

export default Motif
