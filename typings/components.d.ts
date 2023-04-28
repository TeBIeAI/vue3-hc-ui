declare module 'vue' {
  export interface GlobalComponents {
    HcInput: typeof import('../packages/components')['HcInput']
    HcRadio: typeof import('../packages/components')['HcRadio']
    HcRadioGroup: typeof import('../packages/components')['HcRadioGroup']
    HcIcon: typeof import('../packages/components')['HcIcon']
    HcDialog: typeof import('../packages/components')['HcDialog']
    HcButton: typeof import('../packages/components')['HcButton']
    HcCheckbox: typeof import('../packages/components')['HcCheckbox']
    HcCheckboxGroup: typeof import('../packages/components')['HcCheckboxGroup']
    HcTabs: typeof import('../packages/components')['HcTabs']
    HcTabPane: typeof import('../packages/components')['HcTabPane']
    HcTransfer: typeof import('../packages/components')['HcTransfer']
    HcPagination: typeof import('../packages/components')['HcPagination']
    HcForm: typeof import('../packages/components')['HcForm']
    HcFormItem: typeof import('../packages/components')['HcFormItem']
  }

  interface ComponentCustomProperties {
    $notify: typeof import('../packages/components')['HcNotification']
    $message: typeof import('../packages/components')['HcMessage']
    $loading: typeof import('../packages/components')['HcLoadingService']
  }
}

export {}
