import React, { Component } from 'react';

export default class Rules extends Component {
  render () {
    return (
      <div className='container'>
        <div className='bigtext'>
          <p><b>Official box hero rules</b></p>
        </div>
        <div className='otherText'>
          <br />
          <p><b>Placing Boxes</b></p>
          <p>1. Please attempt to place boxes in places where people of all abilities can reach them.</p>
          <p>2 When placing boxes, please place them with at least 3 and no more than 5 objects inside them.</p>
          <p>3. Please do not place any sharp, mature, or illegal objects in the box.</p>
          <p>4. Please do not place boxes with anything that others might find offensive inside them.</p>
          <p>5. Please make sure to put the box identifying code we will provide inside the box (i.e. on a piece of paper).</p>
          <br />
          <p><b>Finding boxes</b></p>
          <p>1. Please put boxes back where you found them once you have finished documenting them.</p>
          <p>2. Please do not remove the boxes from their locations for extended periods of time,
            (i.e. longer than 5 minutes) and when doing so, do not take them more than 5 meters away from their original location.</p>
          <br />
          <p><b>General Rules</b></p>
          <p>1. Please be kind and respectful towards other users you may encounter.</p>
          <p>2. Please note any item left in any box is left as a donation to the box hero community,
            it is not guaranteed you will ever find it again, and if you do and you wish to take
            it back another item must be left in its place.</p>
        </div>

      </div>
    );
  }
}
