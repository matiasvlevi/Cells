let rules = [];
rules[0] = {
  yellow: {
    follow: [
      'red',
      'blue'
    ],
    flee: [
      'green'
    ]
  },
  red: {
    follow: [
      'red'
    ],
    flee: [
      'green',
      'violet'
    ]
  },
  blue: {
    follow: [
      'blue',
    ],
    flee: [
      'red',
      'green',
      'yellow'
    ]
  },
  green: {
    follow: [
      'yellow',
      'red',
    ],
    flee: [
      'green',
      'violet'
    ]
  },
  violet: {
    follow: [
      'yellow',
      'red'
    ],
    flee: [
      'violet'
    ]
  }
}
