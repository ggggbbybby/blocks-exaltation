import React from 'react'
import _ from 'lodash'

import Swatch from './swatch'
import Form from './form'

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

  increment(field, delta, refresh=false) {
    if (refresh) {
      const block_delta = field === 'block_count' ? delta : 0
      const block_count = Math.max(1, this.state.block_count + block_delta)
      const pattern = this.generatePattern(block_count)
      this.setState({
        ...this.state,
        pattern,
        [field]: Math.max(this.state[field] + delta, 1),
      })
    } else {
        this.setState({
        ...this.state,
        [field]: Math.max(this.state[field] + delta, 1),
      })
    }
  }

  fields() {
    return [
      {
        name: 'Block Count',
        value: this.state.block_count * 2,
        increment: () => this.increment('block_count', 1, true),
        decrement: () => this.increment('block_count', -1, true),
      },

      {
        name: 'Horizontal Repeats',
        value: this.state.hrepeat,
        increment: () => this.increment('hrepeat', 1),
        decrement: () => this.increment('hrepeat', -1),
      },

      {
        name: 'Vertical Repeats',
        value: this.state.vrepeat,
        increment: () => this.increment('vrepeat', 1),
        decrement: () => this.increment('vrepeat', -1),
      },

      {
        name: 'Block Size',
        value: this.state.block_size,
        increment: () => this.increment('block_size', 1),
        decrement: () => this.increment('block_size', -1),
      },     
    ]
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
      <div style={{ display: 'flex' }}>
        <Form fields={this.fields()} refresh={() => this.setState({ ...this.state, pattern: this.generatePattern(this.state.block_count)})}/>
        <div style={{ flex: '1' }}>
          <Swatch {...this.state} updatePattern={(pattern) => this.setState({...this.state, pattern})} />
        </div>
      </div>
    )
  }
}

export default Motif
