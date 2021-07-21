// Good rule set 1
let rules = {
  yellow: {
    follow: [
      'red',
      'yellow'
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
      'green'
    ]
  },
  blue: {
    follow: [
      'blue',
      'yellow'
    ],
    flee: [
      'red',
      'green'
    ]
  },
  green: {
    follow: [
      'yellow',
      'red'
    ],
    flee: [
      'green'
    ]
  }
}
