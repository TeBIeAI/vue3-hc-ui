import { useGlobalComponentSettings, useZIndex } from '@hc-ui/hooks'
import {
  createApp,
  createVNode,
  defineComponent,
  h,
  reactive,
  toRefs,
  vShow,
  withCtx,
  withDirectives
} from 'vue'
import { LoadingOptionsResolved } from './types'
import { Transition } from 'vue'

export const createLoadingComponent = (options: LoadingOptionsResolved) => {
  const data = reactive({
    ...options,
    originalPosition: '',
    visible: false
  })

  function close() {
    data.visible = false
  }

  function destroySelf() {
    loadingInstance.unmount()
  }

  function handleAfterLeave() {
    destroySelf()
  }

  const hcLoadingComponent = defineComponent({
    name: 'HcLoading',
    setup(_, { expose }) {
      const { ns } = useGlobalComponentSettings('loading')
      const zIndex = useZIndex()

      expose({
        ns,
        zIndex
      })

      return () => {
        const spinner = h(
          'svg',
          {
            class: 'circular',
            viewBox: '0 0 50 50'
          },
          [
            h('circle', {
              class: 'path',
              cx: '25',
              cy: '25',
              r: '20',
              fill: 'none'
            })
          ]
        )

        const spinnerText = data.text
          ? h('p', { class: ns.b('text') }, [data.text])
          : undefined

        return h(
          Transition,
          {
            name: ns.e('fade'),
            onAfterLeave: handleAfterLeave
          },
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  'div',
                  {
                    style: {
                      backgroundColor: data.background || ''
                    },
                    class: [
                      ns.b('mask'),
                      data.customClass,
                      data.fullscreen ? 'is-fullscreen' : ''
                    ]
                  },
                  [
                    h(
                      'div',
                      {
                        class: ns.b('spinner')
                      },
                      [spinnerText]
                    )
                  ]
                ),
                [[vShow, data.visible]]
              )
            ])
          }
        )
      }
    }
  })

  const loadingInstance = createApp(hcLoadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'))

  return {
    ...toRefs(data),
    vm,
    close,
    get $el(): HTMLElement {
      return vm.$el
    }
  }
}

export type LoadingInstance = ReturnType<typeof createLoadingComponent>
