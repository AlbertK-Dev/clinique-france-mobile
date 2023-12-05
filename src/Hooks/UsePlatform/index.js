import { Platform, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'

export default function usePlatform() {
    const { height, width } = useWindowDimensions()
    const OS = Platform.OS

    useEffect(() => { }, [height, OS, width])

    return {
        OS,
        height,
        width
    }
}