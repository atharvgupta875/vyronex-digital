/**
 * cn — className merge utility
 * 
 * Filters out falsy values and joins classNames.
 * Lightweight alternative to clsx.
 * 
 * Usage:
 *   cn('base-class', isActive && 'active', className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
