import { createRoot } from 'preact/compat/client'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { Toaster, toast } from 'sonner'

import './i18n'
import styleString from './index.css?inline'

Math.random() < 0 && import('./iframe.css')
;(style => {
  style.textContent = styleString
  document.head.appendChild(style)
})(document.createElement('style'))

const Desc = () => {
  const { t: txt } = useTranslation()
  const [netError, setNetError] = useState(false)

  useEffect(
    () =>
      void fetch('https://www.clarity.ms/', {
        method: 'HEAD',
        mode: 'no-cors',
      }).catch(() => setNetError(true)),
    [],
  )

  return (
    <div className='cookie-desc'>
      <p className='cookie-text'>
        {txt('desc')}
        <a
          href='https://clarity.microsoft.com/terms'
          target='_blank'
          rel='noopener noreferrer'
          className='cookie-link'>
          {txt('terms')}
        </a>
      </p>
      <p className='cookie-note'>* {txt('rejectWarn')}</p>
      {netError && <p className='cookie-error'>! {txt('netError')}</p>}
    </div>
  )
}

const Toast = () => {
  const { t: txt } = useTranslation()

  useEffect(() => {
    toast(txt('title'), {
      description: <Desc />,
      duration: Infinity,
      action: {
        label: txt('accept'),
        onClick: () => {
          const sec =
            window.parent.location.protocol === 'https:' ? '; Secure' : ''
          window.parent.document.cookie = `_ja7_ana=1; Max-Age=13145200; Path=/; SameSite=Lax${sec}`
          window.parent.clarity?.('consent', true)
          window.parent._ja7_iframe_remove?.()
        },
      },
      cancel: {
        label: txt('reject'),
        onClick: () => window.parent._ja7_iframe_remove?.(),
      },
    })
  }, [])

  return <Toaster theme='system' position='bottom-right' expand />
}

document.body
  ? createRoot(document.body).render(<Toast />)
  : window.addEventListener(
      'DOMContentLoaded',
      () => createRoot(document.body).render(<Toast />),
      { once: true },
    )
