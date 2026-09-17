'use client'
import { useState, useEffect } from 'react'
import { Clock3 } from 'lucide-react'

export default function HoursWidget() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    function updateStatus() {
      const now = new Date()
      const day = now.getDay() // 0 = dimanche
      const hour = now.getHours() + now.getMinutes() / 60
      setIsOpen(day !== 0 && hour >= 8 && hour < 20)
    }
    updateStatus()
    const interval = setInterval(updateStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-b border-[#eee0d0] bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-black">
          <Clock3 size={16} className="text-[#f5821f]" />
          {isOpen ? (
            <span className="text-green-600"> Disponible maintenant</span>
          ) : (
            <span className="text-red-500"> Indisponible actuellement</span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-[#6b7a90]">
          <span>Lun – Sam : 09:00 → 20:00</span>
          <span>Dimanche : Fermé</span>
        </div>
      </div>
    </div>
  )
}