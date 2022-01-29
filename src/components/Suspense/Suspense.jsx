import React, { Suspense } from 'react'
import Loader from '../Loader/Loader'

const AppSuspense = ({ children }) => {
    return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default AppSuspense;
