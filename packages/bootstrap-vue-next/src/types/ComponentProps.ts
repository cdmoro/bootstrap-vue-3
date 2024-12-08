import type {
  Boundary,
  Placement as FloatingPlacement,
  Middleware,
  Padding,
  RootBoundary,
  Strategy,
} from '@floating-ui/vue'
import type {ComponentPublicInstance, TransitionProps} from 'vue'
import type {RouteLocationRaw} from 'vue-router'
import type {LinkTarget} from './LinkTarget'
import type {
  BgColorVariant,
  BorderColorVariant,
  ButtonVariant,
  ColorExtendables,
  ColorVariant,
  TextColorVariant,
} from './ColorTypes'
import type {AttrsValue, ClassValue} from './AnyValuedAttributes'
import type {CheckboxOptionRaw, CheckboxValue} from './CheckboxTypes'
import type {Size} from './Size'
import type {AriaInvalid} from './AriaInvalid'
import type {Numberish, TeleporterProps, ValidationState} from './CommonTypes'
import type {CommonInputProps} from './FormCommonInputProps'
import type {RadioOptionRaw, RadioValue} from './RadioTypes'
import type {SelectValue} from './SelectTypes'
import type {
  Breakpoint,
  ColBreakpointProps,
  ColsNumbers,
  ColsOffsetNumbers,
  ColsOrderNumbers,
  ContentColsBreakpointProps,
  GutterNumbers,
  LabelAlignBreakpointProps,
  LabelColsBreakpointProps,
  OffsetBreakpointProps,
  OrderBreakpointProps,
  RowColsBreakpointProps,
} from './BreakpointProps'
import type {
  AlignmentContent,
  AlignmentJustifyContent,
  AlignmentTextHorizontal,
  AlignmentVertical,
  CombinedPlacement,
  Placement,
  VerticalAlign,
} from './Alignment'
import type {RadiusElementExtendables} from './RadiusElement'
import type {SpinnerType} from './SpinnerType'
import type {PlaceholderAnimation, PlaceholderSize} from './PlaceholderTypes'
import type {ButtonType} from './ButtonType'
import type {LiteralUnion} from './LiteralUnion'
import type {BreadcrumbItemRaw} from './BreadcrumbTypes'
import type {TransitionMode} from './TransitionMode'
import type {
  BTableProvider,
  BTableSortBy,
  NoProviderTypes,
  TableField,
  TableFieldRaw,
  TableRowType,
  TableStrictClassValue,
} from './TableTypes'
import type {PopoverPlacement} from './PopoverPlacement'
import type {InputType} from './InputType'

export interface BLinkProps {
  active?: boolean
  activeClass?: string
  disabled?: boolean
  exactActiveClass?: string
  href?: string
  icon?: boolean
  noRel?: boolean
  opacity?: 10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'
  opacityHover?: 10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'
  prefetch?: boolean
  prefetchOn?: Partial<{
    visibility: boolean
    interaction: boolean
  }>
  noPrefetch?: boolean
  prefetchedClass?: ClassValue
  rel?: string
  replace?: boolean
  routerComponentName?: string
  routerTag?: string
  stretched?: boolean
  target?: LinkTarget
  to?: RouteLocationRaw
  underlineOffset?: 1 | 2 | 3 | '1' | '2' | '3'
  underlineOffsetHover?: 1 | 2 | 3 | '1' | '2' | '3'
  underlineOpacity?: 0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'
  underlineOpacityHover?: 0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'
  underlineVariant?: ColorVariant | null
  variant?: ColorVariant | null
}

export type LinkUnderlineProps = Pick<
  BLinkProps,
  | 'underlineOffset'
  | 'underlineOffsetHover'
  | 'underlineOpacity'
  | 'underlineOpacityHover'
  | 'underlineVariant'
>
export type LinkOpacityProps = Pick<BLinkProps, 'opacity' | 'opacityHover'>
export type LinkIconProps = Pick<BLinkProps, 'icon'>
export type LinkVariantProps = Pick<BLinkProps, 'variant'>

export interface BAccordionProps {
  flush?: boolean
  free?: boolean
  id?: string
  initialAnimation?: boolean
  lazy?: boolean
  modelValue?: string
  unmountLazy?: boolean
}

export interface BDropdownDividerProps {
  dividerClass?: ClassValue
  tag?: string
  variant?: ColorVariant | null
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BDropdownFormProps {
  formClass?: ClassValue
  novalidate?: boolean
  validated?: boolean
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BDropdownGroupProps {
  ariaDescribedby?: string
  header?: string
  headerClass?: ClassValue
  headerTag?: string
  headerVariant?: ColorVariant | null
  id?: string
}

export interface BDropdownHeaderProps {
  headerClass?: ClassValue
  tag?: string
  text?: string
  variant?: ColorVariant | null
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BDropdownItemProps extends Omit<BLinkProps, 'routerTag'> {
  linkClass?: ClassValue
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BDropdownItemButtonProps {
  active?: boolean
  activeClass?: ClassValue
  buttonClass?: ClassValue
  wrapperAttrs?: Readonly<AttrsValue>
  disabled?: boolean
  variant?: ColorVariant | null
}

export interface BDropdownTextProps {
  textClass?: ClassValue
  tag?: string
  text?: string
  variant?: ColorVariant | null
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BFormFloatingLabelProps {
  label?: string
  labelFor?: string
}

export interface BFormRowProps {
  tag?: string
}

export interface BFormTextProps {
  id?: string
  inline?: boolean
  tag?: string
  text?: string
  textVariant?: TextColorVariant | null
}

export interface BFormCheckboxProps {
  ariaLabel?: string
  ariaLabelledby?: string
  autofocus?: boolean
  button?: boolean
  buttonGroup?: boolean
  buttonVariant?: ButtonVariant | null
  disabled?: boolean
  form?: string
  id?: string
  indeterminate?: boolean
  inline?: boolean
  modelValue?: CheckboxValue | readonly CheckboxValue[]
  name?: string
  plain?: boolean
  required?: boolean
  reverse?: boolean
  size?: Size
  state?: ValidationState
  switch?: boolean
  uncheckedValue?: CheckboxValue
  wrapperAttrs?: Readonly<AttrsValue>
  inputClass?: ClassValue
  // Since the compiler-sfc doesn't crawl external filed, the redundant string/boolean union is
  // necessary to tell it that we don't want it to follow Boolean casting rules
  // https://vuejs.org/guide/components/props.html#boolean-casting which would cast the empty
  // string to true
  value?: string | boolean | CheckboxValue
}

export interface BFormCheckboxGroupProps {
  ariaInvalid?: AriaInvalid
  autofocus?: boolean
  buttonVariant?: ButtonVariant | null
  buttons?: boolean
  disabled?: boolean
  disabledField?: string
  form?: string
  id?: string
  modelValue?: readonly CheckboxValue[]
  name?: string
  options?: readonly CheckboxOptionRaw[]
  plain?: boolean
  required?: boolean
  reverse?: boolean
  size?: Size
  stacked?: boolean
  state?: ValidationState
  switches?: boolean
  textField?: string
  validated?: boolean
  valueField?: string
}

export interface BFormDatalistProps {
  disabledField?: string
  id?: string
  options?: readonly (unknown | Record<string, unknown>)[]
  textField?: string
  valueField?: string
}

export interface BFormFileProps {
  ariaLabel?: string
  ariaLabelledby?: string
  accept?: string | readonly string[]
  autofocus?: boolean
  capture?: boolean | 'user' | 'environment'
  directory?: boolean
  disabled?: boolean
  form?: string
  id?: string
  label?: string
  labelClass?: ClassValue
  modelValue?: readonly File[] | File | null
  multiple?: boolean
  name?: string
  noButton?: boolean
  noDrop?: boolean
  noTraverse?: boolean
  plain?: boolean
  required?: boolean
  size?: Size
  state?: ValidationState
}

export interface BFormInputProps extends CommonInputProps {
  max?: Numberish
  min?: Numberish
  // noWheel: {type: Boolean, default: false}, TODO: not implemented yet
  step?: Numberish
  type?: InputType
}

export interface BFormRadioProps {
  ariaLabel?: string
  ariaLabelledby?: string
  autofocus?: boolean
  button?: boolean
  buttonGroup?: boolean
  buttonVariant?: ButtonVariant | null
  disabled?: boolean
  form?: string
  id?: string
  inline?: boolean
  modelValue?: RadioValue
  name?: string
  plain?: boolean
  required?: boolean
  reverse?: boolean
  size?: Size
  state?: ValidationState
  value?: RadioValue
}

export interface BFormRadioGroupProps {
  ariaInvalid?: AriaInvalid
  autofocus?: boolean
  buttonVariant?: ButtonVariant | null
  buttons?: boolean
  disabled?: boolean
  disabledField?: string
  form?: string
  id?: string
  modelValue?: RadioValue
  name?: string
  options?: readonly RadioOptionRaw[]
  plain?: boolean
  required?: boolean
  reverse?: boolean
  size?: Size
  stacked?: boolean
  state?: ValidationState
  textField?: string
  validated?: boolean
  valueField?: string
}

export interface BFormSelectProps {
  ariaInvalid?: AriaInvalid
  autofocus?: boolean
  disabled?: boolean
  disabledField?: string
  form?: string
  id?: string
  labelField?: string
  modelValue?: SelectValue
  multiple?: boolean
  name?: string
  options?: readonly (unknown | Record<string, unknown>)[]
  optionsField?: string
  plain?: boolean
  required?: boolean
  selectSize?: Numberish
  size?: Size
  state?: ValidationState
  textField?: string
  valueField?: string
}

export interface BFormSelectOptionProps<T> {
  disabled?: boolean
  value?: T
}

export interface BFormSelectOptionGroupProps {
  disabledField?: string
  label?: string
  options?: readonly (unknown | Record<string, unknown>)[]
  textField?: string
  valueField?: string
}

export interface BFormSpinbuttonProps {
  ariaControls?: string
  ariaLabel?: string
  disabled?: boolean
  form?: string
  formatterFn?: (value: number) => string
  id?: string
  inline?: boolean
  labelDecrement?: string
  labelIncrement?: string
  locale?: string
  max?: Numberish
  min?: Numberish
  modelValue?: number | null
  name?: string
  placeholder?: string
  readonly?: boolean
  repeatDelay?: Numberish
  repeatInterval?: Numberish
  repeatStepMultiplier?: Numberish
  repeatThreshold?: Numberish
  required?: boolean
  size?: Size
  state?: ValidationState
  step?: Numberish
  vertical?: boolean
  wrap?: boolean
}

export interface BFormTagProps {
  disabled?: boolean
  id?: string
  noRemove?: boolean
  pill?: boolean
  removeLabel?: string
  tag?: string
  title?: string
  variant?: ColorVariant | null
}

export interface BFormTagsProps {
  addButtonText?: string
  addButtonVariant?: ButtonVariant | null
  addOnChange?: boolean
  autofocus?: boolean
  disabled?: boolean
  duplicateTagText?: string
  form?: string
  inputAttrs?: Readonly<AttrsValue>
  inputClass?: ClassValue
  inputId?: string
  inputType?: InputType
  invalidTagText?: string
  limit?: Numberish
  limitTagsText?: string
  modelValue?: readonly string[]
  name?: string
  noAddOnEnter?: boolean
  noOuterFocus?: boolean
  noTagRemove?: boolean
  placeholder?: string
  removeOnDelete?: boolean
  required?: boolean
  separator?: string | readonly string[]
  size?: Size
  state?: ValidationState
  tagClass?: ClassValue
  tagPills?: boolean
  tagRemoveLabel?: string
  tagRemovedLabel?: string
  tagValidator?: (t: string) => boolean
  tagVariant?: ColorVariant | null
}

export interface BFormTextareaProps extends CommonInputProps {
  noResize?: boolean
  rows?: Numberish
  wrap?: string
  noAutoShrink?: boolean
  maxRows?: Numberish
}

export interface BInputGroupProps {
  append?: string
  id?: string
  prepend?: string
  size?: Size
  tag?: string
}

export interface BInputGroupTextProps {
  tag?: string
  text?: string
}

export interface BListGroupProps {
  flush?: boolean
  horizontal?: boolean | Breakpoint
  numbered?: boolean
  tag?: string
}

export interface BListGroupItemProps extends Omit<BLinkProps, 'routerTag'> {
  action?: boolean
  button?: boolean
  tag?: string
}

// export interface BModalOrchestratorProps extends TeleporterProps {}
export type BModalOrchestratorProps = TeleporterProps

export interface BNavProps {
  align?: AlignmentJustifyContent
  cardHeader?: boolean
  fill?: boolean
  justified?: boolean
  pills?: boolean
  small?: boolean
  tabs?: boolean
  tag?: string
  underline?: boolean
  vertical?: boolean
}

export interface BNavFormProps extends BFormProps {
  role?: string
  wrapperAttrs?: Readonly<AttrsValue>
  formClass?: ClassValue
}

export interface BNavItemProps extends Omit<BLinkProps, 'routerTag'> {
  linkAttrs?: Readonly<AttrsValue>
  linkClass?: ClassValue
}

export interface BNavTextProps {
  text?: string
}

export interface BNavbarProps {
  autoClose?: boolean
  container?: boolean | 'fluid' | Breakpoint
  fixed?: Extract<Placement, 'top' | 'bottom'>
  print?: boolean
  sticky?: Extract<Placement, 'top' | 'bottom'>
  tag?: string
  toggleable?: boolean | Breakpoint
  variant?: BgColorVariant | null
}

export interface BNavbarBrandProps extends Omit<BLinkProps, 'routerTag'> {
  tag?: string
}

export interface BNavbarNavProps {
  align?: AlignmentJustifyContent
  fill?: boolean
  justified?: boolean
  small?: boolean
  tag?: string
}

export interface BNavbarToggleProps {
  disabled?: boolean
  label?: string
  target?: string | readonly string[]
}

export interface BOffcanvasProps extends TeleporterProps, ShowHideProps {
  noBackdrop?: boolean
  backdropFirst?: boolean
  bodyAttrs?: Readonly<AttrsValue>
  bodyClass?: ClassValue
  bodyScrolling?: boolean
  footerClass?: string
  headerClass?: string
  headerCloseClass?: ClassValue
  headerCloseLabel?: string
  headerCloseVariant?: ButtonVariant | null
  id?: string
  modelValue?: boolean
  noCloseOnBackdrop?: boolean
  noCloseOnEsc?: boolean
  noFocus?: boolean
  noHeader?: boolean
  noTrap?: boolean
  noHeaderClose?: boolean
  placement?: Placement
  shadow?: Size | boolean
  title?: string
  responsive?: Breakpoint
  width?: string
}

export interface BOverlayProps extends RadiusElementExtendables {
  bgColor?: string
  blur?: string | null
  fixed?: boolean
  noCenter?: boolean
  noFade?: boolean
  noSpinner?: boolean
  noWrap?: boolean
  opacity?: Numberish
  overlayTag?: string
  show?: boolean
  spinnerSmall?: boolean
  spinnerType?: SpinnerType
  spinnerVariant?: ColorVariant | null
  variant?: BgColorVariant | 'white' | 'transparent' | null
  wrapTag?: string
  zIndex?: Numberish
}

export interface BPaginationProps {
  align?: AlignmentJustifyContent | 'fill'
  ariaControls?: string
  ariaLabel?: string
  disabled?: boolean
  ellipsisClass?: ClassValue
  ellipsisText?: string
  firstClass?: ClassValue
  firstNumber?: boolean
  firstText?: string
  noEllipsis?: boolean
  noGotoEndButtons?: boolean
  labelFirstPage?: string
  labelLastPage?: string
  labelNextPage?: string
  labelPage?: string
  labelPrevPage?: string
  lastClass?: ClassValue
  lastNumber?: boolean
  lastText?: string
  limit?: Numberish
  modelValue?: Numberish
  nextClass?: ClassValue
  nextText?: string
  pageClass?: ClassValue
  perPage?: Numberish
  pills?: boolean
  prevClass?: ClassValue
  prevText?: string
  size?: Size
  totalRows?: Numberish
}

export interface BPlaceholderProps {
  animation?: PlaceholderAnimation
  cols?: Numberish
  size?: PlaceholderSize
  tag?: string
  variant?: BgColorVariant | null
  width?: Numberish
  wrapperTag?: string
}

export interface BPlaceholderButtonProps {
  animation?: PlaceholderAnimation
  cols?: Numberish
  tag?: string
  variant?: ColorVariant | null
  width?: Numberish
}

export interface BPlaceholderCardProps {
  animation?: PlaceholderAnimation
  footerAnimation?: PlaceholderAnimation
  footerSize?: PlaceholderSize
  footerVariant?: ColorVariant | null
  footerWidth?: Numberish
  headerAnimation?: PlaceholderAnimation
  headerSize?: PlaceholderSize
  headerVariant?: ColorVariant | null
  headerWidth?: Numberish
  imgBlankColor?: string
  imgPlacement?: Extract<Placement, 'top' | 'bottom'>
  imgHeight?: Numberish
  imgSrc?: string
  noButton?: boolean
  noFooter?: boolean
  noHeader?: boolean
  noImg?: boolean
  size?: PlaceholderSize
  variant?: ColorVariant | null
}

export interface BPlaceholderTableProps {
  animation?: PlaceholderAnimation
  cellWidth?: Numberish
  columns?: Numberish
  footerAnimation?: PlaceholderAnimation
  footerCellWidth?: Numberish
  footerColumns?: Numberish
  footerSize?: PlaceholderSize
  footerVariant?: ColorVariant | null
  headerAnimation?: PlaceholderAnimation
  headerCellWidth?: Numberish
  headerColumns?: Numberish
  headerSize?: PlaceholderSize
  headerVariant?: ColorVariant | null
  noHeader?: boolean
  rows?: Numberish
  showFooter?: boolean
  size?: PlaceholderSize
  variant?: ColorVariant | null
}

export interface BPlaceholderWrapperProps {
  loading?: boolean
}

export interface BProgressProps extends Omit<BProgressBarProps, 'label'> {
  height?: string
}

export interface BTabProps {
  active?: boolean
  buttonId?: string
  disabled?: boolean
  id?: string
  lazy?: boolean
  lazyOnce?: boolean
  noBody?: boolean
  tag?: string
  title?: string
  titleItemClass?: ClassValue
  titleLinkAttrs?: Readonly<AttrsValue>
  titleLinkClass?: ClassValue
}

export interface BTabsProps {
  activeId?: string
  activeNavItemClass?: ClassValue
  activeTabClass?: ClassValue
  align?: AlignmentJustifyContent
  card?: boolean
  contentClass?: ClassValue
  end?: boolean
  fill?: boolean
  id?: string
  inactiveNavItemClass?: ClassValue
  inactiveTabClass?: ClassValue
  justified?: boolean
  lazy?: boolean
  modelValue?: number
  navClass?: ClassValue
  navItemClass?: ClassValue
  navWrapperClass?: ClassValue
  noFade?: boolean
  noKeyNav?: boolean
  noNavStyle?: boolean
  pills?: boolean
  small?: boolean
  tag?: string
  tabClass?: ClassValue
  underline?: boolean
  vertical?: boolean
}

export interface BToastOrchestratorProps extends TeleporterProps {
  appendToast?: boolean
}

export interface BCollapseProps extends ShowHideProps {
  horizontal?: boolean
  id?: string
  isNav?: boolean
  modelValue?: boolean
  tag?: string
}

export interface BContainerProps {
  fluid?: boolean | Breakpoint
  gutterX?: GutterNumbers
  gutterY?: GutterNumbers
  tag?: string
}

export interface BSpinnerProps {
  label?: string
  role?: string
  small?: boolean
  tag?: string
  type?: SpinnerType
  variant?: ColorVariant | null
}

export interface BAccordionItemProps {
  bodyAttrs?: Readonly<AttrsValue>
  bodyClass?: ClassValue
  buttonAttrs?: Readonly<AttrsValue>
  buttonClass?: ClassValue
  collapseClass?: ClassValue
  headerAttrs?: Readonly<AttrsValue>
  headerClass?: ClassValue
  headerTag?: string
  horizontal?: boolean
  id?: string
  isNav?: boolean
  modelValue?: boolean
  lazy?: boolean
  unmountLazy?: boolean
  tag?: string
  title?: string
  show?: boolean
  visible?: boolean
  wrapperAttrs?: Readonly<AttrsValue>
}

export interface BAlertProps
  extends ColorExtendables,
    Omit<BLinkProps, 'routerTag'>,
    ShowHideProps {
  alertClass?: ClassValue
  body?: string
  closeClass?: ClassValue
  closeContent?: string
  closeLabel?: string
  closeVariant?: ButtonVariant | null
  dismissible?: boolean
  headerClass?: ClassValue
  headerTag?: string
  id?: string
  interval?: number | 'requestAnimationFrame'
  isStatus?: boolean
  modelValue?: boolean | number
  noHoverPause?: boolean
  noResumeOnHoverLeave?: boolean
  progressProps?: Omit<BProgressBarProps, 'label' | 'max' | 'value'>
  showOnPause?: boolean
  title?: string
  variant?: ColorVariant | null
}

export interface BAvatarProps
  extends Omit<BLinkProps, 'routerTag' | 'icon'>,
    ColorExtendables,
    RadiusElementExtendables {
  alt?: string
  badge?: boolean | string
  badgeBgVariant?: BgColorVariant | null
  badgePlacement?: CombinedPlacement
  badgeTextVariant?: TextColorVariant | null
  badgeVariant?: ColorVariant | null
  badgePill?: boolean
  badgeDotIndicator?: boolean
  button?: boolean
  buttonType?: ButtonType
  size?: LiteralUnion<Size, Numberish>
  square?: boolean
  src?: string
  text?: string
}

export interface BAvatarGroupProps extends ColorExtendables, RadiusElementExtendables {
  overlap?: Numberish
  size?: LiteralUnion<Size, Numberish>
  square?: boolean
  tag?: string
}

export interface BBadgeProps extends Omit<BLinkProps, 'routerTag'>, ColorExtendables {
  dotIndicator?: boolean
  pill?: boolean
  placement?: CombinedPlacement
  tag?: string
}

export interface BBreadcrumbProps {
  items?: readonly BreadcrumbItemRaw[]
}

export interface BBreadcrumbItemProps extends Omit<BLinkProps, 'routerTag'> {
  ariaCurrent?: string
  text?: string
}

type CustomLinkVariant = {
  [K in ColorVariant as `link-${K}`]: unknown
}

export interface BButtonProps extends Omit<BLinkProps, 'variant'> {
  loading?: boolean
  loadingFill?: boolean
  loadingText?: string
  pill?: boolean
  pressed?: boolean
  size?: Size
  squared?: boolean
  tag?: string
  type?: ButtonType
  variant?: (ButtonVariant | keyof CustomLinkVariant) | null
}

export interface BButtonGroupProps {
  ariaLabel?: string
  size?: Size
  tag?: string
  vertical?: boolean
}

export interface BButtonToolbarProps {
  ariaLabel?: string
  // keyNav?: boolean
  justify?: boolean
  role?: string
}

export interface BCloseButtonProps {
  ariaLabel?: string
  disabled?: boolean
  type?: ButtonType
}

export interface BCardProps extends ColorExtendables {
  align?: AlignmentTextHorizontal
  bodyBgVariant?: BgColorVariant | null
  bodyClass?: ClassValue
  bodyTag?: string
  bodyText?: string
  bodyTextVariant?: TextColorVariant | null
  borderVariant?: BorderColorVariant | null
  footer?: string
  footerBgVariant?: BgColorVariant | null
  footerBorderVariant?: BorderColorVariant | null
  footerClass?: ClassValue
  footerTag?: string
  footerTextVariant?: TextColorVariant | null
  footerVariant?: ColorVariant | null
  header?: string
  headerBgVariant?: BgColorVariant | null
  headerBorderVariant?: BorderColorVariant | null
  headerClass?: ClassValue
  headerTag?: string
  headerTextVariant?: TextColorVariant | null
  headerVariant?: ColorVariant | null
  imgAlt?: string
  imgPlacement?: Placement | 'overlay'
  imgHeight?: Numberish
  imgSrc?: string
  imgWidth?: Numberish
  noBody?: boolean
  subtitle?: string
  subtitleTag?: string
  subtitleTextVariant?: TextColorVariant | null
  tag?: string
  title?: string
  titleTag?: string
}

export interface BCardBodyProps extends ColorExtendables {
  overlay?: boolean
  subtitle?: string
  subtitleTag?: string
  subtitleTextVariant?: TextColorVariant | null
  tag?: string
  text?: string
  title?: string
  titleTag?: string
}

export interface BCardGroupProps {
  columns?: boolean
  deck?: boolean
  tag?: string
}

export interface BCardImgProps extends Omit<BImgProps, 'placement'> {
  placement?: Placement | 'overlay'
}

export interface BCardSubtitleProps {
  text?: string
  tag?: string
  textVariant?: TextColorVariant | null
}

export interface BCardTextProps {
  tag?: string
  text?: string
}

export interface BCardTitleProps {
  tag?: string
  text?: string
}

export interface BCarouselProps {
  background?: string
  controls?: boolean
  controlsNextText?: string
  controlsPrevText?: string
  fade?: boolean
  id?: string
  imgHeight?: string
  imgWidth?: string
  indicators?: boolean
  indicatorsButtonLabel?: string
  interval?: number
  labelIndicators?: string
  keyboard?: boolean
  modelValue?: number
  noAnimation?: boolean
  noHoverPause?: boolean
  noTouch?: boolean
  noWrap?: boolean
  ride?: boolean | 'carousel'
  rideReverse?: boolean
  touchThreshold?: Numberish
}

export interface BCarouselSlideProps {
  background?: string
  caption?: string
  captionTag?: string
  contentTag?: string
  contentVisibleUp?: string
  id?: string
  imgAlt?: string
  imgBlank?: boolean
  imgBlankColor?: string
  imgHeight?: Numberish
  imgSrc?: string
  imgSrcset?: string | readonly string[]
  imgWidth?: Numberish
  interval?: number | 'requestAnimationFrame'
  text?: string
  textTag?: string
}

export interface BTransitionProps {
  appear?: boolean
  mode?: TransitionMode
  noFade?: boolean
  transProps?: Readonly<TransitionProps>
}

export interface BImgProps extends RadiusElementExtendables {
  blank?: boolean
  blankColor?: string
  block?: boolean
  fluid?: boolean
  fluidGrow?: boolean
  height?: Numberish
  tag?: string
  lazy?: boolean
  sizes?: string | readonly string[]
  src?: string
  srcset?: string | readonly string[]
  thumbnail?: boolean
  width?: Numberish
  placement?: Extract<Placement, 'start' | 'end'> | 'center'
}

export interface BFormProps {
  floating?: boolean
  id?: string
  novalidate?: boolean
  validated?: boolean
}

export interface BTableSimpleProps {
  bordered?: boolean
  borderless?: boolean
  borderVariant?: BorderColorVariant | null
  captionTop?: boolean
  dark?: boolean
  fixed?: boolean
  hover?: boolean
  id?: string
  noBorderCollapse?: boolean
  outlined?: boolean
  responsive?: boolean | Breakpoint
  small?: boolean
  stacked?: boolean | Breakpoint
  stickyHeader?: boolean | Numberish
  striped?: boolean
  stripedColumns?: boolean
  variant?: ColorVariant | null
  tableAttrs?: Readonly<AttrsValue>
  tableClass?: ClassValue
}

export interface BTableLiteProps<Items> extends BTableSimpleProps {
  align?: VerticalAlign
  caption?: string
  detailsTdClass?: ClassValue
  fieldColumnClass?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((field: TableField<Items>) => readonly Record<string, any>[])
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Readonly<Record<PropertyKey, any>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | readonly any[]
  fields?: TableFieldRaw<Items>[]
  footClone?: boolean
  footRowVariant?: ColorVariant | null
  footVariant?: ColorVariant | null
  headRowVariant?: ColorVariant | null
  headVariant?: ColorVariant | null
  items?: readonly Items[]
  labelStacked?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: any
  primaryKey?: string
  tbodyClass?: ClassValue
  tbodyTrAttrs?: ((item: Items | null, type: TableRowType) => AttrsValue) | AttrsValue
  // tbodyTransitionHandlers
  // tbodyTransitionProps
  tbodyTrClass?:
    | ((item: Items | null, type: TableRowType) => TableStrictClassValue)
    | TableStrictClassValue
  tfootClass?: ClassValue
  tfootTrClass?: ClassValue
  theadClass?: ClassValue
  theadTrClass?: ClassValue
}

export interface BTableProps<Items> extends Omit<BTableLiteProps<Items>, 'tableClass'> {
  provider?: BTableProvider<Items>
  noProvider?: readonly NoProviderTypes[]
  noProviderPaging?: boolean
  noProviderSorting?: boolean
  noProviderFiltering?: boolean
  sortBy?: BTableSortBy[]
  mustSort?: boolean | string[] // TODO this is a string of fields, possibly generic
  selectable?: boolean
  multisort?: boolean
  stickySelect?: boolean
  selectHead?: boolean | string
  selectMode?: 'multi' | 'single' | 'range'
  selectionVariant?: ColorVariant | null
  busy?: boolean
  busyLoadingText?: string
  perPage?: Numberish
  currentPage?: Numberish
  filter?: string
  filterable?: readonly string[]
  // TODO
  // apiUrl?: string
  // filterFunction?: () => any
  // filterIgnoredFields?: any[]
  // filterIncludedFields?: any[]
  // headRowVariant?: ColorVariant | null
  // headVariant?: ColorVariant | null
  // labelSortAsc?: string
  // labelSortClear?: string
  // labelSortDesc?: string
  // noFooterSorting?: boolean
  noLocalSorting?: boolean
  noSelectOnClick?: boolean
  // selectedVariant?: ColorVariant | null
  // showEmpty?: boolean
  // sortDirection?: 'asc' | 'desc' | 'last'
  // sortIconLeft?: boolean
  // sortNullLast?: boolean
  selectedItems?: readonly Items[]
  noSortableIcon?: boolean
  emptyFilteredText?: string
  emptyText?: string
  showEmpty?: boolean
}

export interface BTrProps {
  variant?: ColorVariant | null
}

export interface BTheadProps {
  variant?: ColorVariant | null
}

export interface BTfootProps {
  variant?: ColorVariant | null
}

export interface BTdProps {
  colspan?: Numberish
  rowspan?: Numberish
  stackedHeading?: string
  stickyColumn?: boolean
  variant?: ColorVariant | null
}

export interface BTbodyProps {
  variant?: ColorVariant | null
}

export interface BThProps {
  colspan?: Numberish
  rowspan?: Numberish
  stackedHeading?: string
  stickyColumn?: boolean
  variant?: ColorVariant | null
}

export interface BProgressBarProps extends ColorExtendables {
  animated?: boolean
  label?: string
  max?: Numberish
  precision?: Numberish
  showProgress?: boolean
  showValue?: boolean
  striped?: boolean
  value?: Numberish
}

export interface BInputGroupAddonProps {
  isText?: boolean
}

export interface BFormFeedbackSharedProps {
  ariaLive?: string
  forceShow?: boolean
  id?: string
  role?: string
  state?: ValidationState
  tag?: string
  text?: string
  tooltip?: boolean
}

export interface BDropdownProps extends TeleporterProps, ShowHideProps {
  ariaLabel?: string
  autoClose?: boolean | 'inside' | 'outside'
  boundary?: Boundary | RootBoundary
  boundaryPadding?: Padding
  disabled?: boolean
  floatingMiddleware?: Middleware[]
  id?: string
  isNav?: boolean
  menuClass?: ClassValue
  modelValue?: boolean
  noCaret?: boolean
  noFlip?: boolean
  noShift?: boolean
  noSize?: boolean
  offset?:
    | number
    | string
    | Readonly<{mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null}>
  role?: string
  size?: Size
  noWrapper?: boolean
  split?: boolean
  splitButtonType?: ButtonType
  splitClass?: ClassValue
  splitDisabled?: boolean
  splitHref?: string
  splitTo?: RouteLocationRaw
  splitVariant?: ButtonVariant | null
  strategy?: Strategy
  text?: string
  toggleClass?: ClassValue
  toggleText?: string
  variant?: ButtonVariant | null
  wrapperClass?: ClassValue
  placement?: FloatingPlacement
}

export interface BToastProps
  extends ColorExtendables,
    Omit<BLinkProps, 'routerTag'>,
    ShowHideProps {
  body?: string
  bodyClass?: ClassValue
  closeClass?: ClassValue
  closeContent?: string
  closeLabel?: string
  closeVariant?: ButtonVariant | null
  headerClass?: ClassValue
  headerTag?: string
  id?: string
  interval?: number | 'requestAnimationFrame'
  isStatus?: boolean
  modelValue?: boolean | number
  noCloseButton?: boolean
  noHoverPause?: boolean
  noResumeOnHoverLeave?: boolean
  progressProps?: Omit<BProgressBarProps, 'label' | 'max' | 'value'>
  showOnPause?: boolean
  solid?: boolean
  title?: string
  toastClass?: ClassValue
}

export interface BPopoverProps extends TeleporterProps, ShowHideProps {
  boundary?: Boundary | RootBoundary
  boundaryPadding?: Padding
  click?: boolean
  closeOnHide?: boolean
  body?: string
  customClass?: ClassValue
  delay?:
    | number
    | Readonly<{
        show: number
        hide: number
      }>
  floatingMiddleware?: Middleware[]
  hideMargin?: number
  id?: string
  inline?: boolean
  manual?: boolean
  modelValue?: boolean
  noAutoClose?: boolean
  noFlip?: boolean
  noHide?: boolean
  noShift?: boolean
  noSize?: boolean
  noninteractive?: boolean
  offset?: Numberish | null
  placement?: PopoverPlacement
  realtime?: boolean
  reference?: string | Readonly<ComponentPublicInstance> | Readonly<HTMLElement> | null
  strategy?: Strategy
  target?: string | Readonly<ComponentPublicInstance> | Readonly<HTMLElement> | null
  title?: string
  tooltip?: boolean
  variant?: ColorVariant | null
}

export interface BTooltipProps extends Omit<BPopoverProps, 'tooltip'> {
  interactive?: boolean
}

export interface BCardHeadFootProps extends ColorExtendables {
  borderVariant?: BorderColorVariant | null
  tag?: string
  text?: string
}

export interface BModalProps extends TeleporterProps, ShowHideProps {
  autofocus?: boolean
  autofocusButton?: 'ok' | 'cancel' | 'close'
  backdropFirst?: boolean
  body?: string
  bodyAttrs?: Readonly<AttrsValue>
  bodyBgVariant?: BgColorVariant | null
  bodyClass?: ClassValue
  bodyScrolling?: boolean
  bodyTextVariant?: TextColorVariant | null
  bodyVariant?: ColorVariant | null
  busy?: boolean
  buttonSize?: Size
  cancelDisabled?: boolean
  cancelTitle?: string
  cancelVariant?: ButtonVariant | null
  centered?: boolean
  contentClass?: ClassValue
  dialogClass?: ClassValue
  footerBgVariant?: BgColorVariant | null
  footerBorderVariant?: BorderColorVariant | null
  footerClass?: ClassValue
  footerTextVariant?: TextColorVariant | null
  footerVariant?: ColorVariant | null
  fullscreen?: boolean | Breakpoint
  headerBgVariant?: BgColorVariant | null
  headerBorderVariant?: BorderColorVariant | null
  headerClass?: ClassValue
  headerCloseClass?: ClassValue
  headerCloseLabel?: string
  headerCloseVariant?: ButtonVariant | null
  headerTextVariant?: TextColorVariant | null
  headerVariant?: ColorVariant | null
  noBackdrop?: boolean
  noFooter?: boolean
  noHeader?: boolean
  noHeaderClose?: boolean
  id?: string
  modalClass?: ClassValue
  modelValue?: boolean
  noCloseOnBackdrop?: boolean
  noCloseOnEsc?: boolean
  noTrap?: boolean
  noStacking?: boolean
  okDisabled?: boolean
  okOnly?: boolean
  okTitle?: string
  okVariant?: ButtonVariant | null
  scrollable?: boolean
  size?: Size | 'xl'
  title?: string
  titleClass?: ClassValue
  titleVisuallyHidden?: boolean
  titleTag?: string
}

export interface ShowHideProps {
  initialAnimation?: boolean
  noAnimation?: boolean
  noFade?: boolean
  lazy?: boolean
  unmountLazy?: boolean
  show?: boolean
  transProps?: Readonly<TransitionProps>
  visible?: boolean
}

export interface BRowProps extends RowColsBreakpointProps {
  tag?: string
  gutterX?: GutterNumbers
  gutterY?: GutterNumbers
  noGutters?: boolean
  alignV?: AlignmentVertical
  alignH?: AlignmentJustifyContent
  alignContent?: AlignmentContent
  cols?: ColsNumbers
}

export interface BColProps extends OffsetBreakpointProps, OrderBreakpointProps, ColBreakpointProps {
  alignSelf?: AlignmentVertical | 'auto'
  tag?: string
  order?: ColsOrderNumbers
  offset?: ColsOffsetNumbers
  cols?: ColsNumbers | 'auto'
  col?: boolean
}

export interface BFormGroupProps
  extends ContentColsBreakpointProps,
    LabelColsBreakpointProps,
    LabelAlignBreakpointProps {
  contentCols?: boolean | Numberish
  labelCols?: boolean | Numberish
  labelAlign?: string
  ariaInvalid?: AriaInvalid
  description?: string
  disabled?: boolean
  feedbackAriaLive?: string
  floating?: boolean
  id?: string
  invalidFeedback?: string
  label?: string
  labelClass?: ClassValue
  labelFor?: string
  labelSize?: string
  labelVisuallyHidden?: boolean
  state?: ValidationState
  tooltip?: boolean
  validFeedback?: string
  validated?: boolean
}
