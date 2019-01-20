import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'

const mirror = array => array.slice().concat(array.reverse().slice(1))
const repeat = (array, times) => _.flatten(Array(times).fill(array))

const patternFor = count => {
  const max = 2 ** count
  const seed = Math.floor(Math.random() * Math.floor(max))
  const binary = seed.toString(2).padStart(count, '0')
  return mirror(Array.from(binary))
}

const Swatch = ({ count, hrepeat, vrepeat, block_size }) => {
  const pattern = repeat(
    mirror(_.times(count, () => repeat(patternFor(count), hrepeat))),
    vrepeat
  )

  const height = pattern.length
  const width = pattern[0].length

  return (
    <svg height={height * block_size + 5} width={width * block_size + 5}>
      {pattern.map((pick, row) =>
        pick.map((val, col) => (
          <rect
            key={`row-${row}-col-${col}`}
            x={col * block_size}
            y={row * block_size}
            height={block_size}
            width={block_size}
            fill={val === '0' ? 'transparent' : 'black'}
            stroke="#888"
            strokeWidth="2"
          />
        ))
      )}
    </svg>
  )
}

class Blocks extends React.Component {
  constructor({ count = 5, hrepeat = 2, vrepeat = 2, block_size = 10 }) {
    super()
    this.state = { count, hrepeat, vrepeat, block_size }
  }

  decrement(field) {
    this.setState({
      ...this.state,
      [field]: Math.max(this.state[field] - 1, 1),
    })
  }

  increment(field) {
    this.setState({
      ...this.state,
      [field]: Math.min(this.state[field] + 1, 20),
    })
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{paddingRight: 10}}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div>Number of Blocks:</div>
            <span style={{ minWidth: '4em', textAlign: 'right' }}>
              <button onClick={() => this.decrement('count')}>-</button>
              {this.state.count}
              <button onClick={() => this.increment('count')}>+</button>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div>Horizontal Repeats:</div>
            <span style={{ minWidth: '4em', textAlign: 'right' }}>
              <button onClick={() => this.decrement('hrepeat')}>-</button>
              {this.state.hrepeat}
              <button onClick={() => this.increment('hrepeat')}>+</button>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div>Vertical Repeats:</div>
            <span style={{ minWidth: '4em', textAlign: 'right' }}>
              <button onClick={() => this.decrement('vrepeat')}>-</button>
              {this.state.vrepeat}
              <button onClick={() => this.increment('vrepeat')}>+</button>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div>Block Size:</div>
            <span style={{ minWidth: '5em', textAlign: 'right' }}>
              <button onClick={() => this.decrement('block_size')}>-</button>
              {this.state.block_size}
              <button onClick={() => this.increment('block_size')}>+</button>
            </span>
          </div>
          <Link to="/blocks/">Refresh</Link>
        </div>

        <div style={{ flex: '1' }}>
          <Swatch {...this.state} />
        </div>
      </div>
    )
  }
}

export default Blocks
