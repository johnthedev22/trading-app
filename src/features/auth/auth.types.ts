interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export type { FormElements, LoginFormElement}