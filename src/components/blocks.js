import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'

const mirror = array => array.slice().concat(array.reverse().slice(1));
const repeat = (array, times) => _.flatten(Array(times).fill(array));

const patternFor = count => {
  const max = 2 ** count;
  const seed = Math.floor(Math.random() * Math.floor(max));
  const binary = seed.toString(2).padStart(count, '0');
  return mirror(Array.from(binary));
};

const Swatch = ({ count, hrepeat, vrepeat, block_size }) => {
  console.log("rendering", count, hrepeat, vrepeat);

  const pattern = repeat(mirror(_.times(count, () => repeat(patternFor(count), hrepeat))), vrepeat);

  const height = pattern.length;
  const width = pattern[0].length;

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

class Blocks extends React.Component {
  constructor({ count = 5, hrepeat = 2, vrepeat = 2, block_size = 10 }) {
    super();
    this.state = { count, hrepeat, vrepeat, block_size };
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <form style={{ minWidth: "11em", paddingRight: "1em" }}>
          <label>
            Number of Blocks:
          <input
              type="number"
              style={{ width: "100%" }}
              value={this.state.count}
              min={2}
              max={10}
              onChange={event => this.setState({ ...this.state, count: parseInt(event.target.value) })} />
          </label>

          <label >
            Horizontal Repeats:
            <input
              type="number"
              style={{ width: "100%" }}
              value={this.state.hrepeat}
              min={1}
              max={10}
              onChange={event => this.setState({ ...this.state, hrepeat: parseInt(event.target.value) })} />
          </label>

          <label >
            Vertical Repeats:
            <input
              type="number"
              style={{ width: "100%" }}
              value={this.state.vrepeat}
              min={1}
              max={10}
              onChange={event => this.setState({ ...this.state, vrepeat: parseInt(event.target.value) })} />
          </label>
          <label >
            Block Size (in pixels):
            <input
              type="number"
              style={{ width: "100%" }}
              value={this.state.block_size}
              min={5}
              max={25}
              step={5}
              onChange={event => this.setState({ ...this.state, block_size: parseInt(event.target.value) })} />
          </label>

          <Link to="/blocks/">Refresh</Link>
        </form>
        <div style={{ flex: "1" }}>
          <Swatch {...this.state} />
        </div>

      </div>);
  }
}


export default Blocks