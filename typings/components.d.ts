declare module 'vue' {
  export interface GlobalComponents {
    HcInput: typeof import('../packages/components')['HcInput']
    HcRadio: typeof import('../packages/components')['HcRadio']
    HcRadioGroup: typeof import('../packages/components')['HcRadioGroup']
    HcIcon: typeof import('../packages/components')['HcIcon']
    HcDialog: typeof import('../packages/components')['HcDialog']
  }
}

export {}
