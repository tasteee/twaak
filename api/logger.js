import _Signale from 'signale'
const { Signale } = _Signale

const options = {
  types: {
    info: {
      badge: '🎀',
      label: 'info',
    },
    error: {
      badge: '🔥',
      label: 'error',
    },
  },
}

export const logger = new Signale(options)
