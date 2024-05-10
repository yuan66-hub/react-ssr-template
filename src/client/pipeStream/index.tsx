import { hydrateRoot } from 'react-dom/client'
import App from '@/pages/App'
import { BrowserRouter } from 'react-router-dom'


// 水合操作
hydrateRoot(document as Document,
    <BrowserRouter>
        <App />
    </BrowserRouter>
)