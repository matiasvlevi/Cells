let rules = {
  yellow: {
    follow: [
      'yellow'
    ],
    flee: [
      'green'
    ]
  },
  red: {
    follow: [
      'yellow',
      'blue',
      'red'
    ],
    flee: [
      'green'
    ]
  },
  blue: {
    follow: [
      'yellow',
      'green'
    ],
    flee: [
      'red',
      'blue'
    ]
  },
  green: {
    follow: [
      'red',
      'yellow'
    ],
    flee: [
      'blue'
    ]
  }
}
