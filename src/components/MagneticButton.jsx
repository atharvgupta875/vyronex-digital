/**
 * MagneticButton — Interactive magnetic hover button
 *
 * Wraps any button/link content with a magnetic pull effect.
 * On desktop hover, the button subtly follows the cursor.
 * On touch devices, behaves as a normal button.
 */

import useMagnetic from '../hooks/useMagnetic'

export default function MagneticButton({
  children,
  as: Tag = 'a',
  className = '',
  strength = 0.3,
  ...props
}) {
  const magnetic = useMagnetic(strength)

  return (
    <Tag
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
