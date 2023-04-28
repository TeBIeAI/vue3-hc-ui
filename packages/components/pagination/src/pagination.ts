import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  VNode,
  watch
} from 'vue'
import type { ExtractPropTypes } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { buildProps, definePropType, iconPropType, mutable } from '@hc-ui/utils'
import { isNumber } from 'lodash-es'
import { useNamespace } from '@hc-ui/hooks'
import { hcPaginationKey } from './constants'

import Next from './components/next.vue'
import Prev from './components/prev.vue'
import Total from './components/total.vue'
import Jumper from './components/jumper.vue'
import Pager from './components/pager.vue'

type LayoutKey =
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'
  | 'total'
  | 'sizes'
  | 'slot'
  | '->'

export const paginationProps = buildProps({
  total: Number,
  pageSize: {
    type: Number,
    default: 10
  },
  defaultPageSize: Number,
  currentPage: Number,
  defaultCurrentPage: Number,
  pageCount: Number,
  pagerCount: {
    type: Number,
    validator: (value: unknown) => {
      return (
        isNumber(value) &&
        Math.trunc(value) === value &&
        value > 4 &&
        value < 22 &&
        value % 2 === 1
      )
    },
    default: 7
  },
  layout: {
    type: String,
    default: (
      ['prev', 'pager', 'next', 'jumper', '->', 'total'] as LayoutKey[]
    ).join(', ')
  },
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 20, 30, 50] as const)
  },
  prevText: {
    type: String,
    default: ''
  },
  prevIcon: {
    type: iconPropType,
    default: () => ArrowLeft
  },
  nextText: {
    type: String,
    default: ''
  },
  nextIcon: {
    type: iconPropType,
    default: () => ArrowRight
  },
  background: Boolean,
  disabled: Boolean
} as const)

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  'update:current-page': (val: number) => isNumber(val),
  'current-change': (val: number) => isNumber(val),
  'next-click': (val: number) => isNumber(val)
}

const isAbsent = (v: unknown): v is undefined => typeof v !== 'number'

const componentName = 'HcPagination'
export default defineComponent({
  name: componentName,

  props: paginationProps,
  emits: paginationEmits,

  setup(props, { emit, slots }) {
    const ns = useNamespace('pagination')
    const vnodeProps = getCurrentInstance()!.vnode.props || {}

    const hasCurrentPageListener =
      'onUpdate:currentPage' in vnodeProps ||
      'onUpdate:current-page' in vnodeProps ||
      'onCurrentChange' in vnodeProps

    const pageCountBridge = computed(() => {
      let pageCount = 0
      if (!isAbsent(props.pageCount)) {
        pageCount = props.pageCount
      } else if (!isAbsent(props.total)) {
        pageCount = Math.max(1, Math.ceil(props.total / props.pageSize))
      }

      return pageCount
    })

    const currentPageBridge = computed<number>({
      get() {
        return isAbsent(props.currentPage) ? 999 : props.currentPage
      },
      set(v) {
        let newCurrentPage = v
        if (v < 1) {
          newCurrentPage = 1
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value
        }
        // 如果currentPage为undefined
        if (isAbsent(props.currentPage)) {
        }
        if (hasCurrentPageListener) {
          emit('update:current-page', newCurrentPage)
          emit('current-change', newCurrentPage)
        }
      }
    })

    const handleCurrentPage = (val: number) => {
      currentPageBridge.value = val
    }

    provide(hcPaginationKey, {
      pageCount: pageCountBridge,
      disabled: computed(() => props.disabled),
      currentPage: currentPageBridge,
      changeEvent: handleCurrentPage
    })

    function next() {
      if (props.disabled) return
      currentPageBridge.value += 1
      emit('next-click', currentPageBridge.value)
    }

    function prev() {
      if (props.disabled) return
      currentPageBridge.value -= 1
      emit('next-click', currentPageBridge.value)
    }

    function handleCurrentChange(val: number) {
      currentPageBridge.value = val
    }

    return () => {
      const rootChildren: Array<VNode | VNode[] | null> = []

      const TEMPLATE_MAP: Record<
        Exclude<LayoutKey, '->'>,
        VNode | VNode[] | null
      > = {
        prev: h(Prev, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          prevText: props.prevText,
          prevIcon: props.prevIcon,
          onClick: prev
        }),
        pager: h(Pager, {
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          pagerCount: props.pagerCount,
          disabled: props.disabled,
          onChange: handleCurrentChange
        }),
        jumper: h(Jumper),
        next: h(Next, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          nextText: props.nextText,
          nextIcon: props.nextIcon,
          pageCount: pageCountBridge.value,
          onClick: next
        }),
        sizes: h('div', 'sizes'),
        slot: slots?.default?.() ?? null,
        total: h(Total, {
          total: isAbsent(props.total) ? 0 : props.total
        })
      }

      const components = props.layout
        .split(',')
        .map((item: string) => item.trim()) as LayoutKey[]

      let haveRightWrapper = false

      components.forEach((c) => {
        if (c === '->') {
          haveRightWrapper = true
          return
        }

        if (!haveRightWrapper) {
          rootChildren.push(TEMPLATE_MAP[c])
        }
      })

      return h(
        'div',
        {
          class: [ns.b(), ns.is('background', props.background)]
        },
        rootChildren
      )
    }
  }
})
