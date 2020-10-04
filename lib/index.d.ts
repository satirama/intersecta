export type AnimationOptions = 'fadeIn' 
  | 'fadeOut'
  | 'zoomIn'
  | 'zoomOut'
  | 'slideDown'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'flipLeft'
  | 'flipRight'

export type IntersectaEvents = {
  in: CustomEvent
  out: CustomEvent
}

export type IntersectaOptions = {
  selector: string
  threshold?: number
  animation?: AnimationOptions
  duration?: number
  delay?: number
  easing?: string
  once?: boolean
  waterfall?: boolean
  custom?: any 
}

export interface IntersectaInnerOptions extends IntersectaOptions {
  fill: FillMode
}