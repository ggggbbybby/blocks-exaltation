import React from 'react'
import _ from 'lodash'

import Swatch from './swatch'
import Form from './form'

const mirror = array => array.slice().concat(array.reverse().slice(1))

class Blocks extends React.Component {
  constructor(props) {
    super(props)
    const block_count = props.block_count || 3
    this.state = { 
      block_count, 
      hrepeat: 2, 
      vrepeat: 2, 
      block_size: 10,
      pattern: this.generatePattern(block_count)
     }
  }

  fields() {
    return [
      {
        name: 'Block Count',
        value: this.state.block_count,
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

  generatePattern(block_count) {
    const patternFor = (count) => {
      const seed = Math.floor(Math.random() * Math.floor(2 ** count))
      const binary = seed.toString(2).padStart(count, '0')
      return mirror(Array.from(binary))
    }

    return mirror(_.times(block_count, () => patternFor(block_count)))
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

  render() {
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

export default Blocks