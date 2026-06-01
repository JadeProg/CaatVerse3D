import { getGPUTier } from 'detect-gpu'
export async function DetectGpu() {
    const gpu = await getGPUTier()
   
    if (gpu.isMobile) return "mobile"
    if (gpu.tier <= 1) return "low"
    if (gpu.tier === 2) return "medium"
    if (gpu.tier >= 3) return "high"

    return "medium"
}