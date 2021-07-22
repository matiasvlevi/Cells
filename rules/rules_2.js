let rate = 400;
rules[2] = {
  A: {
    color: [255, 255, 0],
    heartbeat: [200, 210],
    perception: perception,
    kill: [
      'C'
    ],
    follow: [
      'B',
      'D',
      'C'
    ],
    create: [{
      type: 'E',
      rate: rate
    }]
  },
  B: {
    color: [255, 0, 200],
    heartbeat: [200, 210],
    perception: perception,
    kill: [
      'D'
    ],
    follow: [
      'C',
      'E',
      'D'
    ],
    flee: [
      'F'
    ]
  },
  C: {
    color: [0, 255, 200],
    heartbeat: [200, 210],
    perception: perception,
    kill: [
      'E'
    ],
    create: [{
      type: 'B',
      rate: rate * 2
    }],
    follow: [
      'D',
      'F',
      'E'
    ],
    flee: [
      'A'
    ]
  },
  D: {
    color: [100, 100, 255],
    heartbeat: [200, 210],
    perception: perception,
    follow: [
      'E',
    ],
    kill: [
      'E'
    ],
    create: [{
        type: 'C',
        rate: rate
      },
      {
        type: 'A',
        rate: rate
      }
    ],
    flee: [
      'B',
      'F'
    ]
  },
  E: {
    color: [255, 10, 0],
    heartbeat: [200, 210],
    perception: perception,

    follow: [
      'F',
    ],
    flee: [
      'C'
    ]
  },
  F: {
    color: [0, 255, 0],
    heartbeat: [200, 210],
    perception: perception,
    follow: [
      'A',
    ],
    kill: [
      'B'
    ],
    create: [{
      type: 'D',
      rate: rate
    }],
    flee: []
  }
}
