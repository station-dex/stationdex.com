let triggers = [] as HTMLButtonElement[]

const getClosestTrigger = (_target: HTMLElement) => {
  if (!_target) {
    return null
  }

  const exactElement = _target.closest('[data-dropdown-trigger]') as HTMLButtonElement

  if (!exactElement) {
    return null
  }

  return exactElement
}

const getDropdownFromTrigger = (target: HTMLButtonElement) => {
  const targetName = target.dataset.dropdownTrigger

  if (!targetName) {
    return
  }

  const dropDownContent = document.querySelector(`[data-dropdown-content='${targetName}']`) as HTMLDivElement

  if (!dropDownContent) {
    return
  }

  return dropDownContent
}

const handleTriggerClick = (target: HTMLButtonElement) => {
  const dropDownContent = getDropdownFromTrigger(target)

  if (!dropDownContent) {
    return
  }

  const position = target.getBoundingClientRect()

  dropDownContent.style.left = `${position.x}px`
  dropDownContent.style.top = `${position.bottom + 8}px`
  dropDownContent.style.width = `${position.width}px`
  dropDownContent.setAttribute('data-dropdown-state', 'open')
}

const handleOutsideClick = (target: HTMLElement) => {
  const dropDownContent = document.querySelector('[data-dropdown-content][data-dropdown-state=\'open\']') as HTMLDivElement

  if (!dropDownContent) {
    return
  }

  const exactElement = getClosestTrigger(target as HTMLElement)

  if (exactElement) {
    const _dropDown = getDropdownFromTrigger(exactElement)

    if (_dropDown && _dropDown?.dataset?.dropdownState === 'open') {
      return
    }
  }

  if (!dropDownContent.contains(target)) {
    dropDownContent.setAttribute('data-dropdown-state', 'idle')
  }
}

const closeAllDropdown = () => {
  const dropDownContent = document.querySelector('[data-dropdown-content][data-dropdown-state=\'open\']') as HTMLDivElement

  if (!dropDownContent) {
    return false
  }

  dropDownContent.setAttribute('data-dropdown-state', 'idle')
  return true
}

const handleViewportChange = () => {
  triggers.forEach((elem) => {
    const targetName = elem.dataset.dropdownTrigger

    if (!targetName) {
      return
    }

    const dropDownContent = document.querySelector(`[data-dropdown-content='${targetName}'][data-dropdown-state='open']`) as HTMLDivElement

    if (!dropDownContent) {
      return
    }

    const position = elem.getBoundingClientRect()
    dropDownContent.style.left = `${position.x}px`
    dropDownContent.style.top = `${position.bottom + 8}px`
    dropDownContent.style.width = `${position.width}px`
  })
}

const closeDropdown = (targetName: string) => {
  const dropDownContent = document.querySelector(`[data-dropdown-content='${targetName}'][data-dropdown-state='open']`) as HTMLDivElement

  if (!dropDownContent) {
    return false
  }

  dropDownContent.setAttribute('data-dropdown-state', 'idle')
  return true
}

const initDropdown = () => {
  const allTriggers = document.querySelectorAll('[data-dropdown-trigger]')

  if (!allTriggers.length) {
    return false
  }

  triggers = []

  // trigger click listeners
  allTriggers.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const exactElement = getClosestTrigger(e?.target as HTMLElement)

      if (!exactElement) {
        return
      }

      triggers.push(exactElement)

      handleTriggerClick(exactElement)
    })

    elem.addEventListener('keydown', (e) => {
      const _target = e?.target as HTMLElement
      const _event = e as KeyboardEvent

      if (_event?.key === 'Enter') {
        _target?.click()
        e.stopPropagation()
      }
    })
  });

  // handle outside click
  ['mousedown', 'touchstart'].forEach((ev: string) => {
    document.addEventListener(ev, (event) => {
      const _target = event?.target as HTMLElement

      if (_target) {
        handleOutsideClick(_target)
      }
    })
  })

  // handle viewport change
  window.addEventListener('scroll', handleViewportChange)
  window.addEventListener('resize', handleViewportChange)
  // handleEscape
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdown()
    }
  })
}

export { initDropdown, closeDropdown }
