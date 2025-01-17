import type * as ExportedComponents from '../components'
import type * as ExportedDirectives from '../directives'
import type * as ExportedComposables from '../composables'
import type * as ComponentProps from './ComponentProps'

export type ComponentType = keyof typeof ExportedComponents
export type DirectiveType = keyof typeof ExportedDirectives
export type ComposableType = keyof typeof ExportedComposables

export const componentsWithExternalPath = {
  BAccordion: '/components/BAccordion',
  BAccordionItem: '/components/BAccordion',
  BAlert: '/components/BAlert',
  BAvatar: '/components/BAvatar',
  BAvatarGroup: '/components/BAvatar',
  BBadge: '/components/BBadge',
  BBreadcrumb: '/components/BBreadcrumb',
  BBreadcrumbItem: '/components/BBreadcrumb',
  BButton: '/components/BButton',
  BButtonGroup: '/components/BButton',
  BButtonToolbar: '/components/BButton',
  BCloseButton: '/components/BButton',
  BCard: '/components/BCard',
  BCardBody: '/components/BCard',
  BCardFooter: '/components/BCard',
  BCardGroup: '/components/BCard',
  BCardHeader: '/components/BCard',
  BCardImg: '/components/BCard',
  BCardSubtitle: '/components/BCard',
  BCardText: '/components/BCard',
  BCardTitle: '/components/BCard',
  BCarousel: '/components/BCarousel',
  BCarouselSlide: '/components/BCarousel',
  BCol: '/components/BContainer',
  BCollapse: '/components/BCollapse',
  BContainer: '/components/BContainer',
  BDropdown: '/components/BDropdown',
  BDropdownDivider: '/components/BDropdown',
  BDropdownForm: '/components/BDropdown',
  BDropdownGroup: '/components/BDropdown',
  BDropdownHeader: '/components/BDropdown',
  BDropdownItem: '/components/BDropdown',
  BDropdownItemButton: '/components/BDropdown',
  BDropdownText: '/components/BDropdown',
  BForm: '/components/BForm',
  BFormCheckbox: '/components/BFormCheckbox',
  BFormCheckboxGroup: '/components/BFormCheckbox',
  BFormDatalist: '/components/BForm',
  BFormFile: '/components/BFormFile',
  BFormFloatingLabel: '/components/BForm',
  BFormGroup: '/components/BFormGroup',
  BFormInput: '/components/BFormInput',
  BFormInvalidFeedback: '/components/BForm',
  BFormRadio: '/components/BFormRadio',
  BFormRadioGroup: '/components/BFormRadio',
  BFormRow: '/components/BForm',
  BFormSelect: '/components/BFormSelect',
  BFormSelectOption: '/components/BFormSelect',
  BFormSelectOptionGroup: '/components/BFormSelect',
  BFormSpinbutton: '/components/BFormSpinbutton',
  BFormTag: '/components/BFormTags',
  BFormTags: '/components/BFormTags',
  BFormText: '/components/BForm',
  BFormTextarea: '/components/BFormTextarea',
  BFormValidFeedback: '/components/BForm',
  BImg: '/components/BImg',
  BInput: '/components/BFormInput',
  BInputGroup: '/components/BInputGroup',
  BInputGroupText: '/components/BInputGroup',
  BListGroup: '/components/BListGroup',
  BListGroupItem: '/components/BListGroup',
  BModal: '/components/BModal',
  BModalOrchestrator: '/components/BModal',
  BNav: '/components/BNav',
  BNavForm: '/components/BNav',
  BNavItem: '/components/BNav',
  BNavItemDropdown: '/components/BNav',
  BNavText: '/components/BNav',
  BNavbar: '/components/BNavbar',
  BNavbarBrand: '/components/BNavbar',
  BNavbarNav: '/components/BNavbar',
  BNavbarToggle: '/components/BNavbar',
  BOffcanvas: '/components/BOffcanvas',
  BOverlay: '/components/BOverlay',
  BPagination: '/components/BPagination',
  BPlaceholder: '/components/BPlaceholder',
  BPlaceholderButton: '/components/BPlaceholder',
  BPlaceholderCard: '/components/BPlaceholder',
  BPlaceholderTable: '/components/BPlaceholder',
  BPlaceholderWrapper: '/components/BPlaceholder',
  BPopover: '/components/BPopover',
  BProgress: '/components/BProgress',
  BRow: '/components/BContainer',
  BSpinner: '/components/BSpinner',
  BTab: '/components/BTabs',
  BTabs: '/components/BTabs',
  BToast: '/components/BToast',
  BToastOrchestrator: '/components/BToast',
  BTooltip: '/components/BTooltip',
  BLink: '/components/BLink',
  BProgressBar: '/components/BProgress',
  BTableSimple: '/components/BTable',
  BTableLite: '/components/BTable',
  BTable: '/components/BTable',
  BTbody: '/components/BTable',
  BTd: '/components/BTable',
  BTh: '/components/BTable',
  BThead: '/components/BTable',
  BTfoot: '/components/BTable',
  BTr: '/components/BTable',
  BPopoverOrchestrator: '/components/BPopover',
} as const satisfies Record<ComponentType, string>
export const componentNames = Object.freeze(
  Object.keys(componentsWithExternalPath) as ComponentType[]
)

export const directivesWithExternalPath = {
  vBColorMode: '/directives/BColorMode',
  vBModal: '/directives/BModal',
  vBPopover: '/directives/BPopover',
  vBScrollspy: '/directives/BScrollspy',
  vBToggle: '/directives/BToggle',
  vBTooltip: '/directives/BTooltip',
} as const satisfies Record<DirectiveType, string>
export const directiveNames = Object.freeze(
  Object.keys(directivesWithExternalPath) as DirectiveType[]
)

export const composablesWithExternalPath = {
  useBreadcrumb: '/composables/useBreadcrumb',
  useColorMode: '/composables/useColorMode',
  useModal: '/composables/useModal',
  useModalController: '/composables/useModalController',
  useScrollspy: '/composables/useScrollspy',
  useToastController: '/composables/useToastController',
  usePopoverController: '/composables/usePopoverController',
} as const satisfies Record<ComposableType, string>
export const composableNames = Object.freeze(
  Object.keys(composablesWithExternalPath) as ComposableType[]
)

export type ConfigurationOption<T extends string> = Partial<Record<T, boolean>> & {all: boolean}
export interface BootstrapVueOptions {
  /**
   * @default true
   */
  breadcrumb?: boolean
  /**
   * @default true
   */
  modalController?: boolean
  /**
   * @default true
   */
  modalManager?: boolean
  /**
   * @default true
   */
  rtl?:
    | boolean
    | {
        /**
         * @default false
         */
        rtlInitial: boolean
        /**
         * @default undefined
         */
        localeInitial: string | undefined
      }
  /**
   * @default true
   */
  toast?: boolean
  components?: Partial<
    BvnComponentProps & {
      /**
       * @hint Globally sets all props with the matching name
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      global: Record<string, any>
    }
  >
  tooltip?: boolean
  popover?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnmappedComponentProps<BFormSelectOption = any, BTableLite = any, BTable = any> = {
  BLink: ComponentProps.BLinkProps
  BAccordion: ComponentProps.BAccordionProps
  BDropdownDivider: ComponentProps.BDropdownDividerProps
  BDropdownGroup: ComponentProps.BDropdownGroupProps
  BDropdownItem: ComponentProps.BDropdownItemProps
  BDropdownItemButton: ComponentProps.BDropdownItemButtonProps
  BDropdownText: ComponentProps.BDropdownTextProps
  BFormFloatingLabel: ComponentProps.BFormFloatingLabelProps
  BFormRow: ComponentProps.BFormRowProps
  BFormText: ComponentProps.BFormTextProps
  BFormCheckbox: ComponentProps.BFormCheckboxProps
  BFormCheckboxGroup: ComponentProps.BFormCheckboxGroupProps
  BFormDatalist: ComponentProps.BFormDatalistProps
  BFormFile: ComponentProps.BFormFileProps
  BFormInput: ComponentProps.BFormInputProps
  BFormRadio: ComponentProps.BFormRadioProps
  BFormRadioGroup: ComponentProps.BFormRadioGroupProps
  BFormSelect: ComponentProps.BFormSelectProps
  BFormSelectOption: ComponentProps.BFormSelectOptionProps<BFormSelectOption>
  BFormSelectOptionGroup: ComponentProps.BFormSelectOptionGroupProps
  BFormSpinbutton: ComponentProps.BFormSpinbuttonProps
  BFormTag: ComponentProps.BFormTagProps
  BFormTags: ComponentProps.BFormTagsProps
  BFormTextarea: ComponentProps.BFormTextareaProps
  BInputGroup: ComponentProps.BInputGroupProps
  BInputGroupText: ComponentProps.BInputGroupTextProps
  BListGroup: ComponentProps.BListGroupProps
  BListGroupItem: ComponentProps.BListGroupItemProps
  BModalOrchestrator: ComponentProps.BModalOrchestratorProps
  BNav: ComponentProps.BNavProps
  BNavForm: ComponentProps.BNavFormProps
  BNavItem: ComponentProps.BNavItemProps
  BNavText: ComponentProps.BNavTextProps
  BNavbar: ComponentProps.BNavbarProps
  BNavbarBrand: ComponentProps.BNavbarBrandProps
  BNavbarNav: ComponentProps.BNavbarNavProps
  BNavbarToggle: ComponentProps.BNavbarToggleProps
  BOffcanvas: ComponentProps.BOffcanvasProps
  BOverlay: ComponentProps.BOverlayProps
  BPagination: ComponentProps.BPaginationProps
  BPlaceholder: ComponentProps.BPlaceholderProps
  BPlaceholderButton: ComponentProps.BPlaceholderButtonProps
  BPlaceholderCard: ComponentProps.BPlaceholderCardProps
  BPlaceholderTable: ComponentProps.BPlaceholderTableProps
  BPlaceholderWrapper: ComponentProps.BPlaceholderWrapperProps
  BProgress: ComponentProps.BProgressProps
  BTab: ComponentProps.BTabProps
  BTabs: ComponentProps.BTabsProps
  BToastOrchestrator: ComponentProps.BToastOrchestratorProps
  BCollapse: ComponentProps.BCollapseProps
  BContainer: ComponentProps.BContainerProps
  BSpinner: ComponentProps.BSpinnerProps
  BAccordionItem: ComponentProps.BAccordionItemProps
  BAlert: ComponentProps.BAlertProps
  BAvatar: ComponentProps.BAvatarProps
  BAvatarGroup: ComponentProps.BAvatarGroupProps
  BBadge: ComponentProps.BBadgeProps
  BBreadcrumb: ComponentProps.BBreadcrumbProps
  BBreadcrumbItem: ComponentProps.BBreadcrumbItemProps
  BButton: ComponentProps.BButtonProps
  BButtonGroup: ComponentProps.BButtonGroupProps
  BButtonToolbar: ComponentProps.BButtonToolbarProps
  BCloseButton: ComponentProps.BCloseButtonProps
  BCard: ComponentProps.BCardProps
  BCardBody: ComponentProps.BCardBodyProps
  BCardGroup: ComponentProps.BCardGroupProps
  BCardSubtitle: ComponentProps.BCardSubtitleProps
  BCardText: ComponentProps.BCardTextProps
  BCardTitle: ComponentProps.BCardTitleProps
  BCarousel: ComponentProps.BCarouselProps
  BCarouselSlide: ComponentProps.BCarouselSlideProps
  BImg: ComponentProps.BImgProps
  BForm: ComponentProps.BFormProps
  BTableSimple: ComponentProps.BTableSimpleProps
  BTableLite: ComponentProps.BTableLiteProps<BTableLite>
  BTable: ComponentProps.BTableProps<BTable>
  BTr: ComponentProps.BTrProps
  BThead: ComponentProps.BTheadProps
  BTfoot: ComponentProps.BTfootProps
  BTd: ComponentProps.BTdProps
  BTbody: ComponentProps.BTbodyProps
  BTh: ComponentProps.BThProps
  BProgressBar: ComponentProps.BProgressBarProps
  BInputGroupAddon: ComponentProps.BInputGroupAddonProps
  BDropdown: ComponentProps.BDropdownProps
  BToast: ComponentProps.BToastProps
  BPopover: ComponentProps.BPopoverProps
  BTooltip: ComponentProps.BTooltipProps
  BModal: ComponentProps.BModalProps
  BCardFooter: ComponentProps.BCardHeadFootProps
  BCardHeader: ComponentProps.BCardHeadFootProps
  BCardImg: ComponentProps.BCardImgProps
  BCol: ComponentProps.BColProps
  BDropdownForm: never
  BDropdownHeader: never
  BFormInvalidFeedback: ComponentProps.BFormFeedbackSharedProps
  BFormValidFeedback: ComponentProps.BFormFeedbackSharedProps
  BFormGroup: ComponentProps.BFormGroupProps
  BNavItemDropdown: ComponentProps.BDropdownProps
  BRow: ComponentProps.BRowProps
  BInput: ComponentProps.BFormInputProps
  BTooltipOrchestrator: never
  BPopoverOrchestrator: never
  showHide: ComponentProps.ShowHideProps
}

export type BvnComponentProps = {
  [K in ComponentType | 'showHide']: UnmappedComponentProps[K]
}
