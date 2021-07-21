rules.push({
  yellow: {
    heartbeat: [80, 100],
    perception: 16,
    follow: [
      'violet',
      'green',
      'blue'
    ],
    flee: []
  },
  red: {
    heartbeat: [120, 250],
    perception: 16,
    follow: [
      'yellow',
      'blue',
      'green'
    ],
    flee: [
      'violet'
    ]
  },
  blue: {
    heartbeat: [280, 300],
    perception: 16,
    follow: [
      'yellow',
      'violet',
      'green',
      'blue'
    ],
    flee: [
      'red',
    ]
  },
  green: {
    heartbeat: [300, 360],
    perception: 16,
    follow: [
      'blue',
      'yellow',
      'red'
    ],
    flee: [
      'violet'
    ]
  },
  violet: {
    heartbeat: [500, 600],
    perception: 16,
    follow: [
      'blue',
      'yellow',
      'red',
      'violet'
    ],
    flee: [
      'green',
    ]
  }
});
