rules[1] = {
  yellow: {
    heartbeat: [200, 260],
    perception: perception,
    follow: [
      'blue',
    ],
    flee: [
      'green'
    ]
  },
  red: {
    heartbeat: [120, 250],
    perception: perception,
    follow: [
      'blue',
      'green'
    ],
    flee: [
      'violet'
    ]
  },
  blue: {
    heartbeat: [280, 300],
    perception: perception,
    follow: [
      'violet',
    ],
    flee: [
      'yellow',
    ]
  },
  green: {
    heartbeat: [300, 360],
    perception: perception,
    follow: [
      'yellow',
      'red'
    ],
    flee: [
      'blue',

    ]
  },
  violet: {
    heartbeat: [200, 210],
    perception: perception,

    follow: [
      'red',
    ],
    flee: [
      'blue'
    ]
  }
}
