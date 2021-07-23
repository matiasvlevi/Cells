let heartbeat = [30, 300];
let perception = 26;
let ruleset = {
  A: {
    color: [255, 255, 0],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    kill: [{
      type: 'B',
      rate: 20
    }],
    follow: [
      'B',
      'D'
    ],
    flee: [
      'F'
    ]
  },
  B: {
    color: [255, 0, 100],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'C',
      'F'
    ],
    flee: [
      'H'
    ]

  },
  C: {
    color: [0, 120, 255],
    heartbeat: [10, 20],
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'D',
    ],

  },
  D: {
    color: [255, 100, 0],
    heartbeat: heartbeat,
    perception: perception * 2,
    acc: 0.4,
    vel: 1,
    follow: [
      'G',
      'E'
    ],
    flee: [
      'B',
      'I'
    ]

  },
  E: {
    color: [0, 255, 0],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'F',
    ],
    flee: [
      'H'
    ]

  },
  F: {
    color: [0, 100, 255],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'G',
      'A',
    ],

  },
  G: {
    color: [0, 255, 200],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'H',
    ],
    flee: [
      'I'
    ]

  },
  H: {
    color: [150, 0, 255],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'A',
    ],


  },
  I: {
    color: [255, 0, 100],
    heartbeat: heartbeat,
    perception: perception,
    acc: 0.4,
    vel: 1,
    follow: [
      'E',
      'H'
    ],


  },
}