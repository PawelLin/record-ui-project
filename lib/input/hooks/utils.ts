export const isMobile = () => /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)

export const isTruthy = value => !!(value || value === 0)
