import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export default function useDndSensors() {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 3 } })

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  })

  const sensors = useSensors(pointerSensor, keyboardSensor)

  return {
    sensors,
    keyboardSensor,
    pointerSensor
  }
}
