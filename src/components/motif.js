import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'

import Swatch from './swatch'

const mirror = array => array.slice().concat(array.reverse().slice(1))

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

const Motif = () => {
  // a motif is a 15x15 block pattern that follows certain symmetrical rules
  // blocks along the diagonal (numbers) must exhibit 4-way symmetry while other blocks can have either 2- or 4-way symmetry.
  // 3 C B C 3
  // C 2 A 2 C
  // B A 1 A B
  // C 2 A 2 C
  // 3 C B C 3

  const [blockA, blockB, blockC] = _.times(3, threebythree)
  const [block1, block2, block3] = _.times(3, () => threebythree(true))
  const pattern = [
    [block3[0], blockC[0], blockB[0], blockC[0], block3[0]],
    [block3[1], blockC[1], blockB[1], blockC[1], block3[1]],
    [block3[2], blockC[2], blockB[2], blockC[2], block3[2]],

    [blockC[0], block2[0], blockA[0], block2[0], blockC[0]],
    [blockC[1], block2[1], blockA[1], block2[1], blockC[1]],
    [blockC[2], block2[2], blockA[2], block2[2], blockC[2]],

    [blockB[0], blockA[0], block1[0], blockA[0], blockB[0]],
    [blockB[1], blockA[1], block1[1], blockA[1], blockB[1]],
    [blockB[2], blockA[2], block1[2], blockA[2], blockB[2]],

    [blockC[0], block2[0], blockA[0], block2[0], blockC[0]],
    [blockC[1], block2[1], blockA[1], block2[1], blockC[1]],
    [blockC[2], block2[2], blockA[2], block2[2], blockC[2]],

    [block3[0], blockC[0], blockB[0], blockC[0], block3[0]],
    [block3[1], blockC[1], blockB[1], blockC[1], block3[1]],
    [block3[2], blockC[2], blockB[2], blockC[2], block3[2]],
  ].map(_.flatten)

  return (
    <div>
      <Swatch pattern={pattern} block_size={10} hrepeat={2} vrepeat={2} />
      <div>
        <Link to="/motifs/">More Motifs</Link>
      </div>
    </div>
  )
}

export default Motif
