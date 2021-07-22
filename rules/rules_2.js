let rate = 400;
rules[2] = {
  A: {
    color: [255, 255, 0],
    heartbeat: [30, 100],
    perception: perception,

    follow: [
      'B',
      'D'
    ],
    flee: [

    ]
  },
  B: {
    color: [255, 0, 100],
    heartbeat: [30, 100],
    perception: perception,

    follow: [
      'C',
      'E'
    ],
    flee: [
      'D'
    ]
  },
  C: {
    color: [0, 150, 255],
    heartbeat: [10, 20],
    perception: perception,

    follow: [
      'D',
      'A'
    ],
    flee: []

  },
  D: {
    color: [255, 100, 0],
    heartbeat: [30, 100],
    perception: perception * 2,

    follow: [
      'E',
      'F'
    ],
    flee: [
      'A'
    ]

  },
  E: {
    color: [0, 255, 0],
    heartbeat: [30, 100],
    perception: perception,

    follow: [
      'F',
    ],
    flee: []

  },
  F: {
    color: [0, 100, 255],
    heartbeat: [30, 100],
    perception: perception,

    follow: [
      'F',
      'A',
    ],
    flee: [
      'B'
    ]

  },
}
